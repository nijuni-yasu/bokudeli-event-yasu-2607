import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from 'firebase/firestore'
import { db } from '@shokujii/base/firebase.js'
import type { CommunityForm } from '@shokujii/common/schemas/CommunityForm.js'
import { communityFormConverter } from '@shokujii/base/stores/community.js'
import { EVENT_FORM_CONFIG_DOC_ID, EventFormConfig } from '@shokujii/common/schemas/EventFormConfig.js'
import { FormCheckoutAttempt } from '@shokujii/common/schemas/FormCheckoutAttempt.js'
import { FormResponse } from '@shokujii/common/schemas/FormResponse.js'

// イベントのフォーム設定・設問・回答の読み取り（#2492）。書き込みは Functions のみ。
// 読める範囲は firestore.rules: 設定と設問は誰でも、確定回答は本人・コミュマネ・サポート、下書きは本人のみ。

const eventFormConfigConverter: FirestoreDataConverter<EventFormConfig> = {
  toFirestore(config: EventFormConfig): DocumentData {
    return config.toFirestore()
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): EventFormConfig {
    return new EventFormConfig(snapshot.id, snapshot.data(options))
  },
}

const formResponseConverter: FirestoreDataConverter<FormResponse> = {
  toFirestore(response: FormResponse): DocumentData {
    return response.toFirestore()
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FormResponse {
    return new FormResponse(snapshot.id, snapshot.data(options))
  },
}

const formCheckoutAttemptConverter: FirestoreDataConverter<FormCheckoutAttempt> = {
  toFirestore(attempt: FormCheckoutAttempt): DocumentData {
    return attempt.toFirestore()
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FormCheckoutAttempt {
    return new FormCheckoutAttempt(snapshot.id, snapshot.data(options))
  },
}

const getCommunityFormRef = (communityId: string, formId: string) =>
  doc(db, 'communities', communityId, 'forms', formId).withConverter(communityFormConverter)

const getEventFormConfigRef = (communityId: string, eventId: string) =>
  doc(db, 'communities', communityId, 'events', eventId, 'form_configs', EVENT_FORM_CONFIG_DOC_ID).withConverter(
    eventFormConfigConverter,
  )

const getFormResponsesCollection = (communityId: string, eventId: string) =>
  collection(db, 'communities', communityId, 'events', eventId, 'form_responses').withConverter(formResponseConverter)

const getFormAttemptsCollection = (communityId: string, eventId: string) =>
  collection(db, 'communities', communityId, 'events', eventId, 'form_checkout_attempts').withConverter(
    formCheckoutAttemptConverter,
  )

export type EventFormReference = {
  config: EventFormConfig
  form: CommunityForm
}

/** イベントに設定されたフォームを読む。未設定、またはフォームが見つからないときは null */
export const fetchEventFormReference = async (
  communityId: string,
  eventId: string,
): Promise<EventFormReference | null> => {
  const configSnapshot = await getDoc(getEventFormConfigRef(communityId, eventId))
  const config = configSnapshot.exists() ? configSnapshot.data() : undefined
  if (config == null) {
    return null
  }
  const formSnapshot = await getDoc(getCommunityFormRef(communityId, config.source_form_id))
  const form = formSnapshot.exists() ? formSnapshot.data() : undefined
  return form == null ? null : { config, form }
}

/** イベントに設定されたフォームの ID。未設定なら ''（イベント編集の初期選択に使う） */
export const fetchEventFormSourceId = async (communityId: string, eventId: string): Promise<string> => {
  const snapshot = await getDoc(getEventFormConfigRef(communityId, eventId))
  return snapshot.exists() ? snapshot.data().source_form_id : ''
}

/** 本人の確定回答 */
export const fetchMyFormResponse = async (
  communityId: string,
  eventId: string,
  userId: string,
): Promise<FormResponse | undefined> => {
  const snapshot = await getDoc(doc(getFormResponsesCollection(communityId, eventId), userId))
  return snapshot.exists() ? snapshot.data() : undefined
}

/** 本人の下書きのうち、指定したフォームと版に対する最新の1件（決済に進んで戻ってきたときの復元用） */
export const fetchMyLatestFormDraft = async (
  communityId: string,
  eventId: string,
  userId: string,
  form: CommunityForm,
): Promise<FormCheckoutAttempt | undefined> => {
  const snapshot = await getDocs(
    query(
      getFormAttemptsCollection(communityId, eventId),
      where('user_id', '==', userId),
      where('status', 'in', ['pending', 'frozen']),
      where('source_form_id', '==', form.id),
      where('definition_version', '==', form.definition_version),
      orderBy('updated_at', 'desc'),
      limit(1),
    ),
  )
  return snapshot.docs[0]?.data()
}

/** イベントの確定回答をすべて読む（コミュマネ・サポートのみ） */
export const fetchEventFormResponses = async (communityId: string, eventId: string): Promise<FormResponse[]> => {
  const snapshot = await getDocs(getFormResponsesCollection(communityId, eventId))
  return snapshot.docs.map((d) => d.data())
}
