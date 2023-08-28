import { AnyAction } from 'redux'
import { Epic, combineEpics } from 'redux-observable'
import { RootState } from './storeConfig'

export const typedCombineEpics = (
  ...epics: Array<Epic<AnyAction, AnyAction, RootState, any>>
) => combineEpics(...epics)
