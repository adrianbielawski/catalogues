import { createSlice } from '@reduxjs/toolkit'
import { CataloguesState } from './cataloguesTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import * as cataloguesReducers from './reducers/cataloguesReducer'
import * as fieldsReducers from './reducers/fieldsReducer'

const initialState: CataloguesState = {
    catalogues: [],
    fetchingCatalogues: true,
    creatingNewCatalogue: false,
}

export const cataloguesSlice = createSlice({
    name: 'CATALOGUES',
    initialState,
    reducers: {
        ...cataloguesReducers.createCatalogueReducers,
        ...cataloguesReducers.refreshCatalogueReducers,
        ...cataloguesReducers.fetchCataloguesReducers,
        ...cataloguesReducers.changeCatalogueNameReducers,
        ...fieldsReducers.fetchCatalogueFieldReducers,
        ...fieldsReducers.fetchCatalogueFieldsReducers,
        ...fieldsReducers.fetchFieldChoicesReducers,
        ...fieldsReducers.fetchFieldsChoicesReducers,
        ...fieldsReducers.addChoiceReducers,
        ...fieldsReducers.editFieldReducers,
        ...fieldsReducers.createCatalogueFieldReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CREATE_CATALOGUE, CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE,
    REFRESH_CATALOGUE, REFRESH_CATALOGUE_START, REFRESH_CATALOGUE_SUCCESS, REFRESH_CATALOGUE_FAILURE,
    FETCH_CATALOGUES, FETCH_CATALOGUES_START, FETCH_CATALOGUES_SUCCESS, FETCH_CATALOGUES_FAILURE,
    TOGGLE_CATALOGUE_NAME_EDIT,
    CHANGE_CATALOGUE_NAME, FETCH_CATALOGUE_FIELDS, CHANGE_CATALOGUE_NAME_START, CHANGE_CATALOGUE_NAME_SUCCESS, CHANGE_CATALOGUE_NAME_FAILURE,
    REFRESH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD_START, FETCH_CATALOGUE_FIELD_SUCCESS, FETCH_CATALOGUE_FIELD_FAILURE,
    REFRESH_CATALOGUE_FIELDS, FETCH_CATALOGUE_FIELDS_START, FETCH_CATALOGUE_FIELDS_SUCCESS, FETCH_CATALOGUE_FIELDS_FAILURE,
    FETCH_FIELD_CHOICES, FETCH_FIELD_CHOICES_START, FETCH_FIELD_CHOICES_SUCCESS, FETCH_FIELD_CHOICES_FAILURE,
    FETCH_FIELDS_CHOICES, FETCH_FIELDS_CHOICES_START, FETCH_FIELDS_CHOICES_SUCCESS, FETCH_FIELDS_CHOICES_FAILURE,
    TOGGLE_FIELD_EDIT,
    REMOVE_FIELD_CHOICE_FROM_STATE,
    POST_TEXT_FIELD_NAME_CHANGE, POST_TEXT_FIELD_NAME_CHANGE_START, POST_TEXT_FIELD_NAME_CHANGE_SUCCESS, POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    POST_CHOICE_FIELD_CHANGES, POST_CHOICE_FIELD_CHANGES_START, POST_CHOICE_FIELD_CHANGES_SUCCESS, POST_CHOICE_FIELD_CHANGES_FAILURE,
    ADD_CHOICE_ERROR, CLEAR_ADD_CHOICE_ERROR,
    POST_CHOICE, POST_CHOICE_START, POST_CHOICE_SUCCESS, POST_CHOICE_FAILURE,
    TOGGLE_ADD_FIELD,
    CREATE_CATALOGUE_FIELD, CREATE_CATALOGUE_FIELD_START, CREATE_CATALOGUE_FIELD_SUCCESS, CREATE_CATALOGUE_FIELD_FAILURE
} = cataloguesSlice.actions