import { createSlice } from '@reduxjs/toolkit'
import { CataloguesState } from './cataloguesTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import * as cataloguesReducers from './reducers/cataloguesReducer'
import * as fieldsReducers from './reducers/fieldsReducer'

const initialState: CataloguesState = {
    authUser: {
        catalogues: [],
        favouriteCatalogues: [],
        fetchingData: true,
    },
    catalogues: [],
    fetchingCatalogues: true,
    creatingNewCatalogue: false,
    newCatalogueId: null,
}

export const cataloguesSlice = createSlice({
    name: 'CATALOGUES',
    initialState,
    reducers: {
        ...cataloguesReducers.createCatalogueReducers,
        ...cataloguesReducers.refreshCatalogueReducers,
        ...cataloguesReducers.fetchCataloguesReducers,
        ...cataloguesReducers.fetchAuthUserDataReducers,
        ...cataloguesReducers.changeCatalogueNameReducers,
        ...cataloguesReducers.changeDefaultCatalogueReducers,
        ...cataloguesReducers.changePublicCatalogueReducers,
        ...cataloguesReducers.changeCatalogueImageReducers,
        ...cataloguesReducers.catalogueReducer,
        ...cataloguesReducers.deleteCatalogueReducers,
        ...cataloguesReducers.addCatalogueToFavouriteReducers,
        ...cataloguesReducers.deleteCatalogueFromFavouriteReducers,
        ...cataloguesReducers.refreshFavouriteCataloguesReducers,
        ...fieldsReducers.fetchCatalogueFieldReducers,
        ...fieldsReducers.fetchCatalogueFieldsReducers,
        ...fieldsReducers.fetchFieldChoicesReducers,
        ...fieldsReducers.fetchFieldsChoicesReducers,
        ...fieldsReducers.addChoiceReducers,
        ...fieldsReducers.removeChoiceReducers,
        ...fieldsReducers.changePublicFieldReducers,
        ...fieldsReducers.changeFieldNameReducers,
        ...fieldsReducers.editFieldReducers,
        ...fieldsReducers.createCatalogueFieldReducers,
        ...fieldsReducers.deleteFieldReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CREATE_CATALOGUE, CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE, NEW_CATALOGUE_CREATED,
    REFRESH_CATALOGUE, REFRESH_CATALOGUE_START, REFRESH_CATALOGUE_SUCCESS, REFRESH_CATALOGUE_FAILURE,
    FETCH_CATALOGUES, FETCH_CATALOGUES_START, FETCH_CATALOGUES_SUCCESS, FETCH_CATALOGUES_FAILURE,
    FETCH_AUTH_USER_DATA, FETCH_AUTH_USER_DATA_START, FETCH_AUTH_USER_DATA_SUCCESS, FETCH_AUTH_USER_DATA_FAILURE,
    TOGGLE_CATALOGUE_NAME_EDIT,
    CHANGE_CATALOGUE_NAME, FETCH_CATALOGUE_FIELDS, CHANGE_CATALOGUE_NAME_START, CHANGE_CATALOGUE_NAME_SUCCESS, CHANGE_CATALOGUE_NAME_FAILURE,
    CHANGE_DEFAULT_CATALOGUE, CHANGE_DEFAULT_CATALOGUE_START, CHANGE_DEFAULT_CATALOGUE_SUCCESS, CHANGE_DEFAULT_CATALOGUE_FAILURE,
    CHANGE_PUBLIC_CATALOGUE, CHANGE_PUBLIC_CATALOGUE_START, CHANGE_PUBLIC_CATALOGUE_SUCCESS, CHANGE_PUBLIC_CATALOGUE_FAILURE,
    POST_CATALOGUE_IMAGE, POST_CATALOGUE_IMAGE_START, POST_CATALOGUE_IMAGE_SUCCESS, POST_CATALOGUE_IMAGE_FAILURE,
    CLEAR_CATALOGUE_ERROR,
    DELETE_CATALOGUE, DELETE_CATALOGUE_START, DELETE_CATALOGUE_SUCCESS, DELETE_CATALOGUE_FAILURE,
    REFRESH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD_START, FETCH_CATALOGUE_FIELD_SUCCESS, FETCH_CATALOGUE_FIELD_FAILURE,
    REFRESH_CATALOGUE_FIELDS, FETCH_CATALOGUE_FIELDS_START, FETCH_CATALOGUE_FIELDS_SUCCESS, FETCH_CATALOGUE_FIELDS_FAILURE,
    FETCH_FIELD_CHOICES, FETCH_FIELD_CHOICES_START, FETCH_FIELD_CHOICES_SUCCESS, FETCH_FIELD_CHOICES_FAILURE,
    FETCH_FIELDS_CHOICES, FETCH_FIELDS_CHOICES_START, FETCH_FIELDS_CHOICES_SUCCESS, FETCH_FIELDS_CHOICES_FAILURE,
    TOGGLE_FIELD_EDIT,
    CLEAR_FIELD_ERROR,
    POST_CHOICE, POST_CHOICE_START, POST_CHOICE_SUCCESS, POST_CHOICE_FAILURE,
    REMOVE_CHOICE, REMOVE_CHOICE_START, REMOVE_CHOICE_SUCCESS, REMOVE_CHOICE_FAILURE,
    CHANGE_FIELD_PUBLIC, CHANGE_FIELD_PUBLIC_SUCCESS, CHANGE_FIELD_PUBLIC_FAILURE,
    CHANGE_FIELD_NAME, CHANGE_FIELD_NAME_START, CHANGE_FIELD_NAME_SUCCESS, CHANGE_FIELD_NAME_FAILURE,
    TOGGLE_ADD_FIELD,
    CREATE_CATALOGUE_FIELD, CREATE_CATALOGUE_FIELD_START, CREATE_CATALOGUE_FIELD_SUCCESS, CREATE_CATALOGUE_FIELD_FAILURE,
    DELETE_CATALOGUE_FIELD, DELETE_CATALOGUE_FIELD_START, DELETE_CATALOGUE_FIELD_SUCCESS, DELETE_CATALOGUE_FIELD_FAILURE,
    ADD_CATALOGUE_TO_FAVOURITE, ADD_CATALOGUE_TO_FAVOURITE_SUCCESS, ADD_CATALOGUE_TO_FAVOURITE_FAILURE,
    DELETE_CATALOGUE_FROM_FAVOURITE, DELETE_CATALOGUE_FROM_FAVOURITE_SUCCESS, DELETE_CATALOGUE_FROM_FAVOURITE_FAILURE,
    FETCH_FAVOURITE_CATALOGUES, FETCH_FAVOURITE_CATALOGUES_SUCCESS,
} = cataloguesSlice.actions