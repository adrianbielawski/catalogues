import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './authTypes'
import { User } from 'src/globalTypes'
import { CLEAR_APP_STATE } from '../appSlices/appSlice'
import { CHANGE_USERNAME_SUCCESS } from '../settingsSlices/myAccountSlice/myAccountSlice'
import * as reducers from './authReducers'

export const initialState: AuthState = {
    user: null,
    isInitialized: false,
    isLoggingIn: false,
    loginError: '',
    isLoggingOut: false,
    logOutError: '',
    isCheckingUsername: false,
    invalidUsernameMessage: '',
    isSigningUp: false,
    signUpError: '',
}

export const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        ...reducers.initializeReducers,
        ...reducers.loginReducers,
        ...reducers.validateUsernameReducer,
        ...reducers.signupReducers,
        ...reducers.logoutReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
        builder.addCase(CHANGE_USERNAME_SUCCESS, (state, action: PayloadAction<User>) => {
            state.user!.username = action.payload.username
        })
    },
})

export const {
    INITIALIZED, GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOG_IN, LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILURE, CLEAR_LOGIN_ERROR,
    VALIDATE_USERNAME, VALIDATE_USERNAME_START, VALIDATE_USERNAME_SUCCESS, VALIDATE_USERNAME_FAILURE,
    SIGN_UP, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CLEAR_SIGNUP_ERROR,
    LOG_OUT, LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, CLEAR_LOGOUT_ERROR,
} = authSlice.actions