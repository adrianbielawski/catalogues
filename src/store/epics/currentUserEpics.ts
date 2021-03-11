import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, Observable } from 'rxjs'
import { catchError, filter, map, mergeMap, pluck, withLatestFrom } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Slices
import * as actions from "store/slices/currentUserSlices/currentUserSlice"
import { RootState } from "store/storeConfig"

export const getCurrentUserEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
    filter(actions.GET_CURRENT_USER.match),
    mergeMap(action => concat(
        axiosInstance$.get(`/users/${action.payload}/`).pipe(
            map(response => actions.GET_CURRENT_USER_SUCCESS(response.data)),
            catchError(error => of(actions.GET_CURRENT_USER_FAILURE({
                title: error.response.status,
                message: error.response.statusText,
            })))
        )
    ))
)

export const currentUserEpics = combineEpics(
    getCurrentUserEpic,
)