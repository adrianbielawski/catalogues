import { ThunkAction as BaseThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from 'store/reducers/index'
import { User, DeserializedUser } from 'src/globalTypes'

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
export const APP_SHOW_SETTINGS = 'APP/SHOW_SETTINGS'

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

interface clearAppState {
    type: typeof APP_CLEAR_APP_STATE,
    screenHeight: number,
}

interface showSettings {
    type: typeof APP_SHOW_SETTINGS,
}

export type AppActionTypes = changeScreenHeight | authInitialized | getUserSuccess | getUserFailure
    | logInStart | logInSuccess | logInFailure | signUpStart | signUpSuccess | signUpFailure
    | clearAppState | showSettings