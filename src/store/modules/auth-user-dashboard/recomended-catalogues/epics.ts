import { combineEpics } from "redux-observable"
import { concat, of, Observable } from 'rxjs'
import { catchError, switchMap, filter, mergeMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Actions
import * as actions from "./slice"
import * as usersActions from "store/entities/users/slice"
import * as cataloguesEntitiesActions from "store/entities/catalogues/slice"
import { Catalogue, User } from "src/globalTypes"

export const fetchRecommendedCataloguesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_RECOMMENDED_CATALOGUES.match),
    switchMap((action) => concat(
        of(actions.FETCH_RECOMMENDED_CATALOGUES_START()),
        axiosInstance$.get('/catalogues/recommended/', {
            params: {
                page: action.payload.page,
                salt: action.payload.salt,
            }
        }).pipe(
            mergeMap(response => {
                const users = (response.data.results as Catalogue[]).map(c => c.created_by as User)
                return concat(
                    of(usersActions.USERS_ADDED(users)),
                    of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response.data.results)),
                    of(actions.FETCH_RECOMMENDED_CATALOGUES_SUCCESS(response.data)),
                )
            }),
            catchError(() => of(actions.FETCH_RECOMMENDED_CATALOGUES_FAILURE()))
        )
    ))
)

export const recomendedCataloguesEpics = combineEpics(
    fetchRecommendedCataloguesEpic,
)