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
export const AUTH_USERNAME_CHANGE_SUCCESS = 'AUTH/USERNAME_CHANGE/SUCCESS'
export const AUTH_PASSWORD_CHANGE_SUCCESS = 'AUTH/PASSWORD_CHANGE/SUCCESS'
export const CATALOGUES_GET_CATALOGUES_SUCCESS = 'CATALOGUES/GET_CATALOGUES/SUCCESS'
export const CATALOGUES_GET_CATALOGUE_ITEMS_START = 'CATALOGUES/GET_CATALOGUE_ITEMS/START'
export const CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS = 'CATALOGUES/GET_CATALOGUE_ITEMS/SUCCESS'
export const CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE = 'CATALOGUES/GET_CATALOGUE_ITEMS/FAILURE'
export const CATALOGUES_CREATE_CATALOGUE = 'CATALOGUES/CREATE_CATALOGUE'
export const CATALOGUES_CREATE_CATALOGUE_START = 'CATALOGUES/CREATE_CATALOGUE/START'
export const CATALOGUES_CREATE_CATALOGUE_SUCCESS = 'CATALOGUES/CREATE_CATALOGUE/SUCCESS'
export const CATALOGUES_CREATE_CATALOGUE_FAILURE = 'CATALOGUES/CREATE_CATALOGUE/FAILURE'

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

interface changeUsernameSuccess {
    type: typeof AUTH_USERNAME_CHANGE_SUCCESS,
    user: User,
}

interface changeUserPassword {
    type: typeof AUTH_PASSWORD_CHANGE_SUCCESS,
}

interface getCataloguesSuccess {
    type: typeof CATALOGUES_GET_CATALOGUES_SUCCESS,
    catalogues: Catalogue[],
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

export type AppActionTypes = changeScreenHeight | authInitialized | getUserSuccess | getUserFailure
    | logInStart | logInSuccess | logInFailure | signUpStart | signUpSuccess | signUpFailure
    | changeUsernameSuccess | changeUserPassword
    | getCataloguesSuccess | getCataloguesItemsStart
    | getCataloguesItemsSuccess | getCataloguesItemsFailure | clearAppState

    | createCatalogue | createCatalogueStart | createCatalogueSuccess | createCatalogueFailure
