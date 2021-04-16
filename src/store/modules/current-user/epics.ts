import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, Observable } from 'rxjs'
import { catchError, filter, mergeMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Slices
import * as actions from "store/modules/current-user/slice"
import * as usersActions from "store/entities/users/slice"

export const getCurrentUserEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.GET_CURRENT_USER.match),
    mergeMap(action => concat(
        axiosInstance$.get(`/users/${action.payload}/`).pipe(
            mergeMap(response => concat(
                of(usersActions.USER_ADDED(response.data)),
                of(actions.GET_CURRENT_USER_SUCCESS(response.data.id))),
            ),
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