import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from 'store/storeTypes'
import { SCREEN_HEIGHT_CHANGED, AppActionTypes } from '../storeTypes'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const changeScreenHeight = (screenHeight: number): AppActionTypes => {
    return {
        type: SCREEN_HEIGHT_CHANGED,
        screenHeight,
    }
}