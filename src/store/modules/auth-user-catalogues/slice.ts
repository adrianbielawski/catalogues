import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as cataloguesReducers from './reducers/cataloguesReducers'
import * as fieldsReducers from './reducers/fieldsReducers'
import * as fieldsChoicesReducers from './reducers/choicesReducers'

const initialState: T.AuthUserCataloguesState = {
    cataloguesData: [],
    defaultCatalogueId: null,
    newCatalogueId: null,
    isFetchingCatalogues: true,
    isCreatingNewCatalogue: false,
}

export const authUserCataloguesSlice = createSlice({
    name: 'AUTH_USER_CATALOGUES',
    initialState,
    reducers: {
        ...cataloguesReducers.catalogueReducer,
        ...cataloguesReducers.createCatalogueReducers,
        ...cataloguesReducers.fetchAuthUserCataloguesReducers,
        ...cataloguesReducers.refreshCatalogueReducers,
        ...cataloguesReducers.changeCatalogueNameReducers,
        ...cataloguesReducers.changeDefaultCatalogueReducers,
        ...cataloguesReducers.changePublicCatalogueReducers,
        ...cataloguesReducers.changeCatalogueImageReducers,
        ...cataloguesReducers.deleteCatalogueReducers,
        ...cataloguesReducers.addCatalogueToFavouriteReducers,
        ...cataloguesReducers.deleteCatalogueFromFavouriteReducers,
        ...fieldsReducers.fieldsReducers,
        ...fieldsReducers.fetchCatalogueFieldReducers,
        ...fieldsReducers.fetchCatalogueFieldsReducers,
        ...fieldsReducers.createCatalogueFieldReducers,
        ...fieldsReducers.deleteCatalogueFieldReducers,
        ...fieldsReducers.changeFieldNameReducers,
        ...fieldsReducers.changePublicFieldReducers,
        ...fieldsReducers.reorderFieldsReducers,
        ...fieldsChoicesReducers.fetchFieldsChoicesReducers,
        ...fieldsChoicesReducers.postFieldChoiceReducers,
        ...fieldsChoicesReducers.removeFieldChoiceReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    //Catalogues reducers
    CLEAR_CATALOGUE_ERROR,
    CREATE_CATALOGUE, CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE, NEW_CATALOGUE_CREATED,
    FETCH_AUTH_USER_CATALOGUES, FETCH_AUTH_USER_CATALOGUES_START, FETCH_AUTH_USER_CATALOGUES_SUCCESS, FETCH_AUTH_USER_CATALOGUES_FAILURE,
    REFRESH_CATALOGUE, REFRESH_CATALOGUE_FAILURE,
    TOGGLE_CATALOGUE_NAME_EDIT, CHANGE_CATALOGUE_NAME, CHANGE_CATALOGUE_NAME_START, CHANGE_CATALOGUE_NAME_SUCCESS, CHANGE_CATALOGUE_NAME_FAILURE,
    CHANGE_DEFAULT_CATALOGUE, CHANGE_DEFAULT_CATALOGUE_SUCCESS, CHANGE_DEFAULT_CATALOGUE_FAILURE,
    CHANGE_PUBLIC_CATALOGUE, CHANGE_PUBLIC_CATALOGUE_SUCCESS, CHANGE_PUBLIC_CATALOGUE_FAILURE,
    POST_CATALOGUE_IMAGE, POST_CATALOGUE_IMAGE_START, POST_CATALOGUE_IMAGE_SUCCESS, POST_CATALOGUE_IMAGE_FAILURE,
    DELETE_CATALOGUE, DELETE_CATALOGUE_START, DELETE_CATALOGUE_SUCCESS, DELETE_CATALOGUE_FAILURE,
    ADD_CATALOGUE_TO_FAVOURITE, ADD_CATALOGUE_TO_FAVOURITE_FAILURE,
    DELETE_CATALOGUE_FROM_FAVOURITE, DELETE_CATALOGUE_FROM_FAVOURITE_FAILURE,
    //Fields reducers
    TOGGLE_FIELD_EDIT, CLEAR_FIELD_ERROR, REFRESH_CATALOGUE_FIELD,
    FETCH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD_SUCCESS, FETCH_CATALOGUE_FIELD_FAILURE,
    FETCH_AUTH_USER_CATALOGUE_FIELDS, FETCH_AUTH_USER_CATALOGUE_FIELDS_START, FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS, FETCH_AUTH_USER_CATALOGUE_FIELDS_FAILURE,
    TOGGLE_ADD_FIELD, CREATE_CATALOGUE_FIELD, CREATE_CATALOGUE_FIELD_START, CREATE_CATALOGUE_FIELD_SUCCESS, CREATE_CATALOGUE_FIELD_FAILURE,
    DELETE_CATALOGUE_FIELD, DELETE_CATALOGUE_FIELD_START, DELETE_CATALOGUE_FIELD_SUCCESS, DELETE_CATALOGUE_FIELD_FAILURE,
    CHANGE_FIELD_NAME, CHANGE_FIELD_NAME_START, CHANGE_FIELD_NAME_SUCCESS, CHANGE_FIELD_NAME_FAILURE,
    CHANGE_FIELD_PUBLIC, CHANGE_FIELD_PUBLIC_SUCCESS, CHANGE_FIELD_PUBLIC_FAILURE,
    REORDER_CATALOGUE_FIELDS, REORDER_CATALOGUE_FIELDS_SUCCESS, REORDER_CATALOGUE_FIELDS_FAILURE,
    //Choices reducers
    FETCH_FIELDS_CHOICES, FETCH_FIELDS_CHOICES_START, FETCH_FIELDS_CHOICES_SUCCESS, FETCH_FIELDS_CHOICES_FAILURE,
    POST_FIELD_CHOICE, POST_FIELD_CHOICE_SUCCESS, POST_FIELD_CHOICE_FAILURE,
    REMOVE_FIELD_CHOICE, REMOVE_FIELD_CHOICE_SUCCESS, REMOVE_FIELD_CHOICE_FAILURE,
} = authUserCataloguesSlice.actions