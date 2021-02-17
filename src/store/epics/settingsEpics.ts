import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { of, concat, Observable } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import * as actions from "store/slices/settingsSlices/myAccountSlice/myAccountSlice"

export const changeUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_USERNAME.match),
    switchMap(action => concat(
        of(actions.CHANGE_USERNAME_START()),
        axiosInstance$.patch('/user/', {
            username: action.payload
        }).pipe(
            map(response => actions.CHANGE_USERNAME_SUCCESS(response.data)),
            catchError(() => of(actions.CHANGE_USERNAME_FAILURE()))
        )
    ))
)

export const changePasswordEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_PASSWORD.match),
    switchMap(action => concat(
        of(actions.CHANGE_PASSWORD_START()),
        axiosInstance$.post('/password/change/', {
            new_password1: action.payload.password1,
            new_password2: action.payload.password2
        }).pipe(
            map(() => actions.CHANGE_PASSWORD_SUCCESS()),
            catchError(() => of(actions.CHANGE_PASSWORD_FAILURE()))
        )
    ))
)

export const settingsEpics = combineEpics(
    changeUsernameEpic,
    changePasswordEpic,
)