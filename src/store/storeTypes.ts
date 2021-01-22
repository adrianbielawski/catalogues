import { ThunkAction as BaseThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from 'store/reducers/index'
import {
    User, DeserializedUser, Catalogue, DeserializedCatalogue, ListData, DeserializedListData, Field, Choice, DeserializedChoiceField
} from 'src/globalTypes'

export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'
export const AUTH_INITIALIZED = 'AUTH/INITIALIZED'
export const AUTH_GET_USER_SUCCESS = 'AUTH/GET_USER/SUCCESS'
export const AUTH_GET_USER_FAILURE = 'AUTH/GET_USER/FAILURE'
export const AUTH_LOG_IN_START = 'AUTH/LOG_IN/START'
export const AUTH_LOG_IN_SUCCESS = 'AUTH/LOG_IN/SUCCESS'
export const AUTH_LOG_IN_FAILURE = 'AUTH/LOG_IN/FAILURE'
export const AUTH_SIGN_UP_START = 'AUTH/SIGN_UP/START'
export const AUTH_SIGN_UP_SUCCESS = 'AUTH/SIGN_UP/SUCCESS'
export const AUTH_SIGN_UP_FAILURE = 'AUTH/SIGN_UP/FAILURE'
export const APP_CLEAR_APP_STATE = 'APP/CLEAR_APP_STATE'
export const CATALOGUES_FETCH_CATALOGUES = 'CATALOGUES/FETCH_CATALOGUES'
export const CATALOGUES_FETCH_CATALOGUES_START = 'CATALOGUES/FETCH_CATALOGUES/START'
export const CATALOGUES_FETCH_CATALOGUES_SUCCESS = 'CATALOGUES/FETCH_CATALOGUES/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUES_FAILURE = 'CATALOGUES/FETCH_CATALOGUES/FAILURE'
export const CATALOGUES_GET_CATALOGUE_ITEMS_START = 'CATALOGUES/GET_CATALOGUE_ITEMS/START'
export const CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS = 'CATALOGUES/GET_CATALOGUE_ITEMS/SUCCESS'
export const CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE = 'CATALOGUES/GET_CATALOGUE_ITEMS/FAILURE'
export const CATALOGUES_FETCH_ITEMS_FIELDS = 'CATALOGUES/FETCH_ITEMS_FIELDS'
export const CATALOGUES_FETCH_ITEMS_FIELDS_START = 'CATALOGUES/FETCH_ITEMS_FIELDS/START'
export const CATALOGUES_FETCH_ITEMS_FIELDS_SUCCESS = 'CATALOGUES/FETCH_ITEMS_FIELDS/SUCCESS'
export const CATALOGUES_FETCH_ITEMS_FIELDS_FAILURE = 'CATALOGUES/FETCH_ITEMS_FIELDS/FAILURE'
export const CATALOGUES_REFRESH_FIELD = 'CATALOGUES/REFRESH_FIELD'
export const CATALOGUES_FETCH_CATALOGUE_FIELD = 'CATALOGUES/FETCH_CATALOGUE_FIELD'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_START = 'CATALOGUES/FETCH_CATALOGUE_FIELD/START'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS = 'CATALOGUES/FETCH_CATALOGUE_FIELD/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE = 'CATALOGUES/FETCH_CATALOGUE_FIELD/FAILURE'
export const CATALOGUES_FETCH_FIELDS_CHOICES = 'CATALOGUES/FETCH_FIELDS_CHOICES'
export const CATALOGUES_FETCH_FIELDS_CHOICES_START = 'CATALOGUES/FETCH_FIELDS_CHOICES/START'
export const CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS = 'CATALOGUES/FETCH_FIELDS_CHOICES/SUCCESS'
export const CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE = 'CATALOGUES/FETCH_FIELDS_CHOICES/FAILURE'
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
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_START = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/START'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/SUCCESS'
export const MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_FAILURE = 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/FAILURE'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/START'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/SUCCESS'
export const MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE = 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/FAILURE'

export type ThunkAction<ReturnType = void> = BaseThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export interface AppState {
    screenHeight: number,
    user: DeserializedUser | null,
}

export interface AuthState {
    isInitialized: boolean,
    isLoggingIn: boolean,
    isSigningUp: boolean,
}

export interface CataloguesState {
    catalogues: DeserializedCatalogue[],
    fetchingCatalogues: boolean,
    itemsData: DeserializedListData,
    fetchingItems: boolean,
}

export interface SettingsState {
    myAccount: {
        isEditingUsername: boolean,
        isSubmittingUsername: boolean,
        isEditingPassword: boolean,
        isSubmittingPassword: boolean,
    },
    manageCatalogues: {
        creatingNewCatalogue: boolean,
        editingCatalogueName: number | null,
        submittingCatalogueName: number | null,
    }
}

export interface ErrorData {
    [field: string]: string
}

interface changeScreenHeight {
    type: typeof SCREEN_HEIGHT_CHANGED,
    screenHeight: number,
}

interface authInitialized {
    type: typeof AUTH_INITIALIZED,
}

interface getUserSuccess {
    type: typeof AUTH_GET_USER_SUCCESS,
    user: User,
}

interface getUserFailure {
    type: typeof AUTH_GET_USER_FAILURE,
}

interface logInStart {
    type: typeof AUTH_LOG_IN_START,
}

interface logInSuccess {
    type: typeof AUTH_LOG_IN_SUCCESS,
    user: User,
}

interface logInFailure {
    type: typeof AUTH_LOG_IN_FAILURE,
}

interface signUpStart {
    type: typeof AUTH_SIGN_UP_START,
}

interface signUpSuccess {
    type: typeof AUTH_SIGN_UP_SUCCESS,
    user: User,
}

interface signUpFailure {
    type: typeof AUTH_SIGN_UP_FAILURE,
}

export interface fetchItemsFields {
    type: typeof CATALOGUES_FETCH_ITEMS_FIELDS,
    catalogueId: number,
}

interface fetchItemsFieldsStart {
    type: typeof CATALOGUES_FETCH_ITEMS_FIELDS_START,
    catalogueId: number,
}

interface fetchItemsFieldsSuccess {
    type: typeof CATALOGUES_FETCH_ITEMS_FIELDS_SUCCESS,
    data: Field[],
    catalogueId: number,
}

export interface RefreshField {
    type: typeof CATALOGUES_REFRESH_FIELD,
    fieldId: number,
    catalogueId: number,
}

export interface FetchCatalogueField {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldStart {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_START,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS,
    data: Field,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE,
    fieldId: number,
    catalogueId: number,
}

export interface fetchFieldsChoices {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES,
    fieldId: number,
    catalogueId: number,
}

interface fetchFieldsChoicesStart {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_START,
    fieldId: number,
    catalogueId: number,
}

interface fetchFieldsChoicesSuccess {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS,
    fieldId: number,
    catalogueId: number,
    data: Choice[]
}

interface fetchFieldsChoicesFailure {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE,
    fieldId: number,
    catalogueId: number,
}

interface fetchItemsFieldsFailure {
    type: typeof CATALOGUES_FETCH_ITEMS_FIELDS_FAILURE,
    catalogueId: number,
}

interface getCataloguesItemsStart {
    type: typeof CATALOGUES_GET_CATALOGUE_ITEMS_START,
}

interface getCataloguesItemsSuccess {
    type: typeof CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS,
    data: ListData,
}

interface getCataloguesItemsFailure {
    type: typeof CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE,
}

interface clearAppState {
    type: typeof APP_CLEAR_APP_STATE,
    screenHeight: number,
}

interface createCatalogue {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE,
}

interface createCatalogueStart {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_START,
}

interface createCatalogueSuccess {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
}

interface createCatalogueFailure {
    type: typeof MANAGE_CATALOGUES_CREATE_CATALOGUE_FAILURE,
}

interface fetchCatalogues {
    type: typeof CATALOGUES_FETCH_CATALOGUES,
}

interface fetchCataloguesStart {
    type: typeof CATALOGUES_FETCH_CATALOGUES_START,
}

interface fetchCataloguesSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUES_SUCCESS,
    catalogues: Catalogue[],
}

interface fetchCataloguesFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUES_FAILURE,
}

interface toggleUsernameEdit {
    type: typeof MY_ACCOUNT_TOGGLE_USERNAME_EDIT,
    isEditing: boolean,
}

export interface changeUsername {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME,
    newName: string,
}

interface changeUsernameSuccess {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME_SUCCESS,
    user: User,
}

interface changeUsernameFailure {
    type: typeof MY_ACCOUNT_CHANGE_USERNAME_FAILURE,
}

interface togglePasswordEdit {
    type: typeof MY_ACCOUNT_TOGGLE_PASSWORD_EDIT,
    isEditing: boolean,
}

export interface changePassword {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD,
    newPassword1: string,
    newPassword2: string,
}

interface changePasswordSuccess {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS,
}

interface changePasswordFailure {
    type: typeof MY_ACCOUNT_CHANGE_PASSWORD_FAILURE,
}

interface toggleEditCatalogueName {
    type: typeof MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT,
    catalogueId: number | null,
}

interface toggleFieldEdit {
    type: typeof MANAGE_CATALOGUES_TOGGLE_FIELD_EDIT,
    fieldId: number,
    catalogueId: number,
}

export interface removeFieldChoiceFromState {
    type: typeof MANAGE_CATALOGUES_REMOVE_FIELD_CHOICE_FROM_STATE,
    id: number,
    fieldId: number,
    catalogueId: number,
}

export interface addFieldChoiceToState {
    type: typeof MANAGE_CATALOGUES_ADD_FIELD_CHOICE_TO_STATE,
    name: string,
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

export interface changeCatalogueName {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    catalogueId: number,
    newName: string,
}

interface changeCatalogueNameStart {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START,
    catalogueId: number,
}

interface changeCatalogueNameSuccess {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
}

interface changeCatalogueNameFailure {
    type: typeof MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
}

export type AppActionTypes = changeScreenHeight | authInitialized | getUserSuccess | getUserFailure
    | logInStart | logInSuccess | logInFailure | signUpStart | signUpSuccess | signUpFailure
    | getCataloguesItemsStart | getCataloguesItemsSuccess | getCataloguesItemsFailure | clearAppState
    | fetchItemsFields | fetchItemsFieldsStart | fetchItemsFieldsSuccess | fetchItemsFieldsFailure
    | RefreshField
    | FetchCatalogueField | FetchCatalogueFieldStart | FetchCatalogueFieldSuccess | FetchCatalogueFieldFailure
    | fetchFieldsChoices | fetchFieldsChoicesStart | fetchFieldsChoicesSuccess | fetchFieldsChoicesFailure
    | createCatalogue | createCatalogueStart | createCatalogueSuccess | createCatalogueFailure
    | fetchCatalogues | fetchCataloguesStart | fetchCataloguesSuccess | fetchCataloguesFailure
    | toggleUsernameEdit | changeUsername | changeUsernameSuccess | changeUsernameFailure
    | togglePasswordEdit | changePassword | changePasswordSuccess | changePasswordFailure
    | toggleEditCatalogueName | changeCatalogueName | changeCatalogueNameStart | changeCatalogueNameSuccess | changeCatalogueNameFailure
    | toggleFieldEdit | removeFieldChoiceFromState | addFieldChoiceToState
    | PostChoiceFieldChanges | PostChoiceFieldChangesSuccess | PostChoiceFieldChangesStart | PostChoiceFieldChangesFailure