import { type PayloadAction } from '@reduxjs/toolkit'
import { type User } from 'src/globalTypes'
import { initialState } from './slice'
import type * as T from './types'

const networkError = {
  title: 'Network error',
  message: 'Something went wrong. Plaese try again.',
}

type State = T.AuthUserState

export const authUser = {
  CLEAR_AUTH_USER_ERROR(state: State) {
    state.authUserError = null
  },
}

export const initialize = {
  INITIALIZED(state: State) {
    state.isInitialized = true
  },
  GET_USER(state: State, action: PayloadAction<T.HistoryAndLocationPayload>) {},
  GET_USER_SUCCESS(state: State, action: PayloadAction<number>) {
    state.id = action.payload
    state.isInitialized = true
  },
  GET_USER_FAILURE(state: State) {
    state.isInitialized = true
  },
}

export const signup = {
  SIGN_UP(state: State, action: PayloadAction<T.SignUpPayload>) {},
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
    state.authUserError = {
      title: 'Sign up error',
      message: action.payload,
    }
  },
  CLEAR_SIGNUP_MESSAGE(state: State) {
    state.signUpMessage = null
  },
}

export const login = {
  LOG_IN(state: State, action: PayloadAction<T.LoginPayload>) {},
  LOG_IN_START(state: State) {
    state.isInitialized = true
    state.isLoggingIn = true
  },
  LOG_IN_SUCCESS(state: State, action: PayloadAction<number>) {
    state.id = action.payload
    state.isLoggingIn = false
  },
  LOG_IN_FAILURE(state: State, action: PayloadAction<string>) {
    state.isLoggingIn = false
    state.authUserError = {
      title: 'Log in error',
      message: action.payload,
    }
  },
}

export const logout = {
  LOG_OUT(state: State) {},
  LOG_OUT_START(state: State) {
    state.isLoggingOut = true
  },
  LOG_OUT_SUCCESS() {
    return initialState
  },
  LOG_OUT_FAILURE(state: State, action: PayloadAction<string>) {
    state.isLoggingOut = false
    state.authUserError = {
      title: 'Log out error',
      message: action.payload,
    }
  },
}

export const validateUsername = {
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

export const verifyEmail = {
  VERIFY_EMAIL(state: State, action: PayloadAction<T.VerifyEmailPayload>) {},
  VERIFY_EMAIL_SUCCESS(state: State, action: PayloadAction<number>) {
    state.id = action.payload
  },
  VERIFY_EMAIL_FAILURE(state: State, action: PayloadAction<string>) {
    state.verifyEmailError = action.payload
  },
  CLEAR_VERIFY_EMAIL_ERROR(state: State) {
    state.verifyEmailError = ''
  },
}

export const changeUsername = {
  CHANGE_USERNAME(
    state: State,
    action: PayloadAction<T.ChangeUsernamePayload>,
  ) {},
  TOGGLE_USERNAME_EDIT(state: State, action: PayloadAction<boolean>) {
    state.isEditingUsername = action.payload
  },
  CHANGE_USERNAME_START(state: State) {
    state.isSubmittingUsername = true
  },
  CHANGE_USERNAME_SUCCESS(state: State, action: PayloadAction<User>) {
    state.isSubmittingUsername = false
    state.isEditingUsername = false
  },
  CHANGE_USERNAME_FAILURE(state: State) {
    state.isSubmittingUsername = false
    state.isEditingUsername = false
  },
}

export const changePassword = {
  CHANGE_PASSWORD(
    state: State,
    action: PayloadAction<T.ChangePasswordPayload>,
  ) {},
  TOGGLE_PASSWORD_EDIT(state: State, action: PayloadAction<boolean>) {
    state.isEditingPassword = action.payload
  },
  CHANGE_PASSWORD_START(state: State) {
    state.isSubmittingPassword = true
  },
  CHANGE_PASSWORD_SUCCESS(state: State) {
    state.isSubmittingPassword = false
    state.isEditingPassword = false
  },
  CHANGE_PASSWORD_FAILURE(state: State, action: PayloadAction<string>) {
    state.isSubmittingPassword = false
    state.authUserError = networkError
  },
}

export const postUserImage = {
  POST_USER_IMAGE(state: State, action: PayloadAction<string>) {},
  POST_USER_IMAGE_START(state: State) {
    state.isPostingUserImage = true
  },
  POST_USER_IMAGE_SUCCESS(state: State, action: PayloadAction<User>) {
    state.isPostingUserImage = false
  },
  POST_USER_IMAGE_FAILURE(state: State, action: PayloadAction<string>) {
    state.isPostingUserImage = false
    state.authUserError = networkError
  },
}
