import { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/globalTypes'
import * as T from './myAccountTypes'

type State = T.MyAccountState

export const editUsername = {
    CHANGE_USERNAME(state: State, action: PayloadAction<string>) {},
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

export const changePasswordReducers = {
    CHANGE_PASSWORD(state: State, action: PayloadAction<T.ChangePasswordPayload>) {},
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
    CHANGE_PASSWORD_FAILURE(state: State) {
        state.isSubmittingPassword = false
        state.isEditingPassword = false
    }
}