import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDeserializer } from 'src/serializers'
import * as T from './authTypes'
import { User } from 'src/globalTypes'
import { CLEAR_APP_STATE } from '../appSlices/appSlice'

const initialState: T.AuthState = {
    user: null,
    isInitialized: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isSigningUp: false,
}

export const GET_USER = createAction<T.GetUserDetails>('AUTH/GET_USER')
export const LOG_IN = createAction<T.LoginDetails>('AUTH/LOG_IN')
export const LOG_OUT = createAction<T.HistoryPayload>('AUTH/LOG_OUT')
export const SIGN_UP = createAction<T.SignUpDetails>('AUTH/SIGN_UP')

export const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        INITIALIZED(state) {
            state.isInitialized = true
        },
        GET_USER_SUCCESS(state, action: PayloadAction<User>) {
            state.isInitialized = true
            state.user = userDeserializer(action.payload)
        },
        GET_USER_FAILURE(state) {
            state.isInitialized = true
        },
        LOG_IN_START(state) {
            state.isInitialized = true
            state.isLoggingIn = true
        },
        LOG_IN_SUCCESS(state, action: PayloadAction<User>) {
            state.user = userDeserializer(action.payload)
            state.isLoggingIn = false
        },
        LOG_IN_FAILURE(state) {
            state.isLoggingIn = false
        },
        SIGN_UP_START(state) {
            state.isInitialized = true
            state.isSigningUp = true
        },
        SIGN_UP_SUCCESS(state, action: PayloadAction<User>) {
            state.isSigningUp = false
            state.user = userDeserializer(action.payload)
        },
        SIGN_UP_FAILURE(state) {
            state.isSigningUp = false
        },
        LOG_OUT_START(state) {
            state.isLoggingOut = true
        },
        LOG_OUT_SUCCESS() {
            return initialState
        },
        LOG_OUT_FAILURE(state) {
            state.isLoggingOut = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    INITIALIZED, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
} = authSlice.actions