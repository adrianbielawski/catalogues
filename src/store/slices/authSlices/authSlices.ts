import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './authTypes'
import { User } from 'src/globalTypes'
import { CLEAR_APP_STATE } from '../appSlices/appSlice'
import { CHANGE_USERNAME_SUCCESS, POST_USER_IMAGE_SUCCESS } from '../settingsSlices/myAccountSlice/myAccountSlice'
import * as reducers from './authReducers'
import { userDeserializer } from 'src/serializers'

export const initialState: AuthState = {
    user: null,
    isInitialized: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingUsername: false,
    invalidUsernameMessage: '',
    isSigningUp: false,
    signUpMessage: {
        title: '',
        message: '',
    },
    authError: {
        title: '',
        message: '',
    },
}

export const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        ...reducers.authReducers,
        ...reducers.initializeReducers,
        ...reducers.loginReducers,
        ...reducers.validateUsernameReducer,
        ...reducers.signupReducers,
        ...reducers.logoutReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => {
            let clearedState = { ...initialState }
            clearedState.isInitialized = true
            return clearedState
        })
        builder.addCase(CHANGE_USERNAME_SUCCESS, (state, action: PayloadAction<User>) => {
            state.user!.username = action.payload.username
        })
        builder.addCase(POST_USER_IMAGE_SUCCESS, (state, action: PayloadAction<User>) => {
            state.user = userDeserializer(action.payload)
        })
    },
})

export const {
    CLEAR_AUTH_ERROR,
    INITIALIZED, GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOG_IN, LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    VALIDATE_USERNAME, VALIDATE_USERNAME_START, VALIDATE_USERNAME_SUCCESS, VALIDATE_USERNAME_FAILURE,
    SIGN_UP, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CLEAR_SIGNUP_MESSAGE,
    LOG_OUT, LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
} = authSlice.actions