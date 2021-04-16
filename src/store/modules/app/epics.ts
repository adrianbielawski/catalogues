import { combineEpics } from "redux-observable"
import { concat, Observable, of } from 'rxjs'
import { catchError, filter, mapTo, mergeMap, switchMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Actions
import * as actions from "./slice"
import { LOG_OUT_SUCCESS } from "store/modules/auth-user/slice"

export const fetchSwitchesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_SWITCHES.match),
    switchMap(() => concat(
        of(actions.FETCH_SWITCHES_START()),
        axiosInstance$.get('/switches/').pipe(
            mergeMap(response => of(actions.FETCH_SWITCHES_SUCCESS(response.data)),
            ),
            catchError(() => of(actions.FETCH_SWITCHES_FAILURE()))
        ))
    )
)

export const clearAppStateEpic = (action$: Observable<Action>) => action$.pipe(
    filter(LOG_OUT_SUCCESS.match),
    mapTo(actions.CLEAR_APP_STATE())
)

export const appEpics = combineEpics(
    fetchSwitchesEpic,
    clearAppStateEpic,
)