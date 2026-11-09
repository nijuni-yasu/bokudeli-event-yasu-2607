import { describe, expect, it } from 'vitest'
import { CommunityForm } from '../schemas/CommunityForm.js'
import { FormCheckoutAttempt } from '../schemas/FormCheckoutAttempt.js'
import { FormResponse, type FormAnswerSnapshot } from '../schemas/FormResponse.js'
import type { FormField } from '../schemas/formFields.js'
import { buildEventFormResponseRows, buildOrderFormForAnswer } from './orderFormAnswers.js'

const textField: FormField = {
  field_id: 'q1',
  type: 'text',
  label: '参加目的',
  description: '',
  required: false,
  hidden_for_new: false,
}
const hiddenField: FormField = { ...textField, field_id: 'old', hidden_for_new: true }

const form = new CommunityForm('form-1', {
  community_id: 'c1',
  name: '事前アンケート',
  description: '説明',
  purpose: '当日の準備',
  fields: [textField, hiddenField],
  definition_version: 2,
  created_by: 'u1',
  updated_by: 'u1',
})

const answer = (text: string): FormAnswerSnapshot => ({
  field_id: 'q1',
  field_type: 'text',
  field_label: '参加目的',
  field_description: '',
  text_value: text,
})

const attempt = (id: string, version: number, updatedAt: number, text: string) =>
  new FormCheckoutAttempt(id, {
    user_id: 'user',
    source_form_id: 'form-1',
    definition_version: version,
    revision_basis: 0,
    answers: [answer(text)],
    status: 'frozen',
    updated_at: updatedAt,
  })

const confirmed = (sourceFormId: string, text: string) =>
  new FormResponse('user', {
    user_id: 'user',
    source_form_id: sourceFormId,
    definition_version: 1,
    revision: 1,
    answers: [answer(text)],
    answered_at: 1,
  })

describe('buildOrderFormForAnswer', () => {
  it('非表示の設問を除き、今の版の最新の下書きを初期値にする', () => {
    const result = buildOrderFormForAnswer({
      form,
      attempts: [
        attempt('a1', 2, 10, '古い下書き'),
        attempt('a2', 2, 20, '新しい下書き'),
        attempt('a3', 1, 30, '旧版'),
      ],
      confirmed: confirmed('form-1', '確定回答'),
    })
    expect(result.fields.map((field) => field.field_id)).toEqual(['q1'])
    expect(result.source).toBe('attempt')
    expect(result.initial_answers).toEqual([{ field_id: 'q1', text_value: '新しい下書き' }])
    expect(result).toMatchObject({
      source_form_id: 'form-1',
      name: '事前アンケート',
      description: '説明',
      purpose: '当日の準備',
      definition_version: 2,
    })
  })

  it('下書きが無ければ、同じフォームの確定回答を版が違っても初期値にする', () => {
    const result = buildOrderFormForAnswer({ form, attempts: [], confirmed: confirmed('form-1', '確定回答') })
    expect(result.source).toBe('confirmed')
    expect(result.initial_answers).toEqual([{ field_id: 'q1', text_value: '確定回答' }])
  })

  it('別フォームの確定回答は使わない', () => {
    const result = buildOrderFormForAnswer({ form, attempts: [], confirmed: confirmed('form-2', '別フォーム') })
    expect(result.source).toBe('empty')
    expect(result.initial_answers).toEqual([])
  })
})

describe('buildEventFormResponseRows', () => {
  const response = (userId: string) =>
    new FormResponse(userId, {
      user_id: userId,
      source_form_id: 'form-1',
      definition_version: 1,
      revision: 1,
      answers: [answer('交流')],
      answered_at: 1,
      updated_at: 2,
    })

  it('参加確定は confirmed、取消だけは canceled、注文が無い回答は除く', () => {
    const rows = buildEventFormResponseRows({
      responses: [response('ordered-user'), response('canceled-user'), response('cart-user'), response('both-user')],
      orders: [
        { user_id: 'ordered-user', status: 'ordered' },
        { user_id: 'canceled-user', status: 'canceled' },
        { user_id: 'cart-user', status: 'in_cart' },
        { user_id: 'both-user', status: 'canceled' },
        { user_id: 'both-user', status: 'ordered' },
      ],
      displayNameOf: (userId) => (userId === 'ordered-user' ? '参加者A' : undefined),
    })
    expect(rows.map((row) => [row.user_id, row.participation, row.display_name])).toEqual([
      ['ordered-user', 'confirmed', '参加者A'],
      ['canceled-user', 'canceled', 'canceled-user'],
      ['both-user', 'confirmed', 'both-user'],
    ])
    expect(rows[0].answers).toEqual([{ field_id: 'q1', field_label: '参加目的', display_value: '交流' }])
  })
})
