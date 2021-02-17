import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/globalTypes'
import * as T from './myAccountTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'

const initialState: T.MyAccountState = {
    isEditingUsername: false,
    isSubmittingUsername: false,
    isEditingPassword: false,
    isSubmittingPassword: false,
}

export const CHANGE_USERNAME = createAction<string>('CHANGE_USERNAME')
export const CHANGE_PASSWORD = createAction<T.ChangePasswordPayload>('CHANGE_PASSWORD')

export const myAccountSlice = createSlice({
    name: 'SETTINGS/MY_ACCOUNT',
    initialState,
    reducers: {
        TOGGLE_USERNAME_EDIT(state, action: PayloadAction<boolean>) {
            state.isEditingUsername = action.payload
        },
        CHANGE_USERNAME_START(state) {
            state.isSubmittingUsername = true
        },
        CHANGE_USERNAME_SUCCESS(state, action: PayloadAction<User>) {
            state.isSubmittingUsername = false
            state.isEditingUsername = false
        },
        CHANGE_USERNAME_FAILURE(state) {
            state.isSubmittingUsername = false
            state.isEditingUsername = false
        },
        TOGGLE_PASSWORD_EDIT(state, action: PayloadAction<boolean>) {
            state.isEditingPassword = action.payload
        },
        CHANGE_PASSWORD_START(state) {
            state.isSubmittingPassword = true
        },
        CHANGE_PASSWORD_SUCCESS(state) {
            state.isSubmittingPassword = false
            state.isEditingPassword = false
        },
        CHANGE_PASSWORD_FAILURE(state) {
            state.isSubmittingPassword = false
            state.isEditingPassword = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const { 
    TOGGLE_USERNAME_EDIT, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    TOGGLE_PASSWORD_EDIT, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,

} = myAccountSlice.actions