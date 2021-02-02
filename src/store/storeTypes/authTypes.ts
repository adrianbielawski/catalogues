import { LocationState, User } from 'src/globalTypes'
import { History, Location } from 'history'

export const AUTH_INITIALIZED = 'AUTH/INITIALIZED'
export const AUTH_GET_USER = 'AUTH/GET_USER'
export const AUTH_GET_USER_START = 'AUTH/GET_USER/START'
export const AUTH_GET_USER_SUCCESS = 'AUTH/GET_USER/SUCCESS'
export const AUTH_GET_USER_FAILURE = 'AUTH/GET_USER/FAILURE'
export const AUTH_LOG_IN = 'AUTH/LOG_IN'
export const AUTH_LOG_IN_START = 'AUTH/LOG_IN/START'
export const AUTH_LOG_IN_SUCCESS = 'AUTH/LOG_IN/SUCCESS'
export const AUTH_LOG_IN_FAILURE = 'AUTH/LOG_IN/FAILURE'
export const AUTH_LOG_OUT = 'AUTH/LOG_OUT'
export const AUTH_LOG_OUT_START = 'AUTH/LOG_OUT/START'
export const AUTH_LOG_OUT_SUCCESS = 'AUTH/LOG_OUT/SUCCESS'
export const AUTH_LOG_OUT_FAILURE = 'AUTH/LOG_OUT/FAILURE'
export const AUTH_SIGN_UP = 'AUTH/SIGN_UP'
export const AUTH_SIGN_UP_START = 'AUTH/SIGN_UP/START'
export const AUTH_SIGN_UP_SUCCESS = 'AUTH/SIGN_UP/SUCCESS'
export const AUTH_SIGN_UP_FAILURE = 'AUTH/SIGN_UP/FAILURE'

export interface AuthState {
    isInitialized: boolean,
    isLoggingIn: boolean,
    isSigningUp: boolean,
}

interface AuthInitialized {
    type: typeof AUTH_INITIALIZED,
}

export interface GetUser {
    type: typeof AUTH_GET_USER,
    history: History,
    location: Location<LocationState>
}

interface GetUserStart {
    type: typeof AUTH_GET_USER_START,
}

interface GetUserSuccess {
    type: typeof AUTH_GET_USER_SUCCESS,
    user: User,
}

interface GetUserFailure {
    type: typeof AUTH_GET_USER_FAILURE,
}

export interface LogIn {
    type: typeof AUTH_LOG_IN,
    email: string,
    password: string,
    history: History,
    location: Location<LocationState>,
}

interface LogInStart {
    type: typeof AUTH_LOG_IN_START,
}

interface LogInSuccess {
    type: typeof AUTH_LOG_IN_SUCCESS,
    user: User,
}

interface LogInFailure {
    type: typeof AUTH_LOG_IN_FAILURE,
}

export interface LogOut {
    type: typeof AUTH_LOG_OUT,
    history: History,
}

interface LogOutStart {
    type: typeof AUTH_LOG_OUT_START,
}

interface LogOutSuccess {
    type: typeof AUTH_LOG_OUT_SUCCESS,
}

interface LogOutFailure {
    type: typeof AUTH_LOG_OUT_FAILURE,
}

export interface SignUp {
    type: typeof AUTH_SIGN_UP,
    userName: string,
    email: string,
    password: string,
    repeatedPassword: string,
    history: History,
}

interface SignUpStart {
    type: typeof AUTH_SIGN_UP_START,
}

interface SignUpSuccess {
    type: typeof AUTH_SIGN_UP_SUCCESS,
    user: User,
}

interface SignUpFailure {
    type: typeof AUTH_SIGN_UP_FAILURE,
}

export type AuthTypes = AuthInitialized
    | GetUser | GetUserStart | GetUserSuccess | GetUserFailure
    | LogIn | LogInStart | LogInSuccess | LogInFailure
    | LogOut | LogOutStart | LogOutSuccess | LogOutFailure
    | SignUp | SignUpStart | SignUpSuccess | SignUpFailure