import { Epic } from 'redux-observable'
import { RootState } from 'store/reducers/index'
//Store types
import { CataloguesTypes } from './cataloguesTypes'
import { SettingsTypes } from './settingsTypes'

export  type EpicType = Epic<AppActionTypes, AppActionTypes, RootState> 

export interface ErrorData {
    [field: string]: string
}

export type AppActionTypes = CataloguesTypes | SettingsTypes