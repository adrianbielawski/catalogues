import { type PayloadAction } from '@reduxjs/toolkit'
import {
  type Catalogue,
  type CurrentUserChoiceFieldData,
  type Field,
} from 'src/globalTypes'
import { getCatalogueDataById, getFieldDataById } from './selectors'
import type * as T from './types'

const getCatalogueFieldData = (field: Field) => {
  const newField = {
    id: field.id,
  }

  if ('choices' in field) {
    ;(newField as CurrentUserChoiceFieldData).isFetchingChoices = false
    ;(newField as CurrentUserChoiceFieldData).choices = []
  }

  return newField
}

type State = T.CurrentUserCataloguesState

export const fetchCurrentUserCataloguesReducers = {
  FETCH_CURRENT_USER_CATALOGUES(state: State) {},
  FETCH_CURRENT_USER_CATALOGUES_START(state: State) {
    state.isFetchingCatalogues = true
  },
  FETCH_CURRENT_USER_CATALOGUES_SUCCESS(
    state: State,
    action: PayloadAction<Catalogue[]>,
  ) {
    state.cataloguesData = action.payload.map((c) => {
      if (c.default) {
        state.defaultCatalogueId = c.id
      }
      return {
        id: c.id,
        fieldsData: [],
        isFetchingFields: true,
        isFetchingFieldsChoices: true,
        isInitialized: false,
      }
    })
    state.isFetchingCatalogues = false
  },
  FETCH_CURRENT_USER_CATALOGUES_FAILURE(state: State) {
    state.isFetchingCatalogues = false
  },
}

export const fetchCurrentUserCatalogueFieldsReducers = {
  FETCH_CURRENT_USER_CATALOGUE_FIELDS(
    state: State,
    action: PayloadAction<number>,
  ) {},
  FETCH_CURRENT_USER_CATALOGUE_FIELDS_START(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFields = true
  },
  FETCH_CURRENT_USER_CATALOGUE_FIELDS_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchCatalogueFieldsSuccessPayload>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload.catalogueId)
    catalogue.isFetchingFields = false
    catalogue.fieldsData = action.payload.data.map(getCatalogueFieldData)
  },
  FETCH_CURRENT_USER_CATALOGUE_FIELDS_FAILURE(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFields = false
  },
}

export const fetchFieldsChoicesReducers = {
  FETCH_CURRENT_USER_FIELDS_CHOICES(
    state: State,
    action: PayloadAction<T.CatalogueAndFieldIdPayload>,
  ) {},
  FETCH_CURRENT_USER_FIELDS_CHOICES_START(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFieldsChoices = true
  },
  FETCH_CURRENT_USER_FIELDS_CHOICES_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchFieldsChoicesPayload>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload.catalogueId)
    catalogue.isFetchingFieldsChoices = false
    catalogue.isInitialized = true
    const data = action.payload.data

    for (const id in data) {
      const field = getFieldDataById(
        state,
        action.payload.catalogueId,
        parseInt(id),
      ) as CurrentUserChoiceFieldData
      field.choices = data[id].map((c) => c.id)
    }
  },
  FETCH_CURRENT_USER_FIELDS_CHOICES_FAILURE(
    state: State,
    action: PayloadAction<number>,
  ) {
    const catalogue = getCatalogueDataById(state, action.payload)
    catalogue.isFetchingFieldsChoices = false
  },
}
