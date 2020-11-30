import { ThunkAction as BaseThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from 'store/reducers/index'
export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'

export type ThunkAction<ReturnType = void> = BaseThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export interface AppState {
    screenHeight: number,
}

interface changeScreenHeight {
    type: typeof SCREEN_HEIGHT_CHANGED,
    screenHeight: number,
}

export type AppActionTypes = changeScreenHeight