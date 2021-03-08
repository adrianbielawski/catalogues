import { createSlice } from '@reduxjs/toolkit'
import * as T from './myAccountTypes'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import * as reducers from './myAccountReducer'

const initialState: T.MyAccountState = {
    isEditingUsername: false,
    isSubmittingUsername: false,
    isEditingPassword: false,
    isSubmittingPassword: false,
    myAccountError: {
        title: '',
        message: '',
    }
}

export const myAccountSlice = createSlice({
    name: 'SETTINGS/MY_ACCOUNT',
    initialState,
    reducers: {
        ...reducers.myAccountReducers,
        ...reducers.editUsername,
        ...reducers.changePasswordReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CLEAR_MY_ACCOUNT_ERROR,
    TOGGLE_USERNAME_EDIT, CHANGE_USERNAME, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    TOGGLE_PASSWORD_EDIT, CHANGE_PASSWORD, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,

} = myAccountSlice.actions