import { PayloadAction } from '@reduxjs/toolkit'
import {
  AuthUserGroupFieldData,
  AuthUserChoiceFieldData,
  AuthUserFieldData,
  DeserializedField,
} from 'src/globalTypes'
import * as T from '../types'
import { getCatalogueDataById, getFieldDataById } from '../selectors'

const networkError = {
  title: 'Network error',
  message: 'Something went wrong. Please try again.',
}

export const createFieldData = (
  field: DeserializedField,
  prevFieldData?: AuthUserFieldData,
): AuthUserFieldData => {
  const newFieldData = {
    ...prevFieldData,
    id: field.id,
    isChangingName: false,
    isDeleting: false,
    isEditing: prevFieldData?.isEditing ?? false,
    isSubmitting: false,
    fieldError: null,
    parentId: field.parentId,
  } as AuthUserFieldData

  if (field.type === 'multiple_choice' || field.type === 'single_choice') {
    const prev = prevFieldData as AuthUserChoiceFieldData | undefined
    const fieldData = newFieldData as AuthUserChoiceFieldData
    fieldData.choices = prev?.choices ?? []
  }

  if (field.type === 'group') {
    const fieldData = newFieldData as AuthUserGroupFieldData
    fieldData.children = field.children ?? []
  }

  return newFieldData
}

type State = T.AuthUserCataloguesState

export const fieldsReducers = {
  TOGGLE_FIELD_EDIT(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.isEditing = !field.isEditing
  },
  CLEAR_FIELD_ERROR(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.fieldError = null
  },
  REFRESH_CATALOGUE_FIELD(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {},
}

export const fetchCatalogueFieldReducers = {
  FETCH_CATALOGUE_FIELD(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {},
  FETCH_CATALOGUE_FIELD_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchCatalogueFieldSuccessPayload>,
  ) {
    const { catalogueId, fields } = action.payload

    fields.forEach((f) => {
      const field = getFieldDataById(state, catalogueId, f.id)!

      Object.assign(field, createFieldData(f))
    })
  },
  FETCH_CATALOGUE_FIELD_FAILURE(state: State, action: PayloadAction<number>) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFields = false
    catalogue.catalogueError = networkError
  },
}

export const fetchCatalogueFieldsReducers = {
  FETCH_AUTH_USER_CATALOGUE_FIELDS(
    state: State,
    action: PayloadAction<number>,
  ) {},
  FETCH_AUTH_USER_CATALOGUE_FIELDS_START(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFields = true
  },
  FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchCatalogueFieldsSuccessPayload>,
  ) {
    const { catalogueId, fields } = action.payload
    const catalogue = getCatalogueDataById(state, catalogueId)

    catalogue.isFetchingFields = false
    catalogue.fieldsData = fields
      .sort((a, b) => a.position - b.position)
      .map((fieldData) =>
        createFieldData(
          fieldData,
          // pass previous so we can reinstate its state on update
          getFieldDataById(state, catalogueId, fieldData.id),
        ),
      )
  },
  FETCH_AUTH_USER_CATALOGUE_FIELDS_FAILURE(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFields = false
    catalogue.catalogueError = networkError
  },
}

export const fetchCataloguesFieldsReducers = {
  FETCH_AUTH_USER_CATALOGUES_FIELDS_SUCCESS(
    state: State,
    action: PayloadAction<DeserializedField[]>,
  ) {},
  AUTH_USER_CATALOGUES_FIELDS_NOT_NEEDED(state: State) {
    state.isFetchingCataloguesData = false
  },
  FETCH_AUTH_USER_CATALOGUES_FIELDS_FAILURE(state: State) {},
}

export const createCatalogueFieldReducers = {
  CREATE_CATALOGUE_FIELD(
    state: State,
    action: PayloadAction<T.CreateCatalogueFieldPayload>,
  ) {},
  CREATE_CATALOGUE_FIELD_START(state: State, action: PayloadAction<number>) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isSubmittingNewField = true
  },
  CREATE_CATALOGUE_FIELD_SUCCESS(
    state: State,
    action: PayloadAction<{ catalogueId: number }>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload.catalogueId)
    catalogue.isSubmittingNewField = false
  },
  CREATE_CATALOGUE_FIELD_FAILURE(state: State, action: PayloadAction<number>) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isSubmittingNewField = false
    catalogue.catalogueError = networkError
  },
}

export const deleteCatalogueFieldReducers = {
  DELETE_CATALOGUE_FIELD(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {},
  DELETE_CATALOGUE_FIELD_START(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.isDeleting = true
  },
  DELETE_CATALOGUE_FIELD_SUCCESS(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const { fieldsData } = getCatalogueDataById(state, catalogueId)!
    const fieldIndex = fieldsData.findIndex((d) => d.id === fieldId)
    fieldsData.splice(fieldIndex, 1)
  },
  DELETE_CATALOGUE_FIELD_FAILURE(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)

    if (field) {
      field.isDeleting = false
      field.fieldError = networkError
    }
  },
}

export const changeFieldNameReducers = {
  CHANGE_FIELD_NAME(
    state: State,
    action: PayloadAction<T.ChangeFieldNamePayload>,
  ) {},
  CHANGE_FIELD_NAME_START(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.isChangingName = true
  },
  CHANGE_FIELD_NAME_SUCCESS(
    state: State,
    action: PayloadAction<T.ChangeFieldNameSuccessPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.isChangingName = false
  },
  CHANGE_FIELD_NAME_FAILURE(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.isChangingName = false
    field.fieldError = networkError
  },
}

export const changePublicFieldReducers = {
  CHANGE_FIELD_PUBLIC(
    state: State,
    action: PayloadAction<T.ChangePublicFieldPayload>,
  ) {},
  CHANGE_FIELD_PUBLIC_SUCCESS(state: State) {},
  CHANGE_FIELD_PUBLIC_FAILURE(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.fieldError = networkError
  },
}

export const reorderFieldsReducers = {
  REORDER_CATALOGUE_FIELDS(
    state: State,
    action: PayloadAction<T.ReorderCatalogueFieldsPayload>,
  ) {
    const { catalogueId, fieldsData, parentFieldId } = action.payload
    const catalogueData = getCatalogueDataById(state, catalogueId)

    if (parentFieldId) {
      const parentField = catalogueData.fieldsData.find(
        (f) => f.id === parentFieldId,
      ) as AuthUserGroupFieldData
      parentField.children = fieldsData.map((f) => f.id)
    } else {
      catalogueData.fieldsData = fieldsData
    }
  },
  REORDER_CATALOGUE_FIELDS_SUCCESS(
    state: State,
    action: PayloadAction<{ catalogueId: number }>,
  ) {},
  REORDER_CATALOGUE_FIELDS_FAILURE(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {
    const { catalogueId, fieldId } = action.payload
    const field = getFieldDataById(state, catalogueId, fieldId)!
    field.fieldError = networkError
  },
}
