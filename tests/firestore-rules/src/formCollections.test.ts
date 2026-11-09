import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'

const PROJECT_ID = 'firestore-rules-form-collections'
const testDir = fileURLToPath(new URL('.', import.meta.url))

const SUPPORT_USER = 'support-user'
const MANAGER = 'manager-user'
const MEMBER = 'member-user'
const OTHER_MEMBER = 'other-member-user'
const COMMUNITY_ID = 'community-1'
const EVENT_ID = 'event-1'

let testEnv: RulesTestEnvironment

function auth(userId: string) {
  return testEnv.authenticatedContext(userId)
}

function unauthenticated() {
  return testEnv.unauthenticatedContext()
}

function formRef(context: RulesTestContext) {
  return context.firestore().collection('communities').doc(COMMUNITY_ID).collection('forms').doc('form-1')
}

function formConfigRef(context: RulesTestContext) {
  return context
    .firestore()
    .collection('communities')
    .doc(COMMUNITY_ID)
    .collection('events')
    .doc(EVENT_ID)
    .collection('form_configs')
    .doc('current')
}

function formResponseRef(context: RulesTestContext) {
  return context
    .firestore()
    .collection('communities')
    .doc(COMMUNITY_ID)
    .collection('events')
    .doc(EVENT_ID)
    .collection('form_responses')
    .doc(MEMBER)
}

function attemptsCollection(context: RulesTestContext) {
  return context
    .firestore()
    .collection('communities')
    .doc(COMMUNITY_ID)
    .collection('events')
    .doc(EVENT_ID)
    .collection('form_checkout_attempts')
}

function formAttemptRef(context: RulesTestContext) {
  return attemptsCollection(context).doc('attempt-1')
}

describe('form collections firestore rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: readFileSync(resolve(testDir, '../../../firestore.rules'), 'utf8'),
      },
    })
  })

  afterAll(async () => {
    await testEnv.cleanup()
  })

  beforeEach(async () => {
    await testEnv.clearFirestore()
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context
        .firestore()
        .collection('configs')
        .doc('global')
        .set({
          support_user_ids: [SUPPORT_USER],
          system_id: 'system-user',
          maintenance_mode: false,
        })
      await context.firestore().collection('communities').doc(COMMUNITY_ID).set({
        community_id: COMMUNITY_ID,
        community_name: 'Community',
        community_account: 'community-1',
        is_approved: true,
        is_public: true,
      })
      await context
        .firestore()
        .collection('communities')
        .doc(COMMUNITY_ID)
        .collection('members')
        .doc(MANAGER)
        .set({
          roles: ['manager'],
        })
      await context.firestore().collection('communities').doc(COMMUNITY_ID).collection('events').doc(EVENT_ID).set({
        event_id: EVENT_ID,
        community_id: COMMUNITY_ID,
        event_name: 'Event',
        is_deleted: false,
        is_public: true,
      })
      await formRef(context).set({ name: '事前アンケート' })
      await formConfigRef(context).set({ source_form_id: 'form-1', definition_version: 1 })
      await formResponseRef(context).set({ user_id: MEMBER, definition_version: 1 })
      await formAttemptRef(context).set({ user_id: MEMBER, status: 'pending' })
    })
  })

  it.each([
    ['未認証', () => unauthenticated()],
    ['一般ユーザー', () => auth(MEMBER)],
    ['コミュマネ', () => auth(MANAGER)],
    ['サポート', () => auth(SUPPORT_USER)],
  ])('%sは forms と form_configs を読めるが書けない', async (_label, ctx) => {
    const context = ctx()
    await assertSucceeds(formRef(context).get())
    await assertSucceeds(context.firestore().collection('communities').doc(COMMUNITY_ID).collection('forms').get())
    await assertSucceeds(formConfigRef(context).get())
    await assertFails(formRef(context).set({ name: '更新' }))
    await assertFails(formConfigRef(context).set({ definition_version: 2 }))
  })

  it('企業テナントのコミュニティの forms / form_configs は、テナント外の一般ユーザーから読めない', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('communities').doc(COMMUNITY_ID).update({ enterprise_id: 'enterprise-1' })
    })
    await assertFails(formRef(auth(MEMBER)).get())
    await assertFails(formConfigRef(auth(MEMBER)).get())
    await assertFails(formRef(unauthenticated()).get())
    await assertSucceeds(formRef(auth(SUPPORT_USER)).get())
  })

  it('企業テナントのコミュニティでは、テナント外のユーザーが manager 文書を持っていても form_responses を読めない', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('communities').doc(COMMUNITY_ID).update({ enterprise_id: 'enterprise-1' })
    })
    await assertFails(formResponseRef(auth(MANAGER)).get())
    await assertSucceeds(formResponseRef(auth(MEMBER)).get())
    await assertSucceeds(formResponseRef(auth(SUPPORT_USER)).get())
  })

  it.each([
    ['本人', () => auth(MEMBER)],
    ['コミュマネ', () => auth(MANAGER)],
    ['サポート', () => auth(SUPPORT_USER)],
  ])('%sは form_responses を読めるが書けない', async (_label, ctx) => {
    const context = ctx()
    await assertSucceeds(formResponseRef(context).get())
    await assertFails(formResponseRef(context).set({ answers: [] }))
  })

  it('コミュマネは form_responses を一覧で読める', async () => {
    const responses = auth(MANAGER)
      .firestore()
      .collection('communities')
      .doc(COMMUNITY_ID)
      .collection('events')
      .doc(EVENT_ID)
      .collection('form_responses')
    await assertSucceeds(responses.get())
  })

  it.each([
    ['未認証', () => unauthenticated()],
    ['他の一般ユーザー', () => auth(OTHER_MEMBER)],
  ])('%sは form_responses を読めない', async (_label, ctx) => {
    await assertFails(formResponseRef(ctx()).get())
  })

  it('本人は自分の form_checkout_attempts だけを読める（書けない）', async () => {
    const context = auth(MEMBER)
    await assertSucceeds(formAttemptRef(context).get())
    await assertSucceeds(attemptsCollection(context).where('user_id', '==', MEMBER).get())
    await assertFails(formAttemptRef(context).set({ status: 'frozen' }))
  })

  it.each([
    ['未認証', () => unauthenticated()],
    ['他の一般ユーザー', () => auth(OTHER_MEMBER)],
    ['コミュマネ', () => auth(MANAGER)],
    ['サポート', () => auth(SUPPORT_USER)],
  ])('%sは他人の form_checkout_attempts を読めない', async (_label, ctx) => {
    const context = ctx()
    await assertFails(formAttemptRef(context).get())
    await assertFails(attemptsCollection(context).get())
  })

  it('collection group からは form_responses / form_checkout_attempts / forms を読めない', async () => {
    await assertFails(auth(MANAGER).firestore().collectionGroup('form_responses').get())
    await assertFails(
      auth(MEMBER).firestore().collectionGroup('form_checkout_attempts').where('user_id', '==', MEMBER).get(),
    )
    await assertFails(auth(SUPPORT_USER).firestore().collectionGroup('forms').get())
    await assertFails(auth(MANAGER).firestore().collectionGroup('forms').get())
  })
})
