import { combineEpics, ofType } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer } from 'rxjs'
import { catchError, mergeMap, retryWhen } from 'rxjs/operators'
//Store observables
import { retry$ } from "store/storeObservables"
//Store types
import { AppActionTypes, EpicType } from "store/storeTypes/appTypes"
import {
    GetUser, AUTH_GET_USER,
    LogIn, AUTH_LOG_IN,
    LogOut, AUTH_LOG_OUT,
    SignUp, AUTH_SIGN_UP,
} from 'store/storeTypes/authTypes'
//Store actions
import {
    getUserStart, getUserSuccess, getUserFailure,
    logInStart, logInSuccess, logInFailure,
    logOutFailure, logOutStart, logOutSuccess,
    signUpStart, signUpSuccess, signUpFailure,
} from 'store/actions/authActions'

export const getUserEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, GetUser>(AUTH_GET_USER),
    mergeMap(action => concat(
        of(getUserStart()),
        axiosInstance$.get('/user/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                of(getUserSuccess(response.data)),
                defer(() => {
                    if (location.pathname === '/') {
                        action.history.push(`/${response.data.id}/catalogues`)
                    }
                })
            )),
            catchError(() => of(getUserFailure()))
        )
    ))
)

export const signUpEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, SignUp>(AUTH_SIGN_UP),
    mergeMap(action => concat(
        of(signUpStart()),
        axiosInstance$.post('/registration/', {
            email: action.email,
            password1: action.password,
            password2: action.repeatedPassword,
            username: action.userName,
        }).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                of(signUpSuccess(response.data.user)),
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                    action.history.push(`/${response.data.user.id}/catalogues`)
                })
            )),
            catchError(() => of(signUpFailure()))
        )
    ))
)

export const logInEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, LogIn>(AUTH_LOG_IN),
    mergeMap(action => concat(
        of(logInStart()),
        axiosInstance$.post('/login/', {
            email: action.email,
            password: action.password,
        }).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                defer(() => {
                    localStorage.setItem('token', response.data.key)
                }),
                of(logInSuccess(response.data.user)),
                defer(() => {
                    const { path } = action.location.state?.referrer || {
                        path: `/${response.data.user.id}/catalogues`
                    }

                    action.history.push(path)
                }),
            )),
            catchError(() => of(logInFailure()))
        )
    ))
)

export const logOutEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, LogOut>(AUTH_LOG_OUT),
    mergeMap(action => concat(
        of(logOutStart()),
        axiosInstance$.post('/logout/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(() => concat(
                of(logOutSuccess()),
                defer(() => {
                    localStorage.removeItem('token')
                    action.history.push('/')
                })
            )),
            catchError(() => of(logOutFailure()))
        )
    ))
)

export const authEpics = combineEpics(
    getUserEpic,
    signUpEpic,
    logInEpic,
    logOutEpic,
)