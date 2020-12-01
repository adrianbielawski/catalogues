import { ThunkAction } from 'store/storeTypes'
import { History } from 'history';
import {
    SCREEN_HEIGHT_CHANGED, APP_CLEAR_APP_STATE, APP_SHOW_SETTINGS,
    AppActionTypes,
} from '../storeTypes'

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

export const showSettings = (
    userId: number,
    history: History,
): ThunkAction => dispatch => {
    history.push(`/${userId}/settings`)
}