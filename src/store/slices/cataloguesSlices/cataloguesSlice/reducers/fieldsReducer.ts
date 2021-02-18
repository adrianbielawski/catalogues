import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { DeserializedChoiceField } from 'src/globalTypes'
import * as T from '../cataloguesTypes'
import { choicesDeserializer, fieldDeserializer, fieldsDeserializer } from 'src/serializers'
import { getCatalogueById, getChoiceById, getFieldById } from '../cataloguesSlectors'

type State = T.CataloguesState

export const CREATE_CATALOGUE_FIELD = createAction<T.CreateCatalogueFieldPayload>('CATALOGUES/CREATE_CATALOGUE_FIELD')
export const createCatalogueFieldReducers = {
    TOGGLE_ADD_FIELD(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isAddFieldFormActive = !catalogue.isAddFieldFormActive
    },
    CREATE_CATALOGUE_FIELD_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingNewField = true
    },
    CREATE_CATALOGUE_FIELD_SUCCESS(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingNewField = false
        catalogue.isAddFieldFormActive = false
    },
    CREATE_CATALOGUE_FIELD_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingNewField = false
    },
}

export const REFRESH_CATALOGUE_FIELD = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/REFRESH_CATALOGUE_FIELD')
export const FETCH_CATALOGUE_FIELD = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD')
export const FETCH_CATALOGUE_FIELD_START = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD_START')
export const FETCH_CATALOGUE_FIELD_FAILURE = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD_FAILURE')
export const fetchCatalogueFieldReducers = {
    FETCH_CATALOGUE_FIELD_SUCCESS(state: State, action: PayloadAction<T.FetchCatalogueFieldSuccessPayload>) {
        let field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        Object.assign(field, fieldDeserializer(action.payload.data))
    },
}

export const REFRESH_CATALOGUE_FIELDS = createAction<number>('CATALOGUES/REFRESH_CATALOGUE_FIELDS')
export const FETCH_CATALOGUE_FIELDS = createAction<number>('CATALOGUES/FETCH_CATALOGUE_FIELDS')
export const fetchCatalogueFieldsReducers = {
    FETCH_CATALOGUE_FIELDS_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.fetchingFields = true
    },
    FETCH_CATALOGUE_FIELDS_SUCCESS(state: State, action: PayloadAction<T.FetchCatalogueFieldsSuccessPayload>) {
        const catalogue = getCatalogueById(state, action.payload.catalogueId)
        catalogue.fetchingFields = false
        catalogue.fields = fieldsDeserializer(action.payload.data)
    },
    FETCH_CATALOGUE_FIELDS_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.fetchingFields = false
    },
}
export const FETCH_FIELDS_CHOICES = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_FIELDS_CHOICES')
export const fetchFieldsChoicesReducers = {
    FETCH_FIELDS_CHOICES_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.fetchingChoices = true
    },
    FETCH_FIELDS_CHOICES_SUCCESS(state: State, action: PayloadAction<T.FetchFieldChoicesPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.choices = choicesDeserializer(action.payload.data)
        field.fetchingChoices = false
    },
    FETCH_FIELDS_CHOICES_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.fetchingChoices = false
    },
}

export const POST_TEXT_FIELD_NAME_CHANGE = createAction<T.TextFieldNameChange>('CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE')
export const POST_TEXT_FIELD_NAME_CHANGE_SUCCESS = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE_SUCCESS')
export const POST_CHOICE_FIELD_CHANGES = createAction<T.ChioceFieldChangesPayload>('CATALOGUES/POST_CHOICE_FIELD_NAME_CHANGE')
export const POST_CHOICE_FIELD_CHANGES_SUCCESS = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/POST_CHOICE_FIELD_NAME_CHANGE_SUCCESS')
export const editFieldReducers = {
    TOGGLE_FIELD_EDIT(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.isEditing = !field.isEditing
    },
    REMOVE_FIELD_CHOICE_FROM_STATE(state: State, action: PayloadAction<T.RemoveFieldToStatePayload>) {
        const choice = getChoiceById(state, action.payload.catalogueId, action.payload.fieldId, action.payload.id)
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.removedChoices.push(choice)
        field.choices = field.choices.filter(c => c.id !== action.payload.id)
    },
    ADD_FIELD_CHOICE_TO_STATE(state: State, action: PayloadAction<T.AddFieldToStatePayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.choices.unshift({
            id: `newChoice_${Date.now()}`,
            fieldId: action.payload.fieldId,
            value: action.payload.name,
        })
    },
    POST_TEXT_FIELD_NAME_CHANGE_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.isSubmitting = true
    },
    POST_CHOICE_FIELD_CHANGES_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.isSubmitting = true

    },
    POST_TEXT_FIELD_NAME_CHANGE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.isSubmitting = false
    },
    POST_CHOICE_FIELD_CHANGES_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.isSubmitting = false
    },
}