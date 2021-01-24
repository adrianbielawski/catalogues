import {
    SCREEN_HEIGHT_CHANGED, APP_CLEAR_APP_STATE,
    AppActionTypes,
} from 'store/storeTypes/appTypes'

export const changeScreenHeight = (screenHeight: number): AppActionTypes => {
    return {
        type: SCREEN_HEIGHT_CHANGED,
        screenHeight,
    }
}

export const clearAppState = () => {
    return {
        type: APP_CLEAR_APP_STATE,
    }
}