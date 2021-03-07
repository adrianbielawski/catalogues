import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, Observable } from 'rxjs'
import { catchError, filter, map, mergeMap, retryWhen, switchMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
//Utils
import { getErrorMessage } from 'src/utils'
//Store observables
import { retry$ } from "store/storeObservables"
//Slices
import * as actions from "store/slices/authSlices/authSlices"

export const getUserEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.GET_USER.match),
    mergeMap(action => concat(
        axiosInstance$.get('/user/').pipe(
            mergeMap(response => concat(
                of(actions.GET_USER_SUCCESS(response.data)),
                defer(() => {
                    if (action.payload.location.pathname === '/') {
                        action.payload.history.push(`/${response.data.username}/catalogues`)
                    }
                })
            )),
            catchError(() => {
                localStorage.removeItem('token')
                return of(actions.GET_USER_FAILURE())
            })
        )
    ))
)

export const checkUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHECK_USER_AVAILABILITY.match),
    switchMap(action => concat(
        of(actions.CHECK_USER_AVAILABILITY_START()),
        axiosInstance$.post('/registration/validate-username/', {
            username: action.payload,
        }).pipe(
            map(() => actions.CHECK_USER_AVAILABILITY_SUCCESS()),
            catchError(error => of(actions.CHECK_USER_AVAILABILITY_FAILURE(getErrorMessage(error))))
        )
    ))
)

export const signUpEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.SIGN_UP.match),
    mergeMap(action => concat(
        of(actions.SIGN_UP_START()),
        axiosInstance$.post('/registration/', {
            email: action.payload.email,
            password1: action.payload.password,
            password2: action.payload.repeatedPassword,
            username: action.payload.userName,
        }).pipe(
            mergeMap(response => concat(
                of(actions.SIGN_UP_SUCCESS(response.data.user)),
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                    action.payload.history.push(`/${response.data.user.username}/catalogues`)
                })
            )),
            catchError(error => {
                const message = getErrorMessage(error)
                return of(actions.SIGN_UP_FAILURE(message))
            })
        )
    ))
)

export const logInEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.LOG_IN.match),
    mergeMap(action => concat(
        of(actions.LOG_IN_START()),
        axiosInstance$.post('/login/', {
            email: action.payload.email,
            password: action.payload.password,
        }).pipe(
            mergeMap(response => concat(
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                }),
                of(actions.LOG_IN_SUCCESS(response.data.user)),
                defer(() => {
                    const { pathname } = action.payload.location.state?.referrer || {
                        pathname: `/${response.data.user.username}/catalogues`
                    }

                    action.payload.history.push(pathname)
                }),
            )),
            catchError(error => {
                const message = getErrorMessage(error)
                return of(actions.LOG_IN_FAILURE(message))
            })
        )
    ))
)

export const logOutEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.LOG_OUT.match),
    mergeMap(action => concat(
        of(actions.LOG_OUT_START()),
        axiosInstance$.post('/logout/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(() => concat(
                of(actions.LOG_OUT_SUCCESS()),
                defer(() => {
                    localStorage.removeItem('token')
                    action.payload.history.push('/')
                })
            )),
            catchError(error => {
                const message = getErrorMessage(error)
                return of(actions.LOG_OUT_FAILURE(message))
            })
        )
    ))
)

export const authEpics = combineEpics(
    getUserEpic,
    checkUsernameEpic,
    signUpEpic,
    logInEpic,
    logOutEpic,
)