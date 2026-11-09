import type { CommunityFormSummary } from '../apis/form.js'
import type { CommunityForm } from '../schemas/CommunityForm.js'
import { omitHiddenFormFields } from '../schemas/formFields.js'

/** フォーム一覧・選択欄に出す要約。設問数は回答者に見える設問だけ数える */
export function toCommunityFormSummary(form: CommunityForm): CommunityFormSummary {
  return {
    form_id: form.id,
    name: form.name,
    description: form.description,
    purpose: form.purpose,
    archived: form.archived,
    field_count: omitHiddenFormFields(form.fields).length,
    updated_at: form.updated_at,
  }
}
