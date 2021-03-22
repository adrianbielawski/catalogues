import { createSlice } from '@reduxjs/toolkit'
import * as T from './appTypes'
import * as reducers from './appReducers'

const initialState: T.AppState = {
    screenHeight: window.innerHeight,
    fetchingSwitches: true,
    switches: [],
}

export const appSlice = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        ...reducers.changeScreenHeight,
        ...reducers.fetchSwitches,
        ...reducers.clearAppState,
    },
})

export const {
    CHANGE_SCREEN_HEIGHT,
    FETCH_SWITCHES, FETCH_SWITCHES_START, FETCH_SWITCHES_SUCCESS, FETCH_SWITCHES_FAILURE,
    CLEAR_APP_STATE,
} = appSlice.actions