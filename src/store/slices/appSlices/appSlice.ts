import { createAction, createSlice } from '@reduxjs/toolkit'
import * as T from './appTypes'

const initialState: T.AppState = {}

export const CLEAR_APP_STATE = createAction('CLEAR_APP_STATE')

export const appSlice = createSlice({
    name: 'APP',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})