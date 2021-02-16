import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { of, concat, Observable } from 'rxjs'
import { catchError, filter, mergeMap, switchMap } from 'rxjs/operators'
import {
    CHANGE_USERNAME, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    CHANGE_PASSWORD, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
} from "store/slices/settingsSlices/myAccountSlice/myAccountSlice"

export const changeUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CHANGE_USERNAME.match),
    switchMap(action => concat(
        of(CHANGE_USERNAME_START()),
        axiosInstance$.patch('/user/', {
            username: action.payload
        }).pipe(
            mergeMap((response) => of(
                CHANGE_USERNAME_SUCCESS(response.data)
            )),
            catchError(() => of(CHANGE_USERNAME_FAILURE()))
        )
    ))
)

export const changePasswordEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CHANGE_PASSWORD.match),
    switchMap(action => concat(
        of(CHANGE_PASSWORD_START()),
        axiosInstance$.post('/password/change/', {
            new_password1: action.payload.password1,
            new_password2: action.payload.password2
        }).pipe(
            mergeMap(() => of(CHANGE_PASSWORD_SUCCESS())),
            catchError(() => of(CHANGE_PASSWORD_FAILURE()))
        )
    ))
)

export const settingsEpics = combineEpics(
    changeUsernameEpic,
    changePasswordEpic,
)