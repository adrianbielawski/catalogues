import { User, Catalogue, DeserializedChoiceField } from 'src/globalTypes'

export const MY_ACCOUNT_CHANGE_USERNAME = 'MY_ACCOUNT/CHANGE_USERNAME'
export const MY_ACCOUNT_CHANGE_USERNAME_START = 'MY_ACCOUNT/CHANGE_USERNAME/START'
export const MY_ACCOUNT_CHANGE_USERNAME_SUCCESS = 'MY_ACCOUNT/CHANGE_USERNAME/SUCCESS'
export const MY_ACCOUNT_CHANGE_USERNAME_FAILURE = 'MY_ACCOUNT/CHANGE_USERNAME/FAILURE'
export const MY_ACCOUNT_TOGGLE_USERNAME_EDIT = 'MY_ACCOUNT/TOGGLE_USERNAME_EDIT'
export const MY_ACCOUNT_TOGGLE_PASSWORD_EDIT = 'MY_ACCOUNT/TOGGLE_PASSWORD_EDIT'
export const MY_ACCOUNT_CHANGE_PASSWORD = 'MY_ACCOUNT/CHANGE_PASSWORD'
export const MY_ACCOUNT_CHANGE_PASSWORD_START = 'MY_ACCOUNT/CHANGE_PASSWORD/START'
export const MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS = 'MY_ACCOUNT/CHANGE_PASSWORD/SUCCESS'
export const MY_ACCOUNT_CHANGE_PASSWORD_FAILURE = 'MY_ACCOUNT/CHANGE_PASSWORD/FAILURE'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE = 'MANAGE_CATALOGUES/CREATE_CATALOGUE'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_START = 'MANAGE_CATALOGUES/CREATE_CATALOGUE/START'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS = 'MANAGE_CATALOGUES/CREATE_CATALOGUE/SUCCESS'
export const MANAGE_CATALOGUES_CREATE_CATALOGUE_FAILURE = 'MANAGE_CATALOGUES/CREATE_CATALOGUE/FAILURE'
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

export interface SettingsState {
    myAccount: {
        isEditingUsername: boolean,
        isSubmittingUsername: boolean,
        isEditingPassword: boolean,
        isSubmittingPassword: boolean,
    },
    manageCatalogues: {
        creatingNewCatalogue: boolean,
    }
}

interface CreateCatalogue {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE,
}

interface CreateCatalogueStart {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_START,
}

interface CreateCatalogueSuccess {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
    catalogue: Catalogue
}

interface CreateCatalogueFailure {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FAILURE,
}

interface ToggleUsernameEdit {
    type: typeof MY_ACCOUNT_TOGGLE_USERNAME_EDIT,
    isEditing: boolean,
}

export interface ChangeUsername {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME,
    newName: string,
}

interface ChangeUsernameSuccess {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME_SUCCESS,
    user: User,
}

interface ChangeUsernameFailure {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME_FAILURE,
}

interface TogglePasswordEdit {
    type: typeof MY_ACCOUNT_TOGGLE_PASSWORD_EDIT,
    isEditing: boolean,
}

export interface ChangePassword {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD,
    newPassword1: string,
    newPassword2: string,
}

interface ChangePasswordSuccess {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS,
}

interface ChangePasswordFailure {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD_FAILURE,
}

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
}

interface ChangeCatalogueNameStart {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START,
    catalogueId: number,
}

export interface ChangeCatalogueNameSuccess {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    catalogue: Catalogue,
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
    | CreateCatalogue | CreateCatalogueStart | CreateCatalogueSuccess | CreateCatalogueFailure
    | ToggleUsernameEdit | ChangeUsername | ChangeUsernameSuccess | ChangeUsernameFailure
    | TogglePasswordEdit | ChangePassword | ChangePasswordSuccess | ChangePasswordFailure
    | ToggleCatalogueNameEdit | ChangeCatalogueName | ChangeCatalogueNameStart | ChangeCatalogueNameSuccess | ChangeCatalogueNameFailure
    | ToggleFieldEdit | RemoveFieldChoiceFromState | AddFieldChoiceToState
    | PostTextFieldNameChange | PostTextFieldNameChangeStart | PostTextFieldNameChangeSuccess | PostTextFieldNameChangeFailure
    | PostChoiceFieldChanges | PostChoiceFieldChangesSuccess | PostChoiceFieldChangesStart | PostChoiceFieldChangesFailure
    | ToggleAddField | CreateCatalogueField | CreateCatalogueFieldStart | CreateCatalogueFieldSuccess | CreateCatalogueFieldFailure