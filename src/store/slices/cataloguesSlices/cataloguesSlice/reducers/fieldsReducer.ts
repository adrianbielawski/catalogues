import { PayloadAction } from '@reduxjs/toolkit'
import { DeserializedChoiceField, ErrorMessage } from 'src/globalTypes'
import * as T from '../cataloguesTypes'
import { choiceDeserializer, choicesDeserializer, fieldDeserializer, fieldsDeserializer } from 'src/serializers'
import { getCatalogueById, getChoiceById, getFieldById } from '../cataloguesSlectors'

type State = T.CataloguesState

export const createCatalogueFieldReducers = {
    CREATE_CATALOGUE_FIELD(state: State, action: PayloadAction<T.CreateCatalogueFieldPayload>) { },
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

export const fetchCatalogueFieldReducers = {
    REFRESH_CATALOGUE_FIELD(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_CATALOGUE_FIELD(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_CATALOGUE_FIELD_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_CATALOGUE_FIELD_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_CATALOGUE_FIELD_SUCCESS(state: State, action: PayloadAction<T.FetchCatalogueFieldSuccessPayload>) {
        let field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        Object.assign(field, fieldDeserializer(action.payload.data))
    },
}

export const fetchCatalogueFieldsReducers = {
    REFRESH_CATALOGUE_FIELDS(state: State, action: PayloadAction<number>) { },
    FETCH_CATALOGUE_FIELDS(state: State, action: PayloadAction<number>) { },
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

export const fetchFieldsChoicesReducers = {
    FETCH_FIELDS_CHOICES(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_FIELDS_CHOICES_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.fetchingFieldsChoices = true
    },
    FETCH_FIELDS_CHOICES_SUCCESS(state: State, action: PayloadAction<T.FetchFieldsChoicesPayload>) {
        const catalogue = getCatalogueById(state, action.payload.catalogueId)
        catalogue.fetchingFieldsChoices = false
        const data = action.payload.data

        for (const id in data) {
            const field = getFieldById(state, action.payload.catalogueId, parseInt(id)) as DeserializedChoiceField
            field.choices = choicesDeserializer(data[id])
        }
    },
    FETCH_FIELDS_CHOICES_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.fetchingFieldsChoices = false
    },
}

export const fetchFieldChoicesReducers = {
    FETCH_FIELD_CHOICES(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) { },
    FETCH_FIELD_CHOICES_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.fetchingChoices = true
    },
    FETCH_FIELD_CHOICES_SUCCESS(state: State, action: PayloadAction<T.FetchFieldChoicesPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.choices = choicesDeserializer(action.payload.data)
        field.fetchingChoices = false
    },
    FETCH_FIELD_CHOICES_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.fetchingChoices = false
    },
}

export const addChoiceReducers = {
    ADD_CHOICE_ERROR(state: State, action: PayloadAction<T.AddChoiceError>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.addChoiceError = action.payload.error
    },
    CLEAR_ADD_CHOICE_ERROR(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.addChoiceError = {
            title: '',
            message: '',
        }
    },
    POST_CHOICE(state: State, action: PayloadAction<T.PostChoicePayload>) { },
    POST_CHOICE_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.postingChoice = true
    },
    POST_CHOICE_SUCCESS(state: State, action: PayloadAction<T.PostChoiceSuccessPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.choices.push(choiceDeserializer(action.payload.choice))
        field.postingChoice = false
    },
    POST_CHOICE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.postingChoice = false
        field.addChoiceError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const changeFieldNameReducers = {
    CHANGE_FIELD_NAME(state: State, action: PayloadAction<T.ChangeFieldNamePayload>) { },
    CHANGE_FIELD_NAME_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.changingName = true
    },
    CHANGE_FIELD_NAME_SUCCESS(state: State, action: PayloadAction<T.ChangeFieldNameSuccessPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.changingName = false
        field.name = action.payload.field.name
        field.filterName = action.payload.field.filter_name
    },
    CHANGE_FIELD_NAME_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.changingName = false
        field.changeNameError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
    CLEAR_CHANGE_FIELD_NAME_ERROR(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
        field.changeNameError = {
            title: '',
            message: '',
        }
    },
}

export const removeChoiceReducers = {
    REMOVE_CHOICE(state: State, action: PayloadAction<T.RemoveChoicePayload>) { },
    REMOVE_CHOICE_START(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.removingChoice = true
    },
    REMOVE_CHOICE_SUCCESS(state: State, action: PayloadAction<T.RemoveChoicePayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.choices = field.choices.filter(c => c.id !== action.payload.choiceId)
        field.removingChoice = false
    },
    REMOVE_CHOICE_FAILURE(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.removingChoice = false
        field.removeChoiceError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
    CLEAR_REMOVE_CHOICE_ERROR(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.removeChoiceError = {
            title: '',
            message: '',
        }
    },
}

export const editFieldReducers = {
    TOGGLE_FIELD_EDIT(state: State, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
        const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
        field.isEditing = !field.isEditing
    },
}