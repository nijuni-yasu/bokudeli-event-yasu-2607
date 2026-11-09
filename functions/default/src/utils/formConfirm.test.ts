import { describe, expect, it, vi } from 'vitest'
import { CommunityForm } from '@shokujii/common/schemas/CommunityForm.js'
import { EventFormConfig } from '@shokujii/common/schemas/EventFormConfig.js'
import { FormCheckoutAttempt } from '@shokujii/common/schemas/FormCheckoutAttempt.js'
import { FormResponse } from '@shokujii/common/schemas/FormResponse.js'
import type { FormAnswerSnapshot } from '@shokujii/common/schemas/FormResponse.js'
import type { FormField } from '@shokujii/common/schemas/formFields.js'
import type { Transaction } from 'firebase-admin/firestore'
import { HttpsError } from 'firebase-functions/https'
import { ORDER_FORM_INVALID_MESSAGE } from '@shokujii/common/apis/form.js'
import type { ShokujiiEvent } from '../stores/event.js'
import { getFormResponse } from '../stores/form.js'
import { loadEventFormReferenceIfPf } from './formAccess.js'
import {
  isAttemptForCurrentForm,
  isConfirmedResponseForCurrentForm,
  isConfirmedResponseForSameForm,
  mergeAttemptAnswersWithInactiveExisting,
  planFormConfirmation,
} from './formConfirm.js'

vi.mock('../stores/form.js', () => ({
  newFormCheckoutAttemptId: vi.fn(() => 'new-attempt'),
  getFormResponse: vi.fn(),
  getFormCheckoutAttempt: vi.fn(),
}))
vi.mock('./enterpriseSubsidyOrders.js', () => ({}))
vi.mock('./formAccess.js', () => ({
  loadEventFormReferenceIfPf: vi.fn(),
}))

const hiddenField: FormField = {
  field_id: 'hidden',
  type: 'text',
  label: '以前の設問',
  description: '',
  required: false,
  hidden_for_new: true,
}
const visibleField: FormField = { ...hiddenField, field_id: 'visible', hidden_for_new: false }
const hiddenAnswer: FormAnswerSnapshot = {
  field_id: 'hidden',
  field_type: 'text',
  field_label: '回答時の設問',
  field_description: '',
  text_value: '過去の回答',
}
const oldVisibleAnswer: FormAnswerSnapshot = { ...hiddenAnswer, field_id: 'visible', text_value: '変更前' }
const updatedAnswer: FormAnswerSnapshot = { ...oldVisibleAnswer, text_value: '変更後' }

describe('Checkout 試行の定義スナップショット', () => {
  it('削除済み設問の回答は、残った設問への再回答を確定しても保持する', () => {
    expect(
      mergeAttemptAnswersWithInactiveExisting([updatedAnswer], [hiddenAnswer, oldVisibleAnswer], [visibleField]),
    ).toEqual([hiddenAnswer, updatedAnswer])
  })

  it('すべての設問を削除しても過去回答を保持する', () => {
    expect(mergeAttemptAnswersWithInactiveExisting([], [hiddenAnswer, oldVisibleAnswer], [])).toEqual([
      hiddenAnswer,
      oldVisibleAnswer,
    ])
  })

  it('同じ設問文でも新しい ID で作り直した設問は、過去回答を上書きしない', () => {
    const recreatedField = { ...visibleField, field_id: 'recreated' }
    const recreatedAnswer = { ...oldVisibleAnswer, field_id: 'recreated', text_value: '新しい回答' }
    expect(mergeAttemptAnswersWithInactiveExisting([recreatedAnswer], [oldVisibleAnswer], [recreatedField])).toEqual([
      oldVisibleAnswer,
      recreatedAnswer,
    ])
  })

  it('Checkout 中に設問が再表示・削除されても開始時に非表示だった回答を保持する', () => {
    const fields = [hiddenField, visibleField].map((field) => ({ ...field }))
    const attempt = new FormCheckoutAttempt('attempt', {
      user_id: 'user',
      definition_version: 2,
      revision_basis: 1,
      answers: [updatedAnswer],
      fields_snapshot: fields,
      status: 'frozen',
    })
    fields[0].hidden_for_new = false
    fields.splice(0, 1)
    const restored = new FormCheckoutAttempt(attempt.id, {
      ...attempt,
      fields_snapshot: attempt.toFirestore().fields_snapshot,
    })
    expect(
      mergeAttemptAnswersWithInactiveExisting(
        restored.answers,
        [hiddenAnswer, oldVisibleAnswer],
        restored.fields_snapshot,
      ),
    ).toEqual([hiddenAnswer, updatedAnswer])
  })

  it('今回表示した任意設問の未回答は、古い回答で埋め直さない', () => {
    expect(
      mergeAttemptAnswersWithInactiveExisting([], [hiddenAnswer, oldVisibleAnswer], [hiddenField, visibleField]),
    ).toEqual([hiddenAnswer])
  })

  it('フォームIDが無い旧試行は現行フォームと一致しない', () => {
    const form = new CommunityForm('form-1', {
      community_id: 'c1',
      name: '事前アンケート',
      fields: [],
      definition_version: 1,
      created_by: 'u1',
      updated_by: 'u1',
    })
    const attempt = new FormCheckoutAttempt('legacy', {
      user_id: 'user',
      definition_version: 1,
      revision_basis: 1,
      answers: [updatedAnswer],
      status: 'frozen',
    })
    expect(isAttemptForCurrentForm(attempt, form)).toBe(false)
  })

  it('確定済み回答は同じフォームIDとバージョンのときだけ現行とみなす', () => {
    const form = new CommunityForm('form-1', {
      community_id: 'c1',
      name: '事前アンケート',
      fields: [],
      definition_version: 2,
      created_by: 'u1',
      updated_by: 'u1',
    })
    const current = new FormResponse('user', {
      user_id: 'user',
      source_form_id: 'form-1',
      definition_version: 2,
      revision: 1,
      answers: [updatedAnswer],
    })
    const otherForm = new FormResponse('user', {
      user_id: 'user',
      source_form_id: 'form-2',
      definition_version: 2,
      revision: 1,
      answers: [updatedAnswer],
    })
    const legacy = new FormResponse('user', {
      user_id: 'user',
      definition_version: 2,
      revision: 1,
      answers: [updatedAnswer],
    })
    expect(isConfirmedResponseForCurrentForm(current, form)).toBe(true)
    expect(isConfirmedResponseForCurrentForm(otherForm, form)).toBe(false)
    expect(isConfirmedResponseForCurrentForm(legacy, form)).toBe(false)
  })

  it('別フォームの確定回答は新しい回答に混ぜない', () => {
    expect(
      mergeAttemptAnswersWithInactiveExisting([updatedAnswer], [hiddenAnswer, oldVisibleAnswer], [visibleField], {
        existing: 'form-old',
        attempt: 'form-new',
      }),
    ).toEqual([updatedAnswer])
  })

  it('同じフォームの非表示回答は引き継ぐ', () => {
    expect(
      mergeAttemptAnswersWithInactiveExisting([updatedAnswer], [hiddenAnswer, oldVisibleAnswer], [visibleField], {
        existing: 'form-1',
        attempt: 'form-1',
      }),
    ).toEqual([hiddenAnswer, updatedAnswer])
  })

  it('同じフォームIDなら版が違っても初期表示の対象にする', () => {
    const form = new CommunityForm('form-1', {
      community_id: 'c1',
      name: '事前アンケート',
      fields: [],
      definition_version: 3,
      created_by: 'u1',
      updated_by: 'u1',
    })
    const older = new FormResponse('user', {
      user_id: 'user',
      source_form_id: 'form-1',
      definition_version: 2,
      revision: 1,
      answers: [updatedAnswer],
    })
    const otherForm = new FormResponse('user', {
      user_id: 'user',
      source_form_id: 'form-2',
      definition_version: 2,
      revision: 1,
      answers: [updatedAnswer],
    })
    expect(isConfirmedResponseForSameForm(older, form)).toBe(true)
    expect(isConfirmedResponseForCurrentForm(older, form)).toBe(false)
    expect(isConfirmedResponseForSameForm(otherForm, form)).toBe(false)
  })

  it('定義を持たない旧試行は読み込み可能で、未編集の過去回答を消さない', () => {
    const attempt = new FormCheckoutAttempt('legacy', {
      user_id: 'user',
      definition_version: 1,
      revision_basis: 1,
      answers: [updatedAnswer],
      status: 'frozen',
    })
    expect(attempt.toFirestore()).not.toHaveProperty('fields_snapshot')
    expect(
      mergeAttemptAnswersWithInactiveExisting(
        attempt.answers,
        [hiddenAnswer, oldVisibleAnswer],
        attempt.fields_snapshot,
      ),
    ).toEqual([hiddenAnswer, updatedAnswer])
  })
})

describe('注文確定に一緒に渡したフォーム回答（form_submission）', () => {
  const requiredField: FormField = {
    field_id: 'q1',
    type: 'text',
    label: '参加目的',
    description: '',
    required: true,
    hidden_for_new: false,
  }
  const form = new CommunityForm('form-1', {
    community_id: 'c1',
    name: '事前アンケート',
    fields: [requiredField, hiddenField],
    definition_version: 3,
    created_by: 'u1',
    updated_by: 'u1',
  })
  const event = { id: 'e1', community_id: 'c1' } as unknown as ShokujiiEvent
  const transaction = {} as unknown as Transaction

  const plan = (submission: {
    source_form_id?: string
    definition_version: number
    answers: { field_id: string; text_value?: string }[]
  }) =>
    planFormConfirmation({
      event,
      userId: 'user',
      attemptId: undefined,
      submission: { source_form_id: 'form-1', ...submission },
      transaction,
    })

  const mockReference = (existing?: FormResponse) => {
    vi.mocked(loadEventFormReferenceIfPf).mockResolvedValue({
      config: new EventFormConfig('current', { source_form_id: 'form-1' }),
      form,
    })
    vi.mocked(getFormResponse).mockResolvedValue(existing)
  }

  it('検証を通った回答から、未保存の試行を組み立てる', async () => {
    const existing = new FormResponse('user', {
      user_id: 'user',
      source_form_id: 'form-1',
      definition_version: 2,
      revision: 4,
      answers: [],
      answered_at: 1,
    })
    mockReference(existing)
    const result = await plan({ definition_version: 3, answers: [{ field_id: 'q1', text_value: '交流' }] })
    expect(result.kind).toBe('apply')
    if (result.kind !== 'apply') return
    expect(result.attempt.id).toBe('new-attempt')
    expect(result.attempt.source_form_id).toBe('form-1')
    expect(result.attempt.definition_version).toBe(3)
    expect(result.attempt.revision_basis).toBe(4)
    expect(result.attempt.status).toBe('pending')
    expect(result.attempt.fields_snapshot?.map((field) => field.field_id)).toEqual(['q1'])
    expect(result.existing).toBe(existing)
  })

  it('必須の未回答は details.form_issues 付きの failed-precondition にする', async () => {
    mockReference()
    const error = await plan({ definition_version: 3, answers: [] }).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(HttpsError)
    if (!(error instanceof HttpsError)) return
    expect(error.code).toBe('failed-precondition')
    expect(error.message).toBe(ORDER_FORM_INVALID_MESSAGE)
    expect(error.details).toEqual({ form_issues: [{ field_id: 'q1', code: 'required' }] })
  })

  it('版が違うときは version_mismatch を返す', async () => {
    mockReference()
    const error = await plan({ definition_version: 2, answers: [{ field_id: 'q1', text_value: '交流' }] }).catch(
      (e: unknown) => e,
    )
    expect(error).toBeInstanceOf(HttpsError)
    if (!(error instanceof HttpsError)) return
    expect(error.details).toEqual({ form_issues: [{ code: 'version_mismatch' }] })
  })

  it('表示後に別フォームへ差し替えられたら version_mismatch を返す', async () => {
    mockReference()
    const error = await plan({
      source_form_id: 'form-2',
      definition_version: 3,
      answers: [{ field_id: 'q1', text_value: '交流' }],
    }).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(HttpsError)
    if (!(error instanceof HttpsError)) return
    expect(error.details).toEqual({ form_issues: [{ code: 'version_mismatch' }] })
  })

  it('フォームが設定されていないイベントでは回答を無視する', async () => {
    vi.mocked(loadEventFormReferenceIfPf).mockResolvedValue(undefined)
    await expect(plan({ definition_version: 1, answers: [] })).resolves.toEqual({ kind: 'none' })
  })
})
