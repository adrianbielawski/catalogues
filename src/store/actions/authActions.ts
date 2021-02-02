import { History, Location } from 'history'
//Global types
import { LocationState, User } from 'src/globalTypes'
//Store types
import { AppActionTypes } from 'store/storeTypes/appTypes'
import {
    AUTH_INITIALIZED,
    AUTH_GET_USER, AUTH_GET_USER_START, AUTH_GET_USER_SUCCESS, AUTH_GET_USER_FAILURE,
    AUTH_SIGN_UP, AUTH_SIGN_UP_START, AUTH_SIGN_UP_SUCCESS, AUTH_SIGN_UP_FAILURE,
    AUTH_LOG_IN, AUTH_LOG_IN_START, AUTH_LOG_IN_SUCCESS, AUTH_LOG_IN_FAILURE,
    AUTH_LOG_OUT, AUTH_LOG_OUT_START, AUTH_LOG_OUT_SUCCESS, AUTH_LOG_OUT_FAILURE,
} from 'store/storeTypes/authTypes'

export const authInitialized = (): AppActionTypes => ({
    type: AUTH_INITIALIZED,
})

export const getUser = (
    history: History,
    location: Location<LocationState>
): AppActionTypes => ({
    type: AUTH_GET_USER,
        history,
        location,
})

export const getUserStart = (): AppActionTypes => ({
    type: AUTH_GET_USER_START,
})

export const getUserSuccess = (user: User): AppActionTypes => ({
    type: AUTH_GET_USER_SUCCESS,
    user,
})

export const getUserFailure = (): AppActionTypes => ({
    type: AUTH_GET_USER_FAILURE,
})

export const logIn = (
    email: string,
    password: string,
    history: History,
    location: Location<LocationState>,
): AppActionTypes => ({
    type: AUTH_LOG_IN,
    email,
    password,
    history,
    location,
})

export const logInStart = (): AppActionTypes => ({
    type: AUTH_LOG_IN_START,
})

export const logInSuccess = (user: User): AppActionTypes => ({
    type: AUTH_LOG_IN_SUCCESS,
    user,
})

export const logInFailure = (): AppActionTypes => ({
    type: AUTH_LOG_IN_FAILURE,
})

export const logOut = (history: History): AppActionTypes => ({
    type: AUTH_LOG_OUT,
    history,
})

export const logOutStart = (): AppActionTypes => ({
    type: AUTH_LOG_OUT_START,
})

export const logOutSuccess = (): AppActionTypes => ({
    type: AUTH_LOG_OUT_SUCCESS,
})

export const logOutFailure = (): AppActionTypes => ({
    type: AUTH_LOG_OUT_FAILURE,
})

export const signUp = (
    userName: string,
    email: string,
    password: string,
    repeatedPassword: string,
    history: History,
): AppActionTypes => ({
    type: AUTH_SIGN_UP,
    userName,
    email,
    password,
    repeatedPassword,
    history,
})

export const signUpStart = (): AppActionTypes => ({
    type: AUTH_SIGN_UP_START,
})

export const signUpSuccess = (user: User): AppActionTypes => ({
    type: AUTH_SIGN_UP_SUCCESS,
    user,
})

export const signUpFailure = (): AppActionTypes => ({
    type: AUTH_SIGN_UP_FAILURE,
})