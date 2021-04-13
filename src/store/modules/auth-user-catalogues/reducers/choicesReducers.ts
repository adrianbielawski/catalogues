import { PayloadAction } from '@reduxjs/toolkit'
import * as T from '../types'
import { getCatalogueDataById, getChoiceDataById, getFieldDataById } from '../selectors'

const networkError = {
    title: 'Network error',
    message: 'Something went wrong. Plaese try again.',
}

const createChoice = (id: number) => ({
    id,
    isDeleting: false,
})

type State = T.AuthUserCataloguesState

export const fieldChoicesReducers = {
    REFRESH_FIELD_CHOICES(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
}

export const fetchFieldChoicesReducers = {
    FETCH_FIELD_CHOICES(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_FIELD_CHOICES_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.isFetchingChoices = true
    },
    FETCH_FIELD_CHOICES_SUCCESS(state: State, action: PayloadAction<T.FetchFieldChoicesPayload>) {
        const { catalogueId, fieldId, data } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.choices = data.map(c => createChoice(c.id))
        field.isFetchingChoices = false
    },
    FETCH_FIELD_CHOICES_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.isFetchingChoices = false
    },
}

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
            const field = getFieldDataById(state, catalogueId, parseInt(id)) as T.AuthUserChoiceFieldData
            field.choices = data[id].map(c => createChoice(c.id))
        }
    },
    FETCH_FIELDS_CHOICES_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isFetchingFieldsChoices = false
    },
}

export const postFieldChoiceReducers = {
    POST_FIELD_CHOICE(state: State, action: PayloadAction<T.PostChoicePayload>) { },
    POST_FIELD_CHOICE_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.isPostingChoice = true
    },
    POST_FIELD_CHOICE_SUCCESS(state: State, action: PayloadAction<T.PostChoiceSuccessPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.choices.push(createChoice(action.payload.choice.id))
        field.isPostingChoice = false
    },
    POST_FIELD_CHOICE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const { catalogueId, fieldId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.isPostingChoice = false
        field.fieldError = networkError
    },
}

export const removeFieldChoiceReducers = {
    REMOVE_FIELD_CHOICE(state: State, action: PayloadAction<T.RemoveChoicePayload>) { },
    REMOVE_FIELD_CHOICE_START(state: State, action: PayloadAction<T.RemoveChoicePayload>) {
        const { catalogueId, fieldId, choiceId } = action.payload
        const choice = getChoiceDataById(state, catalogueId, fieldId, choiceId) as T.AuthUserChoiceData
        choice.isDeleting = true
    },
    REMOVE_FIELD_CHOICE_SUCCESS(state: State, action: PayloadAction<T.RemoveChoicePayload>) {
        const { catalogueId, fieldId, choiceId } = action.payload
        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.choices = field.choices.filter(c => c.id !== choiceId)
    },
    REMOVE_FIELD_CHOICE_FAILURE(state: State, action: PayloadAction<T.RemoveChoicePayload>) {
        const { catalogueId, fieldId, choiceId } = action.payload
        
        const choice = getChoiceDataById(state, catalogueId, fieldId, choiceId) as T.AuthUserChoiceData
        choice.isDeleting = false

        const field = getFieldDataById(state, catalogueId, fieldId) as T.AuthUserChoiceFieldData
        field.fieldError = networkError
    },
}