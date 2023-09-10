import { type AuthUserCataloguesState } from './types'
import {
  type AuthUserFieldData,
  type AuthUserChoiceData,
  type AuthUserChoiceFieldData,
  DeserializedField,
  AuthUserGroupFieldData,
} from 'src/globalTypes'

export const getCatalogueDataById = (
  state: AuthUserCataloguesState,
  id: number,
) => {
  return state.cataloguesData.filter((c) => c.id === id)[0]
}

export const getFieldDataById = (
  state: AuthUserCataloguesState,
  catalogueId: number,
  fieldId: number,
  parentFieldId?: DeserializedField['parentId'],
): AuthUserFieldData | undefined => {
  const { fieldsData } = getCatalogueDataById(state, catalogueId)

  if (parentFieldId) {
    const parentField = fieldsData.find(
      (f) => f.id === parentFieldId,
    ) as AuthUserGroupFieldData
    return parentField.children.find((f) => f.id === fieldId)
  } else {
    return fieldsData.find((f) => f.id === fieldId)
  }
}

export const getChoiceDataById = (
  state: AuthUserCataloguesState,
  catalogueId: number,
  fieldId: number,
  choiceId: number,
): AuthUserChoiceData =>
  (
    getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData
  ).choices.filter((c) => c.id === choiceId)[0]
