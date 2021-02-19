import { createSlice } from '@reduxjs/toolkit'
import * as T from './myAccountTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import { changePasswordReducers, editUsername } from './myAccountReducer'

const initialState: T.MyAccountState = {
    isEditingUsername: false,
    isSubmittingUsername: false,
    isEditingPassword: false,
    isSubmittingPassword: false,
}

export const myAccountSlice = createSlice({
    name: 'SETTINGS/MY_ACCOUNT',
    initialState,
    reducers: {
        ...editUsername,
        ...changePasswordReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const { 
    TOGGLE_USERNAME_EDIT, CHANGE_USERNAME, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    TOGGLE_PASSWORD_EDIT, CHANGE_PASSWORD, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,

} = myAccountSlice.actions