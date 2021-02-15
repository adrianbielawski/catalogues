import { Location } from 'history'
import { Catalogue, DeserializedChoiceField, LocationState } from 'src/globalTypes'

export const MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT = 'MANAGE_CATALOGUES/TOGGLE_CATALOGUE_NAME_EDIT'
export const MANAGE_CATALOGUES_TOGGLE_FIELD_EDIT = 'MANAGE_CATALOGUES/TOGGLE_FIELD_EDIT'
export const MANAGE_CATALOGUES_REMOVE_FIELD_CHOICE_FROM_STATE = 'MANAGE_CATALOGUES/REMOVE_FIELD_CHOICE_FROM_STATE'
export const MANAGE_CATALOGUES_ADD_FIELD_CHOICE_TO_STATE = 'MANAGE_CATALOGUES/ADD_FIELD_CHOICE_TO_STATE'
export const MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE = 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE'
export const MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_START = 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE/START'
export const MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS = 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE/SUCCESS'
export const MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_FAILURE = 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE/FAILURE'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_START = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/START'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/SUCCESS'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_FAILURE = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/FAILURE'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/START'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/SUCCESS'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/FAILURE'
export const MANAGE_CATALOGUES_TOGGLE_ADD_FIELD = 'MANAGE_CATALOGUES/TOGGLE_ADD_FIELD'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD = 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_START = 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/START'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS = 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/SUCCESS'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_FAILURE = 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/FAILURE'

interface ToggleFieldEdit {
    type: typeof MANAGE_CATALOGUES_TOGGLE_FIELD_EDIT,
    fieldId: number,
    catalogueId: number,
}

export interface RemoveFieldChoiceFromState {
    type: typeof MANAGE_CATALOGUES_REMOVE_FIELD_CHOICE_FROM_STATE,
    id: number | string,
    fieldId: number,
    catalogueId: number,
}

export interface AddFieldChoiceToState {
    type: typeof MANAGE_CATALOGUES_ADD_FIELD_CHOICE_TO_STATE,
    name: string,
    fieldId: number,
    catalogueId: number,
}

export interface PostTextFieldNameChange {
    type: typeof MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE,
    fieldName: string,
    fieldId: number,
    catalogueId: number,
}

interface PostTextFieldNameChangeStart {
    type: typeof MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_START,
    fieldId: number,
    catalogueId: number,
}

export interface PostTextFieldNameChangeSuccess {
    type: typeof MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS,
    fieldId: number,
    catalogueId: number,
}

interface PostTextFieldNameChangeFailure {
    type: typeof MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    fieldId: number,
    catalogueId: number,
}

export interface PostChoiceFieldChanges {
    type: typeof MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES,
    field: DeserializedChoiceField,
    fieldName: string,
}

interface PostChoiceFieldChangesStart {
    type: typeof MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_START,
    fieldId: number,
    catalogueId: number,
}

export interface PostChoiceFieldChangesSuccess {
    type: typeof MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
    fieldId: number,
    catalogueId: number,
}

interface PostChoiceFieldChangesFailure {
    type: typeof MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_FAILURE,
    fieldId: number,
    catalogueId: number,
}

interface ToggleCatalogueNameEdit {
    type: typeof MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT,
    catalogueId: number,
}

export interface ChangeCatalogueName {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    catalogueId: number,
    newName: string,
    location: Location<LocationState>,
}

interface ChangeCatalogueNameStart {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START,
    catalogueId: number,
}

export interface ChangeCatalogueNameSuccess {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    catalogue: Catalogue,
    location: Location<LocationState>,
}

interface ChangeCatalogueNameFailure {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
    catalogueId: number,
}

interface ToggleAddField {
    type: typeof MANAGE_CATALOGUES_TOGGLE_ADD_FIELD,
    catalogueId: number,
}

export interface CreateCatalogueField {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD,
    catalogueId: number,
    fieldName: string,
    fieldType: string,
    position: number,
}

interface CreateCatalogueFieldStart {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_START,
    catalogueId: number,
}

export interface CreateCatalogueFieldSuccess {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS,
    catalogueId: number,
}

interface CreateCatalogueFieldFailure {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_FAILURE,
    catalogueId: number,
}

export type SettingsTypes =
    | ToggleCatalogueNameEdit | ChangeCatalogueName | ChangeCatalogueNameStart | ChangeCatalogueNameSuccess | ChangeCatalogueNameFailure
    | ToggleFieldEdit | RemoveFieldChoiceFromState | AddFieldChoiceToState
    | PostTextFieldNameChange | PostTextFieldNameChangeStart | PostTextFieldNameChangeSuccess | PostTextFieldNameChangeFailure
    | PostChoiceFieldChanges | PostChoiceFieldChangesSuccess | PostChoiceFieldChangesStart | PostChoiceFieldChangesFailure
    | ToggleAddField | CreateCatalogueField | CreateCatalogueFieldStart | CreateCatalogueFieldSuccess | CreateCatalogueFieldFailure