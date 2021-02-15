import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, Observable } from 'rxjs'
import { catchError, filter, mergeMap, retryWhen } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Store observables
import { retry$ } from "store/storeObservables"
//Slices
import {
    GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOG_IN, LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT, LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
} from "store/slices/authSlices/authSlices"

export const getUserEpic = (action$: Observable<Action>) => action$.pipe(
    filter(GET_USER.match),
    mergeMap(action => concat(
        axiosInstance$.get('/user/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                of(GET_USER_SUCCESS(response.data)),
                defer(() => {
                    if (location.pathname === '/') {
                        action.payload.history.push(`/${response.data.id}/catalogues`)
                    }
                })
            )),
            catchError(() => of(GET_USER_FAILURE()))
        )
    ))
)

export const signUpEpic = (action$: Observable<Action>) => action$.pipe(
    filter(SIGN_UP.match),
    mergeMap(action => concat(
        of(SIGN_UP_START()),
        axiosInstance$.post('/registration/', {
            email: action.payload.email,
            password1: action.payload.password,
            password2: action.payload.repeatedPassword,
            username: action.payload.userName,
        }).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                of(SIGN_UP_SUCCESS(response.data.user)),
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                    action.payload.history.push(`/${response.data.user.id}/catalogues`)
                })
            )),
            catchError(() => of(SIGN_UP_FAILURE()))
        )
    ))
)

export const logInEpic = (action$: Observable<Action>) => action$.pipe(
    filter(LOG_IN.match),
    mergeMap(action => concat(
        of(LOG_IN_START()),
        axiosInstance$.post('/login/', {
            email: action.payload.email,
            password: action.payload.password,
        }).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                }),
                of(LOG_IN_SUCCESS(response.data.user)),
                defer(() => {
                    const { path } = action.payload.location.state?.referrer || {
                        path: `/${response.data.user.id}/catalogues`
                    }

                    action.payload.history.push(path)
                }),
            )),
            catchError(() => of(LOG_IN_FAILURE()))
        )
    ))
)

export const logOutEpic = (action$: Observable<Action>) => action$.pipe(
    filter(LOG_OUT.match),
    mergeMap(action => concat(
        of(LOG_OUT_START()),
        axiosInstance$.post('/logout/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(() => concat(
                of(LOG_OUT_SUCCESS()),
                defer(() => {
                    localStorage.removeItem('token')
                    action.payload.history.push('/')
                })
            )),
            catchError(() => of(LOG_OUT_FAILURE()))
        )
    ))
)

export const authEpics = combineEpics(
    getUserEpic,
    signUpEpic,
    logInEpic,
    logOutEpic,
)