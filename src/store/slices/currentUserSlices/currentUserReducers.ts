import { PayloadAction } from '@reduxjs/toolkit'
import { userDeserializer } from 'src/serializers'
import * as T from './currentUserTypes'
import { ErrorMessage, User } from 'src/globalTypes'

type State = T.CurrentUserState

export const getCurrentUserReducers = {
    GET_CURRENT_USER(state: State, action: PayloadAction<string>) {},
    GET_CURRENT_USER_SUCCESS(state: State, action: PayloadAction<User>) {
        state.user = userDeserializer(action.payload)
    },
    GET_CURRENT_USER_FAILURE(state: State, action: PayloadAction<ErrorMessage>) {
        state.currentUserError = {
            title: action.payload.title,
            message: action.payload.message,
        }
    },
}

export const currentUserReducers = {
    CLEAR_CURRENT_USER_MESSAGE(state: State) {
        state.currentUserError = {
            title: '',
            message: '',
        }
    },
}