import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

export const initialState: T.AuthUserState = {
    id: null,
    isEditingUsername: false,
    isSubmittingUsername: false,
    isEditingPassword: false,
    isSubmittingPassword: false,
    isPostingUserImage: false,
    isInitialized: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingUsername: false,
    isSigningUp: false,
    invalidUsernameMessage: '',
    signUpMessage: null,
    verifyEmailError: '',
    authUserError: null,
}

export const authUserSlice = createSlice({
    name: 'AUTH_USER_ACCOUNT',
    initialState,
    reducers: {
        ...reducers.authUser,
        ...reducers.initialize,
        ...reducers.signup,
        ...reducers.login,
        ...reducers.logout,
        ...reducers.validateUsername,
        ...reducers.verifyEmail,
        ...reducers.authUser,
        ...reducers.changeUsername,
        ...reducers.changePassword,
        ...reducers.postUserImage,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => {
            let clearedState = { ...initialState }
            clearedState.isInitialized = true
            return clearedState
        })
    },
})

export const {
    CLEAR_AUTH_USER_ERROR,
    INITIALIZED, GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE,
    SIGN_UP, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CLEAR_SIGNUP_MESSAGE,
    LOG_IN, LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT, LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    VALIDATE_USERNAME, VALIDATE_USERNAME_START, VALIDATE_USERNAME_SUCCESS, VALIDATE_USERNAME_FAILURE,
    VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE, CLEAR_VERIFY_EMAIL_ERROR,
    TOGGLE_USERNAME_EDIT, CHANGE_USERNAME, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    TOGGLE_PASSWORD_EDIT, CHANGE_PASSWORD, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
    POST_USER_IMAGE, POST_USER_IMAGE_START, POST_USER_IMAGE_SUCCESS, POST_USER_IMAGE_FAILURE,

} = authUserSlice.actions