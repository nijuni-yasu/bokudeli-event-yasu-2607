<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { mdiClipboardTextOutline } from '@mdi/js'
import { FirebaseError } from 'firebase/app'
import FormAnswerFields from '@shokujii/base/components/forms/FormAnswerFields.vue'
import FormLinkedText from '@shokujii/base/components/forms/FormLinkedText.vue'
import ConfirmDialog from '@shokujii/base/components/ConfirmDialog.vue'
import {
  fetchEventFormReference,
  fetchMyFormResponse,
  fetchMyLatestFormDraft,
} from '@shokujii/base/stores/eventForm.js'
import { parseOrderFormInvalidError } from '@shokujii/base/utils/orderFormInvalidError.js'
import { createStripeCheckoutSession } from '@shokujii/base/apis/stripe'
import { useCurrentUserStore } from '@shokujii/base/stores/currentUser'
import { useCreateAppEventStore } from '@shokujii/base/composable/useAppEventStore.js'
import {
  CART_BLOCK_MESSAGE_KEY,
  findCartOrderBlock,
  findProfileGap,
  PROFILE_GAP_MESSAGE_KEY,
} from '@shokujii/base/composable/cartOrderGate.js'
import { NO_ORDER_PARTICIPATION_MENU_ID } from '@shokujii/common/schemas/EventItemType.js'
import { computeTotalPayment } from '@shokujii/common/utils/paymentCommunityBillOffAmount.js'
import { sortOrderIdsForEnterpriseSubsidyReplay } from '@shokujii/common/utils/eventMemberOrderSort.js'
import { getUserFacingFailedPreconditionMessage } from '@shokujii/common/utils/failedPreconditionMessage.js'
import type {
  ResolveEventHrefFn,
  ResolveOrdersPathFn,
  ResolveProfilePathFn,
} from '@shokujii/base/types/profilePathResolvers.js'
import {
  compactFormAnswerInput,
  hasUnansweredRequiredField,
  validateFormAnswers,
  type FormAnswerInput,
  type FormValidationIssue,
} from '@shokujii/common/utils/validateFormAnswers.js'
import { buildOrderFormForAnswer, type OrderFormForAnswer } from '@shokujii/common/utils/orderFormAnswers.js'
import type { FormField } from '@shokujii/common/schemas/formFields.js'
import type { OrderFormSubmission } from '@shokujii/common/apis/form.js'
import { reportFormFlowError, type FormFlowStage } from '@shokujii/base/utils/reportFormFlowError.js'

const props = defineProps<{
  eventId: string
  communityAccount: string
  resolveOrdersPath: ResolveOrdersPathFn
  resolveCartPath: () => string
  resolveEventPath: ResolveEventHrefFn
  resolveProfilePath: ResolveProfilePathFn
}>()

const { t: $t } = useI18n()
const router = useRouter()
const {
  cart,
  user: currentUser,
  firebaseUser,
  personalInformation: currentUserPersonalInformation,
} = storeToRefs(useCurrentUserStore())
const createAppEventStore = useCreateAppEventStore()

const loading = ref(true)
const saving = ref(false)
const form = ref<OrderFormForAnswer | null>(null)
const answers = ref<FormAnswerInput[]>([])
const issues = ref<FormValidationIssue[]>([])
const alertMessage = ref('')
const isOpenAlert = ref(false)
const openConfirmOrder = ref(false)
const confirmDialogMessage = ref('')
const pendingSubmission = ref<OrderFormSubmission | null>(null)
const openUserParameterConfirm = ref(false)
const targetUserParameter = ref('')

const showAlert = (message: string) => {
  alertMessage.value = message
  isOpenAlert.value = true
}

const getOrderErrorMessage = (error: unknown): string | null => {
  if (error instanceof FirebaseError && error.code === 'functions/failed-precondition') {
    return getUserFacingFailedPreconditionMessage(error.message)
  }
  if (error instanceof Error) {
    return getUserFacingFailedPreconditionMessage(error.message)
  }
  return null
}

type StageTarget = { event: { community_id: string; event_id: string } } | undefined

const reportStageError = (stage: FormFlowStage, error: unknown, item: StageTarget) => {
  // 売り切れ・回答の不備など、理由を画面に出せる想定内の失敗は記録しない（サーバー側で ERROR に分類され、調査の妨げになる）
  if (getOrderErrorMessage(error) != null || parseOrderFormInvalidError(error) != null) return
  reportFormFlowError(error, { component: 'CartFormAnswer', stage, target: item?.event })
}

// 注文確定後は in_cart の購読から対象が消えるため、その消失を失敗として記録しない
let orderConfirmed = false

/** 失敗を段階付きで記録し、呼び出し元の既存の catch にそのまま渡す */
const runStage = async <T,>(stage: FormFlowStage, item: StageTarget, run: () => Promise<T>): Promise<T> => {
  try {
    return await run()
  } catch (error) {
    reportStageError(stage, error, item)
    throw error
  }
}

const cartItem = computed(() =>
  cart.value?.find(
    (item) => item.event.event_id === props.eventId && item.event.community_account === props.communityAccount,
  ),
)
const fields = computed<FormField[]>(() => form.value?.fields ?? [])
const hasUnansweredRequired = computed(() => hasUnansweredRequiredField(fields.value, answers.value))
const formName = computed(() => form.value?.name ?? '')
const formDescription = computed(() => form.value?.description ?? '')
const showFormIntro = computed(() => form.value != null && (formName.value !== '' || formDescription.value !== ''))
const cartItemKey = computed(() =>
  cartItem.value == null ? '' : `${cartItem.value.event.community_id}\0${cartItem.value.event.event_id}`,
)

const isNoOrderParticipationOnly = computed(() => {
  const orders = cartItem.value?.orders ?? []
  return orders.length > 0 && orders.every((order) => order.menu_id === NO_ORDER_PARTICIPATION_MENU_ID)
})

const needsStripe = computed(() => {
  const item = cartItem.value
  if (item == null || isNoOrderParticipationOnly.value) {
    return false
  }
  if (item.event.event_payment === 'user_advance') {
    return computeTotalPayment(item.orders) > 0
  }
  if (item.event.event_payment === 'community_bill' && item.event.community_bill_settings?.type === 'discount') {
    return computeTotalPayment(item.orders) > 0
  }
  return false
})

const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false) => {
  form.value = null
  answers.value = []
  issues.value = []
  openConfirmOrder.value = false
  pendingSubmission.value = null
  if (!preserveAlert) {
    isOpenAlert.value = false
  }
  const item = cartItem.value
  if (item == null) {
    loading.value = false
    // カート読み込み中（cart が null）と、注文処理中・確定後の消失は記録しない
    if (cart.value != null && !saving.value && !orderConfirmed) {
      reportStageError('form_load', new Error('cart item not found'), undefined)
    }
    showAlert($t('cart.form_load_failed'))
    return
  }
  // カートは Auth の UID で購読されるため、プロフィール（users/{uid}）の読み込みを待たずに Auth の UID を使う
  const userId = firebaseUser.value?.uid ?? currentUser.value?.id ?? ''
  const isEnterpriseEvent = item.event.enterprise_id != null && item.event.enterprise_id !== ''
  loading.value = true
  try {
    // 設定・設問・本人の回答を Firestore から直接読む（Functions のコールドスタートを避ける。#2492）
    const loaded = await runStage('form_load', item, async () => {
      const { community_id: communityId, event_id: eventId } = item.event
      const reference = isEnterpriseEvent ? null : await fetchEventFormReference(communityId, eventId)
      if (reference == null) {
        return null
      }
      if (userId === '') {
        throw new Error('current user not loaded')
      }
      const [confirmed, draft] = await Promise.all([
        fetchMyFormResponse(communityId, eventId, userId),
        fetchMyLatestFormDraft(communityId, eventId, userId, reference.form),
      ])
      return buildOrderFormForAnswer({
        form: reference.form,
        attempts: draft == null ? [] : [draft],
        confirmed,
      })
    })
    if (isCancelled()) return
    if (loaded == null) {
      void router.replace(props.resolveCartPath())
      return
    }
    form.value = loaded
    answers.value = loaded.initial_answers.map((answer) => compactFormAnswerInput(answer))
  } catch {
    if (!isCancelled()) showAlert($t('cart.form_load_failed'))
  } finally {
    if (!isCancelled()) loading.value = false
  }
}

// カートの読み込み完了も監視し、読み込み後に対象が無いときも検出する
watch(
  [cartItemKey, () => cart.value != null, () => firebaseUser.value?.uid],
  async (_key, _previousKey, onCleanup) => {
    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })
    await loadOrderForm(() => cancelled)
  },
  { immediate: true },
)

/** 送信前に画面で検証する。不備があれば項目ごとの指摘を出して null を返す */
const buildSubmission = (): OrderFormSubmission | null => {
  const current = form.value
  if (current == null) {
    return null
  }
  const submitted = answers.value.map((answer) => compactFormAnswerInput(answer))
  const validated = validateFormAnswers({
    fields: current.fields,
    answers: submitted,
    definitionVersion: current.definition_version,
  })
  if (!validated.ok) {
    issues.value = validated.issues
    return null
  }
  issues.value = []
  return {
    source_form_id: current.source_form_id,
    definition_version: current.definition_version,
    answers: submitted,
  }
}

/** サーバーの検証で弾かれた回答を画面に反映する。該当しないエラーなら false */
const applyServerFormIssues = async (error: unknown): Promise<boolean> => {
  const serverIssues = parseOrderFormInvalidError(error)
  if (serverIssues == null) {
    return false
  }
  if (serverIssues.some((issue) => issue.code === 'version_mismatch')) {
    const key = cartItemKey.value
    showAlert($t('cart.form_definition_changed'))
    await loadOrderForm(() => cartItemKey.value !== key, true)
    return true
  }
  issues.value = serverIssues
  return true
}

const ensureOrderAllowed = async (): Promise<boolean> => {
  const gap = findProfileGap(currentUser.value, currentUserPersonalInformation.value)
  if (gap != null) {
    targetUserParameter.value = $t(PROFILE_GAP_MESSAGE_KEY[gap])
    openUserParameterConfirm.value = true
    return false
  }
  const item = cartItem.value
  if (item == null) {
    showAlert($t('cart.form_load_failed'))
    return false
  }
  const block = await runStage('order_gate', item, () => findCartOrderBlock(item))
  if (block != null) {
    showAlert($t(CART_BLOCK_MESSAGE_KEY[block]))
    return false
  }
  return true
}

const startOrder = async (submission: OrderFormSubmission) => {
  if (!(await ensureOrderAllowed())) {
    return
  }
  const item = cartItem.value
  if (item == null) {
    return
  }
  const orderIds = sortOrderIdsForEnterpriseSubsidyReplay(item.orders)
  if (needsStripe.value) {
    try {
      const response = await runStage('stripe_checkout', item, () =>
        createStripeCheckoutSession({
          community_id: item.event.community_id,
          event_id: item.event.event_id,
          order_ids: orderIds,
          isPosted: false,
          origin: window.location.origin,
          form_submission: submission,
        }),
      )
      window.location.href =
        response.data.url ?? props.resolveEventPath(item.event.community_account, item.event.event_id)
    } catch (error) {
      if (await applyServerFormIssues(error)) return
      showAlert(getOrderErrorMessage(error) ?? $t('cart.payment_failed'))
    }
    return
  }
  try {
    const eventStore = createAppEventStore(item.event.event_id)
    await runStage('confirm_order', item, () =>
      eventStore.confirmOrder({
        community_id: item.event.community_id,
        event_id: item.event.event_id,
        order_ids: orderIds,
        form_submission: submission,
      }),
    )
    orderConfirmed = true
  } catch (error) {
    if (await applyServerFormIssues(error)) return
    showAlert(getOrderErrorMessage(error) ?? $t('cart.order_failed'))
    return
  }
  try {
    await router.push(
      props.resolveOrdersPath({ eventId: item.event.event_id, communityAccount: item.event.community_account }),
    )
  } catch {
    // 注文は確定済み。遷移失敗は注文失敗として扱わない
  }
}

const onPrimary = async () => {
  if (loading.value || saving.value || form.value == null) return
  const key = cartItemKey.value
  saving.value = true
  try {
    if (!(await ensureOrderAllowed())) {
      return
    }
    if (cartItemKey.value !== key) return
    const submission = buildSubmission()
    if (submission == null) {
      return
    }
    if (needsStripe.value) {
      await startOrder(submission)
      return
    }
    confirmDialogMessage.value = isNoOrderParticipationOnly.value
      ? $t('cart.confirm_no_order_participation')
      : cartItem.value?.event.event_payment === 'user_on_day'
        ? $t('cart.confirm_order_participant_on_day')
        : $t('cart.confirm_order_community_bill')
    pendingSubmission.value = submission
    openConfirmOrder.value = true
  } catch (error) {
    if (cartItemKey.value === key) {
      showAlert(getOrderErrorMessage(error) ?? $t('cart.form_save_failed'))
    }
  } finally {
    saving.value = false
  }
}

const confirmOrderNow = async () => {
  const submission = pendingSubmission.value
  if (loading.value || saving.value || submission == null) return
  saving.value = true
  try {
    await startOrder(submission)
  } catch (error) {
    showAlert(getOrderErrorMessage(error) ?? $t('cart.order_failed'))
  } finally {
    saving.value = false
    openConfirmOrder.value = false
  }
}
</script>

<template>
  <v-container class="manage-container py-8 cart-form">
    <div class="d-flex align-center ga-3 mb-6">
      <v-avatar color="primary" variant="tonal" rounded="lg" size="48"
        ><v-icon :icon="mdiClipboardTextOutline"
      /></v-avatar>
      <h1 class="text-h5">{{ $t('cart.form_page_title') }}</h1>
    </div>
    <v-progress-linear v-if="loading" indeterminate color="primary" />
    <template v-else-if="form != null">
      <v-sheet v-if="showFormIntro" color="surface" border rounded="lg" class="pa-4 mb-6">
        <h2
          v-if="formName !== ''"
          class="text-h5 font-weight-regular cart-form-copy"
          :class="formDescription !== '' ? 'mb-4' : 'mb-0'"
        >
          {{ formName }}
        </h2>
        <p v-if="formDescription !== ''" class="text-body-2 text-medium-emphasis mb-0 cart-form-copy">
          <FormLinkedText :text="formDescription" />
        </p>
      </v-sheet>
      <FormAnswerFields v-model="answers" :fields="fields" :issues="issues" :disabled="saving || openConfirmOrder" />
      <v-alert v-if="issues.length > 0" type="error" variant="tonal" class="mt-4">{{
        $t('manage.forms.validation.summary')
      }}</v-alert>
      <v-row class="justify-center">
        <v-col class="text-center">
          <v-btn
            class="mt-8 text-md-h4 text-h5"
            color="grey-900"
            size="x-large"
            rounded="pill"
            elevation="5"
            width="85%"
            :loading="saving"
            :disabled="openConfirmOrder || hasUnansweredRequired"
            @click="onPrimary"
          >
            {{
              isNoOrderParticipationOnly
                ? $t('cart.confirm_no_order_participation_button')
                : needsStripe
                  ? $t('cart.proceed_to_payment')
                  : $t('cart.order_and_attend_event')
            }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col class="text-center">
          <v-btn
            class="mb-8 text-md-h5 text-subtitle-1"
            color="grey-600"
            variant="text"
            size="small"
            rounded="pill"
            elevation="0"
            :disabled="saving || openConfirmOrder"
            @click="router.push(resolveCartPath())"
          >
            {{ $t('cart.back_to_cart') }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <ConfirmDialog v-model="openConfirmOrder" :is-confirm="true" :ok-click="confirmOrderNow" :ok-loading-state="saving">
      {{ confirmDialogMessage }}
    </ConfirmDialog>
    <ConfirmDialog v-model="isOpenAlert" :is-confirm="false">{{ alertMessage }}</ConfirmDialog>
    <ConfirmDialog
      v-model="openUserParameterConfirm"
      :is-confirm="true"
      :ok-click="() => router.push(props.resolveProfilePath())"
      :ok-text="$t('cart.go_to_setting')"
    >
      {{ targetUserParameter }}
    </ConfirmDialog>
  </v-container>
</template>

<style scoped>
.cart-form {
  max-width: 720px;
}
.cart-form-copy {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
