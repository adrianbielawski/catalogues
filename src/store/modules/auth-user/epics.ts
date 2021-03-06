import { Action } from "@reduxjs/toolkit"
import { combineEpics } from "redux-observable"
import { of, concat, Observable, from, defer } from 'rxjs'
import { catchError, filter, map, mergeMap, retryWhen, switchMap } from 'rxjs/operators'
import { axiosInstance$ } from "src/axiosInstance"
import mime from 'mime-types'
import { getErrorMessage } from "src/utils"
import { retry$ } from "store/storeObservables"
import * as actions from "./slice"
import * as usersActions from "store/entities/users/slice"

export const getUserEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.GET_USER.match),
    mergeMap(action => concat(
        axiosInstance$.get('/user/').pipe(
            mergeMap(response => concat(
                of(usersActions.USER_ADDED(response.data)),
                of(actions.GET_USER_SUCCESS(response.data.id)),
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
                of(usersActions.USER_ADDED(response.data.user)),
                of(actions.LOG_IN_SUCCESS(response.data.user.id)),
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

export const logOutEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.LOG_OUT.match),
    mergeMap(() => concat(
        of(actions.LOG_OUT_START()),
        axiosInstance$.post('/logout/').pipe(
            retryWhen(err => retry$(err)),
            mergeMap(() => concat(
                of(actions.LOG_OUT_SUCCESS()),
                defer(() => {
                    localStorage.removeItem('token')
                })
            )),
            catchError(error => of(actions.LOG_OUT_FAILURE(getErrorMessage(error))))
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
                of(usersActions.USER_ADDED(response.data.user)),
                of(actions.VERIFY_EMAIL_SUCCESS(response.data.user.id)),
                defer(() => {
                    action.payload.history.push(`/${response.data.user.username}/catalogues`)
                }),
            )),
            catchError(error => of(actions.VERIFY_EMAIL_FAILURE(error.response.data.key)))
        )
    )
)

export const changeUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_USERNAME.match),
    switchMap(action => concat(
        of(actions.CHANGE_USERNAME_START()),
        axiosInstance$.patch('/user/', {
            username: action.payload.name
        }).pipe(
            mergeMap(response => concat(
                of(usersActions.USER_UPDATED(response.data)),
                defer(() => {
                    const referrer = action.payload.location.state?.referrer

                    const pathname = `/${response.data.username}/settings/account/my-account`
                    referrer.params.username = response.data.username

                    action.payload.history.push(pathname, { referrer })
                }),
                of(actions.CHANGE_USERNAME_SUCCESS(response.data)),
            )),
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
            catchError(err => of(actions.CHANGE_PASSWORD_FAILURE(getErrorMessage(err))))
        )
    ))
)

export const postUserImageEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_USER_IMAGE.match),
    switchMap(action => concat(
        of(actions.POST_USER_IMAGE_START()),
        from(fetch(action.payload)).pipe(
            mergeMap(r => r.blob()),
            mergeMap(imageBlob => {
                const data = new FormData()
                data.append('image', imageBlob, `image.${mime.extension(imageBlob.type)}`)
                return axiosInstance$.patch('/user/', data)
            })
        ).pipe(
            mergeMap(response => concat(
                of(usersActions.USER_UPDATED(response.data)),
                of(actions.POST_USER_IMAGE_SUCCESS(response.data)),
            )),
            catchError(err => of(actions.POST_USER_IMAGE_FAILURE(getErrorMessage(err))))
        )
    )
    )
)

export const authUserEpics = combineEpics(
    getUserEpic,
    signUpEpic,
    logInEpic,
    logOutEpic,
    validateUsernameEpic,
    verifyEmailEpic,
    changeUsernameEpic,
    changePasswordEpic,
    postUserImageEpic,
)