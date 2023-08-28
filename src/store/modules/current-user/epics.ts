import { axiosInstance$ } from 'src/axiosInstance'
import { concat, of, type Observable } from 'rxjs'
import { catchError, filter, mergeMap, switchMap } from 'rxjs/operators'
import { type Action } from '@reduxjs/toolkit'
// Actions
import * as actions from 'store/modules/current-user/slice'
import * as usersActions from 'store/entities/users/slice'
import { typedCombineEpics } from 'store/utils'

export const getCurrentUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.GET_CURRENT_USER.match),
    switchMap((action) =>
      concat(
        axiosInstance$.get(`/users/${action.payload}/`).pipe(
          mergeMap((response) =>
            concat(
              of(usersActions.USER_ADDED(response.data)),
              of(actions.GET_CURRENT_USER_SUCCESS(response.data.id)),
            ),
          ),
          catchError((error) =>
            of(
              actions.GET_CURRENT_USER_FAILURE({
                title: error.response.status,
                message: error.response.statusText,
              }),
            ),
          ),
        ),
      ),
    ),
  )

export const currentUserEpics = typedCombineEpics(getCurrentUserEpic)
