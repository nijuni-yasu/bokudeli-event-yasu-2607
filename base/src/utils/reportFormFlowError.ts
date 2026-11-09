import { FirebaseError } from 'firebase/app'
import { reportClientError } from '@shokujii/base/utils/reportClientError.js'

/** カートからフォーム回答・注文確定までの段階。Cloud Logging の component_info に載る */
export type FormFlowStage =
  | 'form_presence'
  | 'cart_gate'
  | 'form_load'
  | 'order_gate'
  | 'save_attempt'
  | 'stripe_checkout'
  | 'confirm_order'

export type FormFlowTarget = {
  community_id: string
  event_id: string
}

export type FormFlowErrorReport = {
  component: string
  stage: FormFlowStage
  target?: FormFlowTarget
}

/** `CartFormAnswer:save_attempt code=functions/internal` の形にする */
export function buildFormFlowComponentInfo(component: string, stage: FormFlowStage, error: unknown): string {
  const base = `${component}:${stage}`
  return error instanceof FirebaseError ? `${base} code=${error.code}` : base
}

/**
 * フォーム回答・注文確定の失敗を、段階とエラー code 付きで reportClientError に送る。
 * 回答内容などの個人情報は送らない。
 * Cloud Logging のレベルはサーバー側（isClientErrorNoise）が決めるため、ここでは severity を指定しない。
 */
export function reportFormFlowError(error: unknown, report: FormFlowErrorReport): void {
  reportClientError(error, {
    componentInfo: buildFormFlowComponentInfo(report.component, report.stage, error),
    documentPath:
      report.target == null ? undefined : `communities/${report.target.community_id}/events/${report.target.event_id}`,
  })
}
