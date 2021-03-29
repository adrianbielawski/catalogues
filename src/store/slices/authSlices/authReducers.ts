import { PayloadAction } from '@reduxjs/toolkit'
import { userDeserializer } from 'src/serializers'
import * as T from './authTypes'
import { User } from 'src/globalTypes'
import { initialState } from './authSlices'

type State = T.AuthState

export const authReducers = {
    CLEAR_AUTH_ERROR(state: State) {
        state.authError = {
            title: '',
            message: '',
        }
    },
}

export const initializeReducers = {
    INITIALIZED(state: State) {
        state.isInitialized = true
    },
    GET_USER(state: State, action: PayloadAction<T.GetUserDetails>) {},
    GET_USER_SUCCESS(state: State, action: PayloadAction<User>) {
        state.isInitialized = true
        state.user = userDeserializer(action.payload)
    },
    GET_USER_FAILURE(state: State) {
        state.isInitialized = true
    },
}

export const loginReducers = {
    LOG_IN(state: State, action: PayloadAction<T.LoginDetails>) {},
    LOG_IN_START(state: State) {
        state.isInitialized = true
        state.isLoggingIn = true
    },
    LOG_IN_SUCCESS(state: State, action: PayloadAction<User>) {
        state.user = userDeserializer(action.payload)
        state.isLoggingIn = false
    },
    LOG_IN_FAILURE(state: State, action: PayloadAction<string>) {
        state.isLoggingIn = false
        state.authError = {
            title: 'Log in error',
            message: action.payload,
        }
    },
}

export const validateUsernameReducer = {
    VALIDATE_USERNAME(state: State, action: PayloadAction<string>) {},
    VALIDATE_USERNAME_START(state: State) {
        state.isCheckingUsername = true
    },
    VALIDATE_USERNAME_SUCCESS(state: State) {
        state.invalidUsernameMessage = ''
        state.isCheckingUsername = false
    },
    VALIDATE_USERNAME_FAILURE(state: State, action: PayloadAction<string>) {
        state.invalidUsernameMessage = action.payload
        state.isCheckingUsername = false
    },
}

export const signupReducers = {
    SIGN_UP(state: State, action: PayloadAction<T.SignUpDetails>) {},
    SIGN_UP_START(state: State) {
        state.isSigningUp = true
    },
    SIGN_UP_SUCCESS(state: State) {
        state.isSigningUp = false
        state.signUpMessage = {
            title: 'Signed up successfully',
            message: 'Please check your inbox to confirm your email address',
        }
    },
    SIGN_UP_FAILURE(state: State, action: PayloadAction<string>) {
        state.isSigningUp = false
        state.authError = {
            title: 'Sign up error',
            message: action.payload,
        }
    },
    CLEAR_SIGNUP_MESSAGE(state: State) {
        state.signUpMessage = {
            title: '',
            message: '',
        }
    },
}

export const logoutReducers = {
    LOG_OUT(state: State, action: PayloadAction<T.HistoryPayload>) {},
    LOG_OUT_START(state: State) {
        state.isLoggingOut = true
    },
    LOG_OUT_SUCCESS() {
        return initialState
    },
    LOG_OUT_FAILURE(state: State, action: PayloadAction<string>) {
        state.isLoggingOut = false
        state.authError = {
            title: 'Log out error',
            message: action.payload,
        }
    },
}