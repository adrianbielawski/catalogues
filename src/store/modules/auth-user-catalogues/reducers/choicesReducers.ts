import { PayloadAction } from '@reduxjs/toolkit'
import * as T from '../types'
import { getCatalogueDataById, getFieldDataById } from '../selectors'
import { AuthUserChoiceFieldData } from 'src/globalTypes'

const networkError = {
    title: 'Network error',
    message: 'Something went wrong. Plaese try again.',
}

export const createChoiceData = (id: number) => ({
    id,
    isDeleting: false,
})

type State = T.AuthUserCataloguesState

export const fetchFieldsChoicesReducers = {
    FETCH_FIELDS_CHOICES(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_FIELDS_CHOICES_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isFetchingFieldsChoices = true
    },
    FETCH_FIELDS_CHOICES_SUCCESS(state: State, action: PayloadAction<T.FetchFieldsChoicesPayload>) {
        const { catalogueId, data } = action.payload
        const catalogue = getCatalogueDataById(state, catalogueId)
        catalogue.isFetchingFieldsChoices = false
        catalogue.isInitialized = true

        for (const id in data) {
            const field = getFieldDataById(state, catalogueId, parseInt(id)) as AuthUserChoiceFieldData
            field.choices = data[id].map(c => createChoiceData(c.id))
        }
    },
    FETCH_FIELDS_CHOICES_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isFetchingFieldsChoices = false
    },
}

export const postFieldChoiceReducers = {
    POST_FIELD_CHOICE(state: State, action: PayloadAction<T.PostChoicePayload>) { },
    POST_FIELD_CHOICE_SUCCESS(state: State, action: PayloadAction<T.PostChoiceSuccessPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData
        field.choices.push(createChoiceData(action.payload.choice.id))
    },
    POST_FIELD_CHOICE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData
        field.fieldError = networkError
    },
}

export const removeFieldChoiceReducers = {
    REMOVE_FIELD_CHOICE(state: State, action: PayloadAction<T.RemoveChoicePayload>) { },
    REMOVE_FIELD_CHOICE_SUCCESS(state: State, action: PayloadAction<T.RemoveChoicePayload>) {
        const { catalogueId, fieldId, choiceId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData
        field.choices = field.choices.filter(c => c.id !== choiceId)
    },
    REMOVE_FIELD_CHOICE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData
        field.fieldError = networkError
    },
}