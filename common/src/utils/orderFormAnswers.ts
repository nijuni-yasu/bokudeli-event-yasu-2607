import type { CommunityForm } from '../schemas/CommunityForm.js'
import type { FormCheckoutAttempt } from '../schemas/FormCheckoutAttempt.js'
import type { FormAnswerSnapshot, FormResponse } from '../schemas/FormResponse.js'
import { omitHiddenFormFields, type FormField } from '../schemas/formFields.js'
import {
  answersToInputs,
  compactFormAnswerInput,
  formatFormAnswerDisplay,
  type FormAnswerInput,
} from './validateFormAnswers.js'

/** 下書き（試行）が、いま設定されているフォームの同じ版に対するものか */
export function isAttemptForCurrentForm(attempt: FormCheckoutAttempt, form: CommunityForm): boolean {
  if (attempt.source_form_id === '') {
    return false
  }
  return attempt.source_form_id === form.id && attempt.definition_version === form.definition_version
}

/** 確定回答が、いま設定されているフォームの同じ版に対するものか */
export function isConfirmedResponseForCurrentForm(response: FormResponse, form: CommunityForm): boolean {
  if (response.source_form_id === '') {
    return false
  }
  return response.source_form_id === form.id && response.definition_version === form.definition_version
}

/** 初期表示用。版が上がっていても、同じフォームの過去回答を残っている設問へ載せる。 */
export function isConfirmedResponseForSameForm(response: FormResponse, form: CommunityForm): boolean {
  if (response.source_form_id === '') {
    return false
  }
  return response.source_form_id === form.id
}

/** 過去の回答を、いま表示する設問・選択肢に残っているものだけに絞って入力値へ戻す */
export function initialAnswersForVisibleFields(answers: FormAnswerSnapshot[], fields: FormField[]): FormAnswerInput[] {
  const fieldById = new Map(fields.map((field) => [field.field_id, field]))
  return answersToInputs(answers).flatMap((answer) => {
    const field = fieldById.get(answer.field_id)
    if (field == null) {
      return []
    }
    if (field.type === 'checkbox') {
      const allowed = new Set(field.options.map((option) => option.option_id))
      return [
        compactFormAnswerInput({
          ...answer,
          option_ids: (answer.option_ids ?? []).filter((id) => allowed.has(id)),
        }),
      ]
    }
    if (field.type === 'radio' || field.type === 'select') {
      const allowed = new Set(field.options.map((option) => option.option_id))
      if (answer.option_id != null && !allowed.has(answer.option_id)) {
        return [{ field_id: answer.field_id }]
      }
    }
    return [compactFormAnswerInput(answer)]
  })
}

export type OrderFormAnswerSource = 'attempt' | 'confirmed' | 'empty'

export type OrderFormForAnswer = {
  source_form_id: string
  name: string
  description: string
  purpose: string
  definition_version: number
  fields: FormField[]
  initial_answers: FormAnswerInput[]
  source: OrderFormAnswerSource
}

/**
 * 回答画面に出す設問と初期値を組み立てる。
 * 初期値は、今の版の下書き → 同じフォームの確定回答 → 空 の順に使う。
 */
export function buildOrderFormForAnswer(params: {
  form: CommunityForm
  attempts: FormCheckoutAttempt[]
  confirmed: FormResponse | undefined
}): OrderFormForAnswer {
  const { form, attempts, confirmed } = params
  const fields = omitHiddenFormFields(form.fields)
  const base = {
    source_form_id: form.id,
    name: form.name,
    description: form.description,
    purpose: form.purpose,
    definition_version: form.definition_version,
    fields,
  }
  const latestAttempt = attempts
    .filter((attempt) => isAttemptForCurrentForm(attempt, form))
    .sort((a, b) => b.updated_at - a.updated_at)[0]
  if (latestAttempt != null) {
    return {
      ...base,
      initial_answers: initialAnswersForVisibleFields(latestAttempt.answers, fields),
      source: 'attempt',
    }
  }
  if (confirmed != null && isConfirmedResponseForSameForm(confirmed, form)) {
    return { ...base, initial_answers: initialAnswersForVisibleFields(confirmed.answers, fields), source: 'confirmed' }
  }
  return { ...base, initial_answers: [], source: 'empty' }
}

export type EventFormResponseParticipation = 'confirmed' | 'canceled'

export type EventFormResponseRow = {
  user_id: string
  display_name: string
  participation: EventFormResponseParticipation
  answered_at: number
  updated_at: number
  answers: Array<{
    field_id: string
    field_label: string
    display_value: string
  }>
}

/**
 * 回答一覧の行を作る。参加確定（ordered）のユーザーは「確定」、取消だけのユーザーは「取消」。
 * どちらの注文も無い回答（カートのまま等）は出さない。
 */
export function buildEventFormResponseRows(params: {
  responses: FormResponse[]
  orders: Array<{ user_id: string; status: string }>
  displayNameOf: (userId: string) => string | undefined
}): EventFormResponseRow[] {
  const orderedUsers = new Set(params.orders.filter((o) => o.status === 'ordered').map((o) => o.user_id))
  const canceledUsers = new Set(params.orders.filter((o) => o.status === 'canceled').map((o) => o.user_id))
  return params.responses
    .filter((response) => orderedUsers.has(response.user_id) || canceledUsers.has(response.user_id))
    .map((response) => ({
      user_id: response.user_id,
      display_name: params.displayNameOf(response.user_id) ?? response.user_id,
      participation: orderedUsers.has(response.user_id) ? 'confirmed' : 'canceled',
      answered_at: response.answered_at,
      updated_at: response.updated_at,
      answers: response.answers.map((answer) => ({
        field_id: answer.field_id,
        field_label: answer.field_label,
        display_value: formatFormAnswerDisplay(answer),
      })),
    }))
}
