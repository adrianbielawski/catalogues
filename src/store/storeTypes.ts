import { ThunkAction as BaseThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from 'store/reducers/index'
import { User, DeserializedUser, Catalogue, DeserializedCatalogue, ListData, DeserializedListData } from 'src/globalTypes'

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
export const CATALOGUES_CREATE_CATALOGUE = 'CATALOGUES/CREATE_CATALOGUE'
export const CATALOGUES_CREATE_CATALOGUE_START = 'CATALOGUES/CREATE_CATALOGUE/START'
export const CATALOGUES_CREATE_CATALOGUE_SUCCESS = 'CATALOGUES/CREATE_CATALOGUE/SUCCESS'
export const CATALOGUES_CREATE_CATALOGUE_FAILURE = 'CATALOGUES/CREATE_CATALOGUE/FAILURE'
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
    creatingNewCatalogue: boolean,
}

export interface SettingsState {
    myAccount: {
        isEditingUsername: boolean,
        isSubmittingUsername: boolean,
        isEditingPassword: boolean,
        isSubmittingPassword: boolean,
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
    type: typeof CATALOGUES_CREATE_CATALOGUE,
}

interface createCatalogueStart {
    type: typeof CATALOGUES_CREATE_CATALOGUE_START,
}

interface createCatalogueSuccess {
    type: typeof CATALOGUES_CREATE_CATALOGUE_SUCCESS,
}

interface createCatalogueFailure {
    type: typeof CATALOGUES_CREATE_CATALOGUE_FAILURE,
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

export type AppActionTypes = changeScreenHeight | authInitialized | getUserSuccess | getUserFailure
    | logInStart | logInSuccess | logInFailure | signUpStart | signUpSuccess | signUpFailure
    | getCataloguesItemsStart | getCataloguesItemsSuccess | getCataloguesItemsFailure | clearAppState
    | createCatalogue | createCatalogueStart | createCatalogueSuccess | createCatalogueFailure
    | fetchCatalogues | fetchCataloguesStart | fetchCataloguesSuccess | fetchCataloguesFailure
    | toggleUsernameEdit | changeUsername | changeUsernameSuccess | changeUsernameFailure
    | togglePasswordEdit | changePassword | changePasswordSuccess | changePasswordFailure