import { PayloadAction } from "@reduxjs/toolkit"
import * as T from './appTypes'

type State = T.AppState

export const changeScreenHeight = {
    CHANGE_SCREEN_HEIGHT(state: State, action: PayloadAction<number>) {
        state.screenHeight = action.payload
    },
}

export const fetchSwitches = {
    FETCH_SWITCHES(state: State) { },
    FETCH_SWITCHES_START(state: State) {
        state.fetchingSwitches = true
    },
    FETCH_SWITCHES_SUCCESS(state: State, action: PayloadAction<string[]>) {
        state.fetchingSwitches = false
        state.switches = action.payload
    },
    FETCH_SWITCHES_FAILURE(state: State) {
        state.fetchingSwitches = false
    },
}

export const clearAppState = {
    CLEAR_APP_STATE(state: State) { },
}