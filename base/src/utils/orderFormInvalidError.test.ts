import { describe, expect, it } from 'vitest'
import { FunctionsError } from 'firebase/functions'
import { FirebaseError } from 'firebase/app'
import { ORDER_FORM_INVALID_MESSAGE } from '@shokujii/common/apis/form.js'
import { parseOrderFormInvalidError } from './orderFormInvalidError.js'

describe('parseOrderFormInvalidError', () => {
  it('回答の不備は項目ごとの指摘を返す', () => {
    const error = new FunctionsError('failed-precondition', ORDER_FORM_INVALID_MESSAGE, {
      form_issues: [{ field_id: 'q1', code: 'required' }],
    })
    expect(parseOrderFormInvalidError(error)).toEqual([{ field_id: 'q1', code: 'required' }])
  })

  it('版の不一致も指摘として返す', () => {
    const error = new FunctionsError('failed-precondition', ORDER_FORM_INVALID_MESSAGE, {
      form_issues: [{ code: 'version_mismatch' }],
    })
    expect(parseOrderFormInvalidError(error)).toEqual([{ code: 'version_mismatch' }])
  })

  it.each([
    ['別の failed-precondition', new FunctionsError('failed-precondition', '定員に達しています')],
    ['details の形が違う', new FunctionsError('failed-precondition', ORDER_FORM_INVALID_MESSAGE, { issues: [] })],
    ['別の code', new FunctionsError('internal', ORDER_FORM_INVALID_MESSAGE)],
    ['FunctionsError 以外', new FirebaseError('functions/failed-precondition', ORDER_FORM_INVALID_MESSAGE)],
    ['Error 以外', 'oops'],
  ])('%sは null', (_label, error) => {
    expect(parseOrderFormInvalidError(error)).toBeNull()
  })
})
