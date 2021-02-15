import { combineEpics } from "redux-observable"
import { Observable } from 'rxjs'
import { filter, mapTo } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Slices
import { LOG_OUT_SUCCESS } from "store/slices/authSlices/authSlices"
import { CLEAR_APP_STATE } from "store/slices/appSlices/appSlice"

export const clearAppStateEpic = (action$: Observable<Action>) => action$.pipe(
    filter(LOG_OUT_SUCCESS.match),
    mapTo(CLEAR_APP_STATE())
)

export const appEpics = combineEpics(
    clearAppStateEpic,
)