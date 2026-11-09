import { onCall, HttpsError } from 'firebase-functions/https'
import {
  GetOrderFormForCartRequestSchema,
  SaveOrderFormAttemptRequestSchema,
  type GetOrderFormForCartResponse,
  type SaveOrderFormAttemptResponse,
} from '@shokujii/common/apis/form.js'
import { validateFormAnswers } from '@shokujii/common/utils/validateFormAnswers.js'
import { omitHiddenFormFields } from '@shokujii/common/schemas/formFields.js'
import { buildOrderFormForAnswer } from '@shokujii/common/utils/orderFormAnswers.js'
import { createModuleLogger } from './utils/logger.js'
import { loadEventFormReferenceIfPf, parseOrThrow, requireAuthUid, requirePfEventForForm } from './utils/formAccess.js'
import { getOrdersInCart } from './stores/memberOrder.js'
import { createFormCheckoutAttempt, getFormResponse, listPendingFormCheckoutAttemptsForUser } from './stores/form.js'

const logger = createModuleLogger('formOrder')

async function requireInCart(communityId: string, eventId: string, userId: string): Promise<void> {
  const cartOrders = await getOrdersInCart(communityId, eventId, userId)
  if (cartOrders.length === 0) {
    throw new HttpsError('failed-precondition', 'カートに注文があるときだけ回答できます')
  }
}

export const getOrderFormForCart = onCall(async (request): Promise<GetOrderFormForCartResponse> => {
  const uid = await requireAuthUid(request.auth?.uid)
  const { community_id, event_id } = parseOrThrow(GetOrderFormForCartRequestSchema, request.data)
  const event = await requirePfEventForForm(community_id, event_id)
  await requireInCart(community_id, event_id, uid)

  const reference = await loadEventFormReferenceIfPf(event)
  if (reference == null) {
    return { has_form: false, community_name: event.community_name, name: '', description: '', purpose: '' }
  }

  const [pendingAttempts, confirmed] = await Promise.all([
    listPendingFormCheckoutAttemptsForUser(
      community_id,
      event_id,
      uid,
      reference.form.id,
      reference.form.definition_version,
    ),
    getFormResponse(community_id, event_id, uid),
  ])
  return {
    has_form: true,
    community_name: event.community_name,
    ...buildOrderFormForAnswer({ form: reference.form, attempts: pendingAttempts, confirmed }),
  }
})

export const saveOrderFormAttempt = onCall(async (request): Promise<SaveOrderFormAttemptResponse> => {
  const uid = await requireAuthUid(request.auth?.uid)
  const data = parseOrThrow(SaveOrderFormAttemptRequestSchema, request.data)
  const event = await requirePfEventForForm(data.community_id, data.event_id)
  await requireInCart(data.community_id, data.event_id, uid)

  const reference = await loadEventFormReferenceIfPf(event)
  if (reference == null) {
    throw new HttpsError('failed-precondition', 'このイベントにフォームはありません')
  }
  const fields = omitHiddenFormFields(reference.form.fields)
  const validated = validateFormAnswers({
    fields,
    answers: data.answers,
    definitionVersion: reference.form.definition_version,
    expectedDefinitionVersion: data.definition_version,
  })
  if (!validated.ok) {
    return { attempt_id: '', issues: validated.issues }
  }

  const confirmed = await getFormResponse(data.community_id, data.event_id, uid)
  const attempt = await createFormCheckoutAttempt(data.community_id, data.event_id, {
    user_id: uid,
    source_form_id: reference.form.id,
    definition_version: reference.form.definition_version,
    revision_basis: confirmed?.revision ?? 0,
    answers: validated.answers,
    fields_snapshot: fields,
    status: 'pending',
  })
  logger.info('注文フローの回答試行を保存した', {
    communityId: data.community_id,
    eventId: data.event_id,
    userId: uid,
    attemptId: attempt.id,
  })
  return { attempt_id: attempt.id }
})
