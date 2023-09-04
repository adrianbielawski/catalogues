import { Action } from '@reduxjs/toolkit'
import { of, concat, Observable, from, defer, EMPTY } from 'rxjs'
import {
  catchError,
  filter,
  map,
  mergeMap,
  retry,
  switchMap,
} from 'rxjs/operators'
import { axiosInstance$ } from 'src/axiosInstance'
import mime from 'mime-types'
import { getErrorMessage } from 'src/utils'
import { retry$ } from 'store/storeObservables'
import * as actions from './slice'
import * as usersActions from 'store/entities/users/slice'
import { User } from 'src/globalTypes'
import { AuthResponse } from './types'
import { typedCombineEpics } from 'store/utils'

export const getUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.GET_USER.match),
    mergeMap((action) =>
      concat(
        axiosInstance$.get<User>('/user/').pipe(
          mergeMap((response) =>
            concat(
              of(usersActions.USER_ADDED(response.data)),
              of(actions.GET_USER_SUCCESS(response.data.id)),
              defer(() => {
                if (action.payload.location.pathname === '/') {
                  action.payload.navigate(
                    `/${response.data.username}/catalogues`,
                  )
                }
                return EMPTY
              }),
            ),
          ),
          catchError(() => {
            return of(actions.GET_USER_FAILURE())
          }),
        ),
      ),
    ),
  )

export const signUpEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.SIGN_UP.match),
    mergeMap((action) =>
      concat(
        of(actions.SIGN_UP_START()),
        axiosInstance$
          .post('/registration/', {
            email: action.payload.email,
            password1: action.payload.password,
            password2: action.payload.repeatedPassword,
            username: action.payload.userName,
          })
          .pipe(
            mergeMap(() => concat(of(actions.SIGN_UP_SUCCESS()))),
            catchError((error) =>
              of(actions.SIGN_UP_FAILURE(getErrorMessage(error))),
            ),
          ),
      ),
    ),
  )

export const logInEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.LOG_IN.match),
    mergeMap((action) =>
      concat(
        of(actions.LOG_IN_START()),
        axiosInstance$
          .post<AuthResponse>('/login/', {
            email: action.payload.email,
            password: action.payload.password,
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(usersActions.USER_ADDED(response.data.user)),
                of(actions.LOG_IN_SUCCESS(response.data.user.id)),
                defer(() => {
                  const { pathname } = action.payload.location.state
                    ?.referrer || {
                    pathname: `/${response.data.user.username}/catalogues`,
                  }

                  action.payload.navigate(pathname)
                  return EMPTY
                }),
              ),
            ),
            catchError((error) =>
              of(actions.LOG_IN_FAILURE(getErrorMessage(error))),
            ),
          ),
      ),
    ),
  )

export const logOutEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.LOG_OUT.match),
    mergeMap(() =>
      concat(
        of(actions.LOG_OUT_START()),
        axiosInstance$.post('/logout/').pipe(
          retry({ delay: (err) => retry$(err) }),
          map(() => actions.LOG_OUT_SUCCESS()),
          catchError((error) =>
            of(actions.LOG_OUT_FAILURE(getErrorMessage(error))),
          ),
        ),
      ),
    ),
  )

export const validateUsernameEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.VALIDATE_USERNAME.match),
    switchMap((action) =>
      concat(
        of(actions.VALIDATE_USERNAME_START()),
        axiosInstance$
          .post('/registration/validate-username/', {
            username: action.payload,
          })
          .pipe(
            map(() => actions.VALIDATE_USERNAME_SUCCESS()),
            catchError((error) =>
              of(actions.VALIDATE_USERNAME_FAILURE(getErrorMessage(error))),
            ),
          ),
      ),
    ),
  )

export const verifyEmailEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.VERIFY_EMAIL.match),
    mergeMap((action) =>
      axiosInstance$
        .post<AuthResponse>('/registration/verify-email/', {
          key: action.payload.key,
        })
        .pipe(
          mergeMap((response) =>
            concat(
              of(usersActions.USER_ADDED(response.data.user)),
              of(actions.VERIFY_EMAIL_SUCCESS(response.data.user.id)),
              defer(() => {
                action.payload.navigate(
                  `/${response.data.user.username}/catalogues`,
                )
                return EMPTY
              }),
            ),
          ),
          catchError((error) =>
            of(actions.VERIFY_EMAIL_FAILURE(error.response.data.key)),
          ),
        ),
    ),
  )

export const changeUsernameEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CHANGE_USERNAME.match),
    switchMap((action) =>
      concat(
        of(actions.CHANGE_USERNAME_START()),
        axiosInstance$
          .patch<User>('/user/', {
            username: action.payload.name,
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(usersActions.USER_UPDATED(response.data)),
                defer(() => {
                  const referrer = action.payload.location.state?.referrer

                  const pathname = `/${response.data.username}/settings/account/my-account`
                  referrer.params.username = response.data.username

                  action.payload.navigate(pathname, { state: { referrer } })
                  return EMPTY
                }),
                of(actions.CHANGE_USERNAME_SUCCESS(response.data)),
              ),
            ),
            catchError(() => of(actions.CHANGE_USERNAME_FAILURE())),
          ),
      ),
    ),
  )

export const changePasswordEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CHANGE_PASSWORD.match),
    switchMap((action) =>
      concat(
        of(actions.CHANGE_PASSWORD_START()),
        axiosInstance$
          .post('/password/change/', {
            new_password1: action.payload.password1,
            new_password2: action.payload.password2,
          })
          .pipe(
            map(() => actions.CHANGE_PASSWORD_SUCCESS()),
            catchError((err) =>
              of(actions.CHANGE_PASSWORD_FAILURE(getErrorMessage(err))),
            ),
          ),
      ),
    ),
  )

export const postUserImageEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.POST_USER_IMAGE.match),
    switchMap((action) =>
      concat(
        of(actions.POST_USER_IMAGE_START()),
        from(fetch(action.payload))
          .pipe(
            mergeMap(async (r) => await r.blob()),
            mergeMap((imageBlob) => {
              const data = new FormData()
              const extension = mime.extension(imageBlob.type)
              if (extension) {
                data.append('image', imageBlob, `image.${extension}`)
              }
              return axiosInstance$.patch('/user/', data)
            }),
          )
          .pipe(
            mergeMap((response) =>
              concat(
                of(usersActions.USER_UPDATED(response.data)),
                of(actions.POST_USER_IMAGE_SUCCESS(response.data)),
              ),
            ),
            catchError((err) =>
              of(actions.POST_USER_IMAGE_FAILURE(getErrorMessage(err))),
            ),
          ),
      ),
    ),
  )

export const authUserEpics = typedCombineEpics(
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
