import { functions } from '@shokujii/base/firebase'
import { httpsCallable } from 'firebase/functions'
import type {
  ArchiveCommunityFormRequest,
  ArchiveCommunityFormResponse,
  ClearEventFormConfigRequest,
  ClearEventFormConfigResponse,
  CreateCommunityFormRequest,
  CreateCommunityFormResponse,
  DuplicateCommunityFormRequest,
  DuplicateCommunityFormResponse,
  SetEventFormFromCommunityRequest,
  SetEventFormFromCommunityResponse,
  UpdateCommunityFormRequest,
  UpdateCommunityFormResponse,
} from '@shokujii/common/apis/form.js'

export const createCommunityForm = (input: CreateCommunityFormRequest) => {
  const f = httpsCallable<CreateCommunityFormRequest, CreateCommunityFormResponse>(functions, 'createCommunityForm')
  return f(input)
}

export const updateCommunityForm = (input: UpdateCommunityFormRequest) => {
  const f = httpsCallable<UpdateCommunityFormRequest, UpdateCommunityFormResponse>(functions, 'updateCommunityForm')
  return f(input)
}

export const duplicateCommunityForm = (input: DuplicateCommunityFormRequest) => {
  const f = httpsCallable<DuplicateCommunityFormRequest, DuplicateCommunityFormResponse>(
    functions,
    'duplicateCommunityForm',
  )
  return f(input)
}

export const archiveCommunityForm = (input: ArchiveCommunityFormRequest) => {
  const f = httpsCallable<ArchiveCommunityFormRequest, ArchiveCommunityFormResponse>(functions, 'archiveCommunityForm')
  return f(input)
}

export const setEventFormFromCommunity = (input: SetEventFormFromCommunityRequest) => {
  const f = httpsCallable<SetEventFormFromCommunityRequest, SetEventFormFromCommunityResponse>(
    functions,
    'setEventFormFromCommunity',
  )
  return f(input)
}

export const clearEventFormConfig = (input: ClearEventFormConfigRequest) => {
  const f = httpsCallable<ClearEventFormConfigRequest, ClearEventFormConfigResponse>(functions, 'clearEventFormConfig')
  return f(input)
}
