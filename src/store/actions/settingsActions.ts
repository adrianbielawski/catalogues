import { Location } from 'history'
import { Catalogue, DeserializedChoiceField, LocationState } from 'src/globalTypes'
import { AppActionTypes } from 'store/storeTypes/appTypes'
import {
    MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT,
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
    MANAGE_CATALOGUES_TOGGLE_FIELD_EDIT,
    MANAGE_CATALOGUES_REMOVE_FIELD_CHOICE_FROM_STATE,
    MANAGE_CATALOGUES_ADD_FIELD_CHOICE_TO_STATE,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE, MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_START, MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS, MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES, MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_START, MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS, MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_FAILURE,
    MANAGE_CATALOGUES_TOGGLE_ADD_FIELD,
    MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD, MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_START, MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS, MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_FAILURE,
} from 'store/storeTypes/settingsTypes'

export const toggleCatalogueNameEdit = (catalogueId: number): AppActionTypes => ({
    type: MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT,
    catalogueId,
})

export const changeCatalogueName = (
    catalogueId: number,
    newName: string,
    location: Location<LocationState>
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    catalogueId,
    newName,
    location,
})

export const changeCatalogueNameStart = (catalogueId: number): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START,
    catalogueId,
})

export const changeCatalogueNameSuccess = (
    catalogue: Catalogue,
    location: Location<LocationState>,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    catalogue,
    location,
})

export const changeCatalogueNameFailure = (catalogueId: number): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
    catalogueId,
})

export const toggleFieldEdit = (
    fieldId: number,
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_TOGGLE_FIELD_EDIT,
    fieldId,
    catalogueId,
})

export const removeFieldChoiceFromState = (
    id: number | string,
    fieldId: number,
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_REMOVE_FIELD_CHOICE_FROM_STATE,
    id,
    fieldId,
    catalogueId,
})

export const addFieldChoiceToState = (
    name: string,
    fieldId: number,
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_ADD_FIELD_CHOICE_TO_STATE,
    name,
    fieldId,
    catalogueId,
})

export const postTextFieldNameChange = (
    fieldId: number,
    catalogueId: number,
    fieldName: string
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE,
    fieldId,
    catalogueId,
    fieldName,
})

export const postTextFieldNameChangeStart = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_START,
    fieldId,
    catalogueId,
})

export const postTextFieldNameChangeSuccess = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS,
    fieldId,
    catalogueId,
})

export const postTextFieldNameChangeFailure = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    fieldId,
    catalogueId,
})

export const postChoiceFieldChanges = (
    field: DeserializedChoiceField,
    fieldName: string
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES,
    field,
    fieldName,
})

export const postChoiceFieldChangesStart = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_START,
    fieldId,
    catalogueId,
})

export const postChoiceFieldChangesSuccess = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
    fieldId,
    catalogueId,
})

export const postChoiceFieldChangesFailure = (
    fieldId: number,
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_FAILURE,
    fieldId,
    catalogueId,
})

export const toggleAddField = (
    catalogueId: number
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_TOGGLE_ADD_FIELD,
    catalogueId,
})

export const createCatalogueField = (
    catalogueId: number,
    fieldName: string,
    fieldType: string,
    position: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD,
    catalogueId,
    fieldName,
    fieldType,
    position,
})

export const createCatalogueFieldStart = (
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_START,
    catalogueId,
})

export const createCatalogueFieldSuccess = (
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS,
    catalogueId,
})

export const createCatalogueFieldFailure = (
    catalogueId: number,
): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_FAILURE,
    catalogueId,
})