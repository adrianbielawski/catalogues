import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { of, concat, Observable, from } from 'rxjs'
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators'
import mime from 'mime-types'
import * as actions from "store/slices/settingsSlices/myAccountSlice/myAccountSlice"
import { getErrorMessage } from "src/utils"

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
            map(response => actions.POST_USER_IMAGE_SUCCESS(response.data)),
            catchError(err => of(actions.POST_USER_IMAGE_FAILURE(getErrorMessage(err))))
        )
    )
    )
)

export const settingsEpics = combineEpics(
    changeUsernameEpic,
    changePasswordEpic,
    postUserImageEpic,
)