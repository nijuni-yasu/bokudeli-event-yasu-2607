<script setup lang="ts">
import { fetchEventFormReference, fetchEventFormResponses } from '@shokujii/base/stores/eventForm.js'
import FormAnswerFields from '@shokujii/base/components/forms/FormAnswerFields.vue'
import FormLinkedText from '@shokujii/base/components/forms/FormLinkedText.vue'
import UserAvatar from '@shokujii/base/components/UserAvatar.vue'
import { buildEventFormResponseCsv, downloadMemberCsv } from '@shokujii/base/composable/memberCsvExport.js'
import type { EventFormResponseFilter, EventFormResponseListItem } from '@shokujii/common/apis/form.js'
import type { FormResponse } from '@shokujii/common/schemas/FormResponse.js'
import type { EventMemberOrder } from '@shokujii/common/schemas/EventMemberOrder.js'
import { buildEventFormResponseRows } from '@shokujii/common/utils/orderFormAnswers.js'
import { omitHiddenFormFields, type FormField } from '@shokujii/common/schemas/formFields.js'
import type { FormAnswerInput } from '@shokujii/common/utils/validateFormAnswers.js'
import { convertToDatetime } from '@shokujii/common/utils/datetime.js'
import type { BokudeliEvent } from '@shokujii/base/stores/event.js'
import { useUserStore } from '@shokujii/base/stores/user.js'
import type { ResolveUserPathFn } from '@shokujii/base/types/profilePathResolvers.js'
import { mdiDownload, mdiEyeOutline } from '@mdi/js'

type AssignedForm = {
  name: string
  description: string
  fields: FormField[]
}

const props = defineProps<{
  event: BokudeliEvent
  /** イベントの全注文（参加者画面の購読）。参加確定・取消の判定に使う。読み込み中は null */
  orders: EventMemberOrder[] | null
  resolveUserPath: ResolveUserPathFn
}>()

const { t: $t } = useI18n()

const isEnterprise = computed(() => props.event.enterprise_id != null && props.event.enterprise_id !== '')
const rawResponses = ref<FormResponse[]>([])
const assignedForm = ref<AssignedForm | null>(null)
const fetching = ref(false)
const loadFailed = ref(false)
const retryKey = ref(0)
const selected = ref<EventFormResponseListItem | null>(null)
const previewOpen = ref(false)
const previewAnswers = ref<FormAnswerInput[]>([])

// 設定・設問・回答を Firestore から直接読み、注文状態と組み合わせて画面で集計する（Functions を経由しない。#2492）
watch(
  () => [props.event.community_id, props.event.event_id, props.event.enterprise_id, retryKey.value],
  async (_key, _previousKey, onCleanup) => {
    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })
    rawResponses.value = []
    assignedForm.value = null
    selected.value = null
    previewOpen.value = false
    loadFailed.value = false
    fetching.value = false
    if (props.event.enterprise_id != null && props.event.enterprise_id !== '') return
    fetching.value = true
    try {
      // フォームが未設定でも、過去に設定していたときの回答は一覧に出す
      const [reference, loaded] = await Promise.all([
        fetchEventFormReference(props.event.community_id, props.event.event_id),
        fetchEventFormResponses(props.event.community_id, props.event.event_id),
      ])
      if (!cancelled) {
        rawResponses.value = loaded
        assignedForm.value =
          reference == null
            ? null
            : {
                name: reference.form.name,
                description: reference.form.description,
                fields: omitHiddenFormFields(reference.form.fields),
              }
      }
    } catch {
      if (!cancelled) loadFailed.value = true
    } finally {
      if (!cancelled) fetching.value = false
    }
  },
  { immediate: true },
)

const loading = computed(() => fetching.value || props.orders == null)

/** 参加確定 → 取消の順。名前はユーザー store から引く（読み込み中は user_id） */
const responses = computed<EventFormResponseListItem[]>(() => {
  const rows = buildEventFormResponseRows({
    responses: rawResponses.value,
    // 注文の購読は event_id だけで絞るため、旧 Callable と同じくコミュニティとイベントで限定する
    orders: (props.orders ?? []).filter(
      (order) => order.community_id === props.event.community_id && order.event_id === props.event.event_id,
    ),
    displayNameOf: (userId) => useUserStore(userId).user?.user_name,
  })
  return [
    ...rows.filter((row) => row.participation === 'confirmed'),
    ...rows.filter((row) => row.participation === 'canceled'),
  ]
})

const statusLabel = (value: EventFormResponseFilter) =>
  value === 'confirmed' ? $t('manage.forms.status_ordered') : $t('manage.forms.status_canceled')

const userOf = (userId: string) => useUserStore(userId).user

const openPreview = (): void => {
  previewAnswers.value = []
  previewOpen.value = true
}

const download = () => {
  if (loading.value || loadFailed.value || responses.value.length === 0) return
  const csv = buildEventFormResponseCsv(
    responses.value.map((item) => ({
      display_name: item.display_name,
      participation_label: statusLabel(item.participation),
      answered_at: convertToDatetime(item.answered_at),
      updated_at: convertToDatetime(item.updated_at),
      answers: item.answers.map((answer) => ({
        field_id: answer.field_id,
        field_label: answer.field_label,
        display_value: answer.display_value,
      })),
    })),
  )
  downloadMemberCsv($t('manage.forms.csv_filename'), csv)
}
</script>

<template>
  <section>
    <v-alert v-if="isEnterprise" type="info" variant="tonal">{{ $t('manage.forms.enterprise_unsupported') }}</v-alert>
    <div v-else class="d-flex flex-wrap align-center justify-space-between ga-4 mb-3">
      <div>
        <div class="d-flex align-center ga-2">
          <h2 class="text-h5 font-weight-bold">{{ $t('manage.forms.responses_title') }}</h2>
          <v-chip v-if="!loading && !loadFailed" size="small" variant="tonal">{{
            $t('manage.forms.responses_count', { count: responses.length })
          }}</v-chip>
        </div>
        <p v-if="assignedForm != null" class="text-body-2 mt-1 mb-0 form-response-copy">
          {{ $t('manage.forms.current_form', { name: assignedForm.name }) }}
        </p>
        <p v-else-if="!loading && !loadFailed" class="text-body-2 text-medium-emphasis mt-1 mb-0">
          {{ $t('manage.forms.form_unset') }}
        </p>
      </div>
      <div class="d-flex flex-wrap align-center ga-3">
        <v-btn
          :prepend-icon="mdiEyeOutline"
          variant="outlined"
          :disabled="loading || loadFailed || assignedForm == null"
          @click="openPreview"
        >
          {{ $t('manage.forms.preview') }}
        </v-btn>
        <v-btn
          :prepend-icon="mdiDownload"
          variant="outlined"
          :disabled="loading || loadFailed || responses.length === 0"
          @click="download"
        >
          {{ $t('manage.forms.csv_download') }}
        </v-btn>
      </div>
    </div>
    <template v-if="!isEnterprise">
      <v-progress-linear v-if="loading" indeterminate color="primary" />
      <v-alert v-else-if="loadFailed" type="error" variant="tonal">
        {{ $t('manage.forms.load_failed') }}
        <template #append
          ><v-btn variant="text" @click="retryKey++">{{ $t('manage.forms.retry') }}</v-btn></template
        >
      </v-alert>
      <v-card v-else-if="responses.length === 0">
        <p class="text-body-1 ma-0 px-4 py-4">{{ $t('manage.forms.responses_empty') }}</p>
      </v-card>
      <v-card v-else class="overflow-hidden">
        <v-table class="form-responses-table">
          <thead>
            <tr>
              <th>#</th>
              <th colspan="2">{{ $t('manage.forms.display_name') }}</th>
              <th>{{ $t('manage.forms.status') }}</th>
              <th>{{ $t('manage.forms.updated_at') }}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in responses" :key="item.user_id">
              <td class="number-cell text-body-2">{{ index + 1 }}</td>
              <td class="minimum-cell">
                <router-link :to="props.resolveUserPath(item.user_id)">
                  <UserAvatar :user="userOf(item.user_id)" />
                </router-link>
              </td>
              <td class="name-cell">
                <router-link :to="props.resolveUserPath(item.user_id)" class="form-response-name">
                  {{ item.display_name }}
                </router-link>
              </td>
              <td>
                <v-chip
                  :color="item.participation === 'confirmed' ? 'primary' : 'secondary'"
                  size="small"
                  variant="tonal"
                  >{{ statusLabel(item.participation) }}</v-chip
                >
              </td>
              <td class="text-no-wrap text-body-2">{{ convertToDatetime(item.updated_at) }}</td>
              <td class="text-right">
                <v-btn variant="text" size="small" @click="selected = item">{{ $t('manage.forms.detail') }}</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <v-dialog
        :model-value="selected != null"
        max-width="720"
        scrollable
        @update:model-value="selected = $event ? selected : null"
      >
        <v-card v-if="selected != null">
          <v-card-title class="px-5 pt-5">{{ $t('manage.forms.response_detail') }}</v-card-title>
          <v-card-text class="pa-5">
            <div class="d-flex flex-wrap align-center ga-2 mb-2">
              <h3 class="text-h6 form-response-copy">{{ selected.display_name }}</h3>
              <v-chip
                :color="selected.participation === 'confirmed' ? 'primary' : 'secondary'"
                size="small"
                variant="tonal"
                >{{ statusLabel(selected.participation) }}</v-chip
              >
            </div>
            <dl class="d-flex flex-wrap ga-4 mb-6">
              <div>
                <dt class="text-caption text-medium-emphasis">{{ $t('manage.forms.answered_at') }}</dt>
                <dd class="text-body-2">{{ convertToDatetime(selected.answered_at) }}</dd>
              </div>
              <div>
                <dt class="text-caption text-medium-emphasis">{{ $t('manage.forms.updated_at') }}</dt>
                <dd class="text-body-2">{{ convertToDatetime(selected.updated_at) }}</dd>
              </div>
            </dl>
            <v-sheet v-for="answer in selected.answers" :key="answer.field_id" border rounded="lg" class="pa-4 mb-3">
              <div class="text-subtitle-2 mb-2 form-response-copy">{{ answer.field_label }}</div>
              <div class="text-body-1 form-response-copy">
                {{ answer.display_value !== '' ? answer.display_value : $t('manage.forms.no_answer') }}
              </div>
            </v-sheet>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="selected = null">{{ $t('manage.forms.close') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="previewOpen" max-width="720" scrollable>
        <v-card v-if="assignedForm != null">
          <v-card-title>{{ $t('manage.forms.preview') }}</v-card-title>
          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-6">{{ $t('manage.forms.preview_notice') }}</v-alert>
            <h2 class="text-h6 mb-2 form-response-copy">{{ assignedForm.name }}</h2>
            <p v-if="assignedForm.description !== ''" class="text-body-2 text-medium-emphasis mb-6 form-response-copy">
              <FormLinkedText :text="assignedForm.description" />
            </p>
            <FormAnswerFields
              v-if="assignedForm.fields.length > 0"
              v-model="previewAnswers"
              :fields="assignedForm.fields"
            />
            <v-alert v-else type="info" variant="tonal">{{ $t('manage.forms.preview_empty') }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="previewOpen = false">{{ $t('manage.forms.close') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </section>
</template>

<style scoped>
.form-response-copy {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.form-responses-table :deep(th) {
  white-space: nowrap;
}
.form-response-name {
  color: rgba(var(--v-theme-on-surface));
  overflow-wrap: anywhere;
}
.number-cell {
  width: 60px;
}
.name-cell {
  width: 250px;
  max-width: 280px;
}
.minimum-cell {
  width: 1px;
  padding: 0 !important;
}
</style>
