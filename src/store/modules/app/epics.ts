import { ofType } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import { Action } from '@reduxjs/toolkit'
import { axiosInstance$ } from 'src/axiosInstance'
import * as actions from './slice'
import { LOG_OUT_SUCCESS } from 'store/modules/auth-user/slice'
import { typedCombineEpics } from 'store/utils'

export const fetchSwitchesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(actions.FETCH_SWITCHES),
    switchMap(() =>
      concat(
        of(actions.FETCH_SWITCHES_START()),
        axiosInstance$.get('/switches/').pipe(
          mergeMap((response) =>
            of(actions.FETCH_SWITCHES_SUCCESS(response.data)),
          ),
          catchError(() => of(actions.FETCH_SWITCHES_FAILURE())),
        ),
      ),
    ),
  )

export const clearAppStateEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(LOG_OUT_SUCCESS),
    map(() => actions.CLEAR_APP_STATE()),
  )

export const appEpics = typedCombineEpics(fetchSwitchesEpic, clearAppStateEpic)
