import { FunctionsError } from 'firebase/functions'
import { ORDER_FORM_INVALID_MESSAGE, OrderFormInvalidDetailsSchema } from '@shokujii/common/apis/form.js'
import type { FormValidationIssue } from '@shokujii/common/utils/validateFormAnswers.js'

/**
 * 注文確定に一緒に送ったフォーム回答がサーバーの検証で弾かれたときの、項目ごとの指摘を取り出す。
 * それ以外のエラーなら null。
 */
export function parseOrderFormInvalidError(error: unknown): FormValidationIssue[] | null {
  if (
    !(error instanceof FunctionsError) ||
    error.code !== 'functions/failed-precondition' ||
    error.message !== ORDER_FORM_INVALID_MESSAGE
  ) {
    return null
  }
  const parsed = OrderFormInvalidDetailsSchema.safeParse(error.details)
  return parsed.success ? parsed.data.form_issues : null
}
