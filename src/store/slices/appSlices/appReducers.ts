import { PayloadAction } from "@reduxjs/toolkit"
import * as T from './appTypes'

type State = T.AppState

export const changeScreenSize = {
    CHANGE_SCREEN_SIZE(state: State, action: PayloadAction<T.ChangeScreenSizePayload>) {
        state.screenHeight = action.payload.height
        state.screenWidth = {
            width: action.payload.width,
            smallViewport: action.payload.width <= 640,
            mediumViewport: action.payload.width <= 800 && action.payload.width > 640,
            largeViewport: action.payload.width > 800,
        }
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