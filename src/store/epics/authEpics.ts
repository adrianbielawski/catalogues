import { combineEpics } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, Observable } from 'rxjs'
import { catchError, filter, map, mergeMap, pluck, retryWhen, switchMap, withLatestFrom } from 'rxjs/operators'
//Types
import { Action } from "@reduxjs/toolkit"
import { RootState } from "store/storeConfig"
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

export const validateUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.VALIDATE_USERNAME.match),
    switchMap(action => concat(
        of(actions.VALIDATE_USERNAME_START()),
        axiosInstance$.post('/registration/validate-username/', {
            username: action.payload,
        }).pipe(
            map(() => actions.VALIDATE_USERNAME_SUCCESS()),
            catchError(error => of(actions.VALIDATE_USERNAME_FAILURE(getErrorMessage(error))))
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
            mergeMap(() => concat(
                of(actions.SIGN_UP_SUCCESS()),
            )),
            catchError(error => of(actions.SIGN_UP_FAILURE(getErrorMessage(error))))
        )
    ))
)

export const verifyEmailEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.VERIFY_EMAIL.match),
    mergeMap(action =>
        axiosInstance$.post('/registration/verify-email/', {
            key: action.payload.key,
        }).pipe(
            mergeMap(response => concat(
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                }),
                of(actions.VERIFY_EMAIL_SUCCESS(response.data.user)),
                defer(() => {
                    action.payload.history.push(`/${response.data.user.username}/catalogues`)
                }),
            )),
            catchError(error => of(actions.VERIFY_EMAIL_FAILURE(error.response.data.key)))
        )
    )
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
            catchError(error => of(actions.LOG_IN_FAILURE(getErrorMessage(error))))
        )
    ))
)

export const logOutEpic = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) => action$.pipe(
    filter(actions.LOG_OUT.match),
    mergeMap(action => concat(
        of(actions.LOG_OUT_START()),
        axiosInstance$.post('/logout/').pipe(
            retryWhen(err => retry$(err)),
            withLatestFrom(state$.pipe(pluck('currentUser', 'user', 'username'))),
            mergeMap(([_, username]) => concat(
                of(actions.LOG_OUT_SUCCESS()),
                defer(() => {
                    localStorage.removeItem('token')
                    action.payload.history.push(`/${username || ''}`)
                })
            )),
            catchError(error => of(actions.LOG_OUT_FAILURE(getErrorMessage(error))))
        )
    ))
)

export const authEpics = combineEpics(
    getUserEpic,
    validateUsernameEpic,
    signUpEpic,
    verifyEmailEpic,
    logInEpic,
    logOutEpic,
)