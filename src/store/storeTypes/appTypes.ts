import { Epic } from 'redux-observable'
import { RootState } from 'store/reducers/index'
//Global types
import { DeserializedUser } from 'src/globalTypes'
//Store types
import { AuthTypes } from './authTypes'
import { CataloguesTypes } from './cataloguesTypes'
import { SettingsTypes } from './settingsTypes'

export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'
export const APP_CLEAR_APP_STATE = 'APP/CLEAR_APP_STATE'

export  type EpicType = Epic<AppActionTypes, AppActionTypes, RootState> 

export interface AppState {
    screenHeight: number,
    user: DeserializedUser | null,
}

export interface ErrorData {
    [field: string]: string
}

interface changeScreenHeight {
    type: typeof SCREEN_HEIGHT_CHANGED,
    screenHeight: number,
}

interface clearAppState {
    type: typeof APP_CLEAR_APP_STATE,
    screenHeight: number,
}

export type AppTypes = changeScreenHeight | clearAppState

export type AppActionTypes = AppTypes | AuthTypes | CataloguesTypes | SettingsTypes