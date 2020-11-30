import { SCREEN_HEIGHT_CHANGED, AppActionTypes } from '../storeTypes'

export const changeScreenHeight = (screenHeight: number): AppActionTypes => {
    return {
        type: SCREEN_HEIGHT_CHANGED,
        screenHeight,
    }
}