import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FirebaseError } from 'firebase/app'

const reportClientErrorMock = vi.fn()

vi.mock('@shokujii/base/utils/reportClientError.js', () => ({
  reportClientError: (...args: unknown[]) => reportClientErrorMock(...args),
}))

const { buildFormFlowComponentInfo, reportFormFlowError } = await import('./reportFormFlowError.js')

beforeEach(() => {
  reportClientErrorMock.mockClear()
})

describe('buildFormFlowComponentInfo', () => {
  it('FirebaseError は code を付ける', () => {
    const error = new FirebaseError('functions/internal', 'internal')
    expect(buildFormFlowComponentInfo('CartFormAnswer', 'save_attempt', error)).toBe(
      'CartFormAnswer:save_attempt code=functions/internal',
    )
  })

  it('FirebaseError 以外は段階名だけにする', () => {
    expect(buildFormFlowComponentInfo('CartFormAnswer', 'order_gate', new TypeError('Failed to fetch'))).toBe(
      'CartFormAnswer:order_gate',
    )
  })
})

describe('reportFormFlowError', () => {
  it('段階とイベントのパスを reportClientError に渡す', () => {
    const error = new FirebaseError('functions/deadline-exceeded', 'deadline-exceeded')
    reportFormFlowError(error, {
      component: 'CartFormAnswer',
      stage: 'confirm_order',
      target: { community_id: 'c1', event_id: 'e1' },
    })
    expect(reportClientErrorMock).toHaveBeenCalledWith(error, {
      componentInfo: 'CartFormAnswer:confirm_order code=functions/deadline-exceeded',
      documentPath: 'communities/c1/events/e1',
    })
  })

  it('対象イベントが無いときは documentPath を付けない', () => {
    const error = new Error('cart item not found')
    reportFormFlowError(error, { component: 'CartFormAnswer', stage: 'form_load' })
    expect(reportClientErrorMock).toHaveBeenCalledWith(error, {
      componentInfo: 'CartFormAnswer:form_load',
      documentPath: undefined,
    })
  })
})
