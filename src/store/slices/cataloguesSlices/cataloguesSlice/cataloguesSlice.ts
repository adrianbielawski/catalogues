import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Catalogue, DeserializedChoiceField } from 'src/globalTypes'
import * as T from './cataloguesTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import { catalogueDeserializer, choicesDeserializer, fieldDeserializer, fieldsDeserializer } from 'src/serializers'
import { getCatalogueById, getChoiceById, getFieldById } from './cataloguesSlectors'

const initialState: T.CataloguesState = {
    catalogues: [],
    fetchingCatalogues: true,
    creatingNewCatalogue: false,
}

export const CREATE_CATALOGUE = createAction('CATALOGUES/CREATE_CATALOGUE')
export const FETCH_CATALOGUES = createAction('CATALOGUES/FETCH_CATALOGUES')
export const CHANGE_CATALOGUE_NAME = createAction<T.ChangeCatalogueNamePayload>('CATALOGUES/CHANGE_CATALOGUE_NAME')
export const REFRESH_CATALOGUE_FIELD = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/REFRESH_CATALOGUE_FIELD')
export const FETCH_CATALOGUE_FIELD = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD')
export const FETCH_CATALOGUE_FIELD_START = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD_START')
export const FETCH_CATALOGUE_FIELD_FAILURE = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_CATALOGUE_FIELD_FAILURE')
export const REFRESH_CATALOGUE_FIELDS = createAction<number>('CATALOGUES/REFRESH_CATALOGUE_FIELDS')
export const FETCH_CATALOGUE_FIELDS = createAction<number>('CATALOGUES/FETCH_CATALOGUE_FIELDS')
export const FETCH_FIELDS_CHOICES = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/FETCH_FIELDS_CHOICES')
export const POST_TEXT_FIELD_NAME_CHANGE = createAction<T.TextFieldNameChange>('CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE')
export const POST_TEXT_FIELD_NAME_CHANGE_SUCCESS = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE_SUCCESS')
export const POST_CHOICE_FIELD_CHANGES = createAction<T.ChioceFieldChangesPayload>('CATALOGUES/POST_CHOICE_FIELD_NAME_CHANGE')
export const POST_CHOICE_FIELD_CHANGES_SUCCESS = createAction<T.CatalogueAndFieldIdPayload>('CATALOGUES/POST_CHOICE_FIELD_NAME_CHANGE_SUCCESS')
export const CREATE_CATALOGUE_FIELD = createAction<T.CreateCatalogueFieldPayload>('CATALOGUES/CREATE_CATALOGUE_FIELD')

export const cataloguesSlice = createSlice({
    name: 'CATALOGUES',
    initialState,
    reducers: {
        CREATE_CATALOGUE_START(state) {
            state.creatingNewCatalogue = true
        },
        CREATE_CATALOGUE_FAILURE(state) {
            state.creatingNewCatalogue = false
        },
        CREATE_CATALOGUE_SUCCESS(state, action: PayloadAction<Catalogue>) {
            state.catalogues.unshift(catalogueDeserializer(action.payload))
            state.creatingNewCatalogue = false
        },
        FETCH_CATALOGUES_START(state) {
            state.fetchingCatalogues = true
        },
        FETCH_CATALOGUES_SUCCESS(state, action: PayloadAction<Catalogue[]>) {
            state.catalogues = action.payload.map(catalogue => catalogueDeserializer(catalogue))
            state.fetchingCatalogues = false
        },
        FETCH_CATALOGUES_FAILURE(state) {
            state.fetchingCatalogues = false
        },
        TOGGLE_CATALOGUE_NAME_EDIT(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isEditingCatalogueName = !catalogue.isEditingCatalogueName
        },
        CHANGE_CATALOGUE_NAME_START(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isSubmittingCatalogueName = true
        },
        CHANGE_CATALOGUE_NAME_SUCCESS(state, action: PayloadAction<Catalogue>) {
            const catalogue = getCatalogueById(state, action.payload.id)
            catalogue.name = action.payload.name
            catalogue.slug = action.payload.slug
            catalogue.isSubmittingCatalogueName = false
            catalogue.isEditingCatalogueName = false
        },
        CHANGE_CATALOGUE_NAME_FAILURE(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isSubmittingCatalogueName = false
        },
        FETCH_CATALOGUE_FIELD_SUCCESS(state, action: PayloadAction<T.FetchCatalogueFieldSuccessPayload>) {
            let field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
            Object.assign(field, fieldDeserializer(action.payload.data))
        },
        FETCH_CATALOGUE_FIELDS_START(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.fetchingFields = true
        },
        FETCH_CATALOGUE_FIELDS_SUCCESS(state, action: PayloadAction<T.FetchCatalogueFieldsSuccessPayload>) {
            const catalogue = getCatalogueById(state, action.payload.catalogueId)
            catalogue.fetchingFields = false
            catalogue.fields = fieldsDeserializer(action.payload.data)
        },
        FETCH_CATALOGUE_FIELDS_FAILURE(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.fetchingFields = false
        },
        FETCH_FIELDS_CHOICES_START(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.fetchingChoices = true
        },
        FETCH_FIELDS_CHOICES_SUCCESS(state, action: PayloadAction<T.FetchFieldChoicesPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.choices = choicesDeserializer(action.payload.data)
            field.fetchingChoices = false
        },
        FETCH_FIELDS_CHOICES_FAILURE(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.fetchingChoices = false
        },
        TOGGLE_FIELD_EDIT(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.isEditing = !field.isEditing
        },
        REMOVE_FIELD_CHOICE_FROM_STATE(state, action: PayloadAction<T.RemoveFieldToStatePayload>) {
            const choice = getChoiceById(state, action.payload.catalogueId, action.payload.fieldId, action.payload.id)
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.removedChoices.push(choice)
            field.choices = field.choices.filter(c => c.id !== action.payload.id)
        },
        ADD_FIELD_CHOICE_TO_STATE(state, action: PayloadAction<T.AddFieldToStatePayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId) as DeserializedChoiceField
            field.choices.unshift({
                id: `newChoice_${Date.now()}`,
                fieldId: action.payload.fieldId,
                value: action.payload.name,
            })
        },
        POST_TEXT_FIELD_NAME_CHANGE_START(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
            field.isSubmitting = true
        },
        POST_CHOICE_FIELD_CHANGES_START(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
            field.isSubmitting = true

        },
        POST_TEXT_FIELD_NAME_CHANGE_FAILURE(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
            field.isSubmitting = false
        },
        POST_CHOICE_FIELD_CHANGES_FAILURE(state, action: PayloadAction<T.CatalogueAndFieldIdPayload>) {
            const field = getFieldById(state, action.payload.catalogueId, action.payload.fieldId)
            field.isSubmitting = false
        },
        TOGGLE_ADD_FIELD(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isAddFieldFormActive = !catalogue.isAddFieldFormActive
        },
        CREATE_CATALOGUE_FIELD_START(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isSubmittingNewField = true
        },
        CREATE_CATALOGUE_FIELD_SUCCESS(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isSubmittingNewField = false
            catalogue.isAddFieldFormActive = false
        },
        CREATE_CATALOGUE_FIELD_FAILURE(state, action: PayloadAction<number>) {
            const catalogue = getCatalogueById(state, action.payload)
            catalogue.isSubmittingNewField = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE,
    FETCH_CATALOGUES_START, FETCH_CATALOGUES_SUCCESS, FETCH_CATALOGUES_FAILURE,
    TOGGLE_CATALOGUE_NAME_EDIT,
    CHANGE_CATALOGUE_NAME_START, CHANGE_CATALOGUE_NAME_SUCCESS, CHANGE_CATALOGUE_NAME_FAILURE,
    FETCH_CATALOGUE_FIELD_SUCCESS,
    FETCH_CATALOGUE_FIELDS_START, FETCH_CATALOGUE_FIELDS_SUCCESS, FETCH_CATALOGUE_FIELDS_FAILURE,
    FETCH_FIELDS_CHOICES_START, FETCH_FIELDS_CHOICES_SUCCESS, FETCH_FIELDS_CHOICES_FAILURE,
    TOGGLE_FIELD_EDIT,
    REMOVE_FIELD_CHOICE_FROM_STATE,
    ADD_FIELD_CHOICE_TO_STATE,
    POST_TEXT_FIELD_NAME_CHANGE_START, POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    POST_CHOICE_FIELD_CHANGES_START, POST_CHOICE_FIELD_CHANGES_FAILURE,
    TOGGLE_ADD_FIELD,
    CREATE_CATALOGUE_FIELD_START, CREATE_CATALOGUE_FIELD_SUCCESS, CREATE_CATALOGUE_FIELD_FAILURE
} = cataloguesSlice.actions