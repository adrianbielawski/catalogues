import { createSlice } from '@reduxjs/toolkit'
import { CurrentUserState } from './currentUserTypes'
import * as reducers from './currentUserReducers'
import { CLEAR_APP_STATE } from '../appSlices/appSlice'
import { LOG_IN } from '../authSlices/authSlices'

export const initialState: CurrentUserState = {
    user: null,
    currentUserError: {
        title: '',
        message: '',
    },
}

export const currentUserSlice = createSlice({
    name: 'CURRENT_USER',
    initialState,
    reducers: {
        ...reducers.currentUserReducers,
        ...reducers.getCurrentUserReducers,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
        builder.addCase(LOG_IN, () => initialState)
    },
})

export const {
    CLEAR_CURRENT_USER_MESSAGE,
    GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE,
} = currentUserSlice.actions