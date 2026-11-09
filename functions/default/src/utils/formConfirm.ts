import { HttpsError } from 'firebase-functions/https'
import type { Transaction } from 'firebase-admin/firestore'
import { FormResponse } from '@shokujii/common/schemas/FormResponse.js'
import { FormCheckoutAttempt } from '@shokujii/common/schemas/FormCheckoutAttempt.js'
import type { CommunityForm } from '@shokujii/common/schemas/CommunityForm.js'
import type { FormField } from '@shokujii/common/schemas/formFields.js'
import type { FormAnswerSnapshot } from '@shokujii/common/schemas/FormResponse.js'
import { omitHiddenFormFields } from '@shokujii/common/schemas/formFields.js'
import { ORDER_FORM_INVALID_MESSAGE, type OrderFormSubmission } from '@shokujii/common/apis/form.js'
import { validateFormAnswers } from '@shokujii/common/utils/validateFormAnswers.js'
import { isAttemptForCurrentForm, isConfirmedResponseForCurrentForm } from '@shokujii/common/utils/orderFormAnswers.js'
import {
  getFormCheckoutAttempt,
  getFormResponse,
  newFormCheckoutAttemptId,
  saveFormCheckoutAttempt,
  saveFormResponse,
} from '../stores/form.js'
import { loadEventFormReferenceIfPf } from './formAccess.js'
import type { ShokujiiEvent } from '../stores/event.js'

export {
  isAttemptForCurrentForm,
  isConfirmedResponseForCurrentForm,
  isConfirmedResponseForSameForm,
} from '@shokujii/common/utils/orderFormAnswers.js'

export async function requireAttemptForLatestForm(params: {
  event: ShokujiiEvent
  userId: string
  attemptId: string | undefined
  form: CommunityForm
  transaction: Transaction
}): Promise<FormCheckoutAttempt> {
  if (params.attemptId == null || params.attemptId === '') {
    throw new HttpsError('failed-precondition', 'フォームの回答が必要です')
  }
  const attempt = await getFormCheckoutAttempt(
    params.event.community_id,
    params.event.id,
    params.attemptId,
    params.transaction,
  )
  if (attempt == null || attempt.user_id !== params.userId) {
    throw new HttpsError('failed-precondition', 'フォームの回答が見つかりません')
  }
  if (attempt.status === 'consumed') {
    throw new HttpsError('failed-precondition', 'この回答はすでに使用されています')
  }
  if (!isAttemptForCurrentForm(attempt, params.form)) {
    throw new HttpsError('failed-precondition', '設問が更新されています。回答画面でやり直してください')
  }
  return attempt
}

export type FormConfirmPlan =
  | { kind: 'none' }
  | { kind: 'reuse'; existing: FormResponse }
  | { kind: 'apply'; attempt: FormCheckoutAttempt; existing?: FormResponse }

/**
 * 注文確定時のフォーム処理を決める。
 * - submission がある: 最新のフォームで検証し、試行をメモリ上で組み立てる（保存は呼び出し元）
 * - attemptId がある: 旧クライアントが saveOrderFormAttempt で保存した試行を使う
 * - どちらも無い: 今の版の確定回答があれば再利用する
 * 読み取りだけを行う。トランザクション内の他の読み取りより後、書き込みより前に呼ぶ。
 */
export async function planFormConfirmation(params: {
  event: ShokujiiEvent
  userId: string
  attemptId: string | undefined
  submission?: OrderFormSubmission
  transaction: Transaction
}): Promise<FormConfirmPlan> {
  const reference = await loadEventFormReferenceIfPf(params.event, params.transaction)
  if (reference == null) {
    return { kind: 'none' }
  }
  const existing = await getFormResponse(params.event.community_id, params.event.id, params.userId, params.transaction)
  if (params.submission != null) {
    const attempt = buildAttemptFromSubmission({
      event: params.event,
      userId: params.userId,
      form: reference.form,
      submission: params.submission,
      existing,
    })
    return { kind: 'apply', attempt, existing }
  }
  if (params.attemptId != null && params.attemptId !== '') {
    const attempt = await requireAttemptForLatestForm({
      event: params.event,
      userId: params.userId,
      attemptId: params.attemptId,
      form: reference.form,
      transaction: params.transaction,
    })
    return { kind: 'apply', attempt, existing }
  }
  if (existing != null && isConfirmedResponseForCurrentForm(existing, reference.form)) {
    return { kind: 'reuse', existing }
  }
  throw new HttpsError('failed-precondition', 'フォームの回答が必要です')
}

/** 回答を検証し、未保存の試行を作る。不備があれば details.form_issues 付きの failed-precondition を投げる */
export function buildAttemptFromSubmission(params: {
  event: ShokujiiEvent
  userId: string
  form: CommunityForm
  submission: OrderFormSubmission
  existing: FormResponse | undefined
}): FormCheckoutAttempt {
  // 表示後に別フォーム（複製で版番号が同じものを含む）へ差し替えられたら、版違いと同じく再読み込みさせる
  if (params.submission.source_form_id !== params.form.id) {
    throw new HttpsError('failed-precondition', ORDER_FORM_INVALID_MESSAGE, {
      form_issues: [{ code: 'version_mismatch' }],
    })
  }
  const fields = omitHiddenFormFields(params.form.fields)
  const validated = validateFormAnswers({
    fields,
    answers: params.submission.answers,
    definitionVersion: params.form.definition_version,
    expectedDefinitionVersion: params.submission.definition_version,
  })
  if (!validated.ok) {
    throw new HttpsError('failed-precondition', ORDER_FORM_INVALID_MESSAGE, { form_issues: validated.issues })
  }
  return new FormCheckoutAttempt(newFormCheckoutAttemptId(params.event.community_id, params.event.id), {
    user_id: params.userId,
    source_form_id: params.form.id,
    definition_version: params.form.definition_version,
    revision_basis: params.existing?.revision ?? 0,
    answers: validated.answers,
    fields_snapshot: fields,
    status: 'pending',
  })
}

export function mergeAttemptAnswersWithInactiveExisting(
  attemptAnswers: FormAnswerSnapshot[],
  existingAnswers: FormAnswerSnapshot[] | undefined,
  fields: FormField[] | undefined,
  sourceFormIds?: { existing?: string; attempt?: string },
): FormAnswerSnapshot[] {
  // 別フォームへ差し替えた再注文では、旧フォームだけの回答を新フォームへ混ぜない。
  if (sourceFormIds != null && (sourceFormIds.existing ?? '') !== (sourceFormIds.attempt ?? '')) {
    return [...attemptAnswers]
  }
  // 今回の設問に無い確定済み回答は残す。削除した設問や種類変更前の旧IDも上書きしない。
  const editableIds = new Set((fields ?? []).filter((field) => !field.hidden_for_new).map((field) => field.field_id))
  const attemptIds = new Set(attemptAnswers.map((answer) => answer.field_id))
  const kept = (existingAnswers ?? []).filter(
    (answer) => !editableIds.has(answer.field_id) && !attemptIds.has(answer.field_id),
  )
  return [...kept, ...attemptAnswers]
}

export async function applyAttemptToConfirmedResponse(params: {
  event: ShokujiiEvent
  userId: string
  attempt: FormCheckoutAttempt
  transaction: Transaction
  existing?: FormResponse
  ignoreDefinitionMismatch?: boolean
}): Promise<void> {
  const existing =
    params.existing ??
    (await getFormResponse(params.event.community_id, params.event.id, params.userId, params.transaction))
  if (existing != null && existing.revision > params.attempt.revision_basis) {
    params.attempt.status = 'consumed'
    await saveFormCheckoutAttempt(params.event.community_id, params.event.id, params.attempt, params.transaction)
    return
  }
  if (
    params.ignoreDefinitionMismatch !== true &&
    existing != null &&
    existing.source_form_id !== '' &&
    existing.source_form_id === params.attempt.source_form_id &&
    existing.definition_version > params.attempt.definition_version
  ) {
    params.attempt.status = 'consumed'
    await saveFormCheckoutAttempt(params.event.community_id, params.event.id, params.attempt, params.transaction)
    return
  }

  const now = Date.now()
  const nextRevision = (existing?.revision ?? 0) + 1
  const sameForm =
    existing != null && existing.source_form_id !== '' && existing.source_form_id === params.attempt.source_form_id
  const confirmed = new FormResponse(params.userId, {
    user_id: params.userId,
    source_form_id: params.attempt.source_form_id,
    definition_version: params.attempt.definition_version,
    revision: nextRevision,
    answers: mergeAttemptAnswersWithInactiveExisting(
      params.attempt.answers,
      sameForm ? existing.answers : undefined,
      params.attempt.fields_snapshot,
      { existing: existing?.source_form_id ?? '', attempt: params.attempt.source_form_id },
    ),
    answered_at: sameForm ? (existing.answered_at ?? now) : now,
    updated_at: now,
  })
  await saveFormResponse(params.event.community_id, params.event.id, confirmed, params.transaction)
  params.attempt.status = 'consumed'
  await saveFormCheckoutAttempt(params.event.community_id, params.event.id, params.attempt, params.transaction)
}
