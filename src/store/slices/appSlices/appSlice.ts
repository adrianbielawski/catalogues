import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './appTypes'

const initialState: AppState = {
    screenHeight: window.innerHeight,
}

export const CLEAR_APP_STATE = createAction('CLEAR_APP_STATE')

export const appSlice = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        CHANGE_SCREEN_HEIGHT(state, action: PayloadAction<number>) {
            state.screenHeight = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const { CHANGE_SCREEN_HEIGHT } = appSlice.actions