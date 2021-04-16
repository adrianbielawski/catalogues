import { PayloadAction } from '@reduxjs/toolkit'
import * as T from './types'
import { ErrorMessage } from 'src/globalTypes'

type State = T.CurrentUserState

export const currentUser = {
    CLEAR_CURRENT_USER_ERROR(state: State) {
        state.currentUserError = null
    },
}

export const getCurrentUser = {
    GET_CURRENT_USER(state: State, action: PayloadAction<string>) { },
    GET_CURRENT_USER_SUCCESS(state: State, action: PayloadAction<number>) {
        state.userId = action.payload
    },
    GET_CURRENT_USER_FAILURE(state: State, action: PayloadAction<ErrorMessage>) {
        state.currentUserError = {
            title: action.payload.title,
            message: action.payload.message,
        }
    },
}