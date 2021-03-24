import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, Observable } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Slices
import * as actions from "store/slices/currentUserSlices/currentUserSlice"

export const getCurrentUserEpic = (action$: Observable<Action>) => action$.pipe(
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