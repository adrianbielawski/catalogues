import { combineEpics } from "redux-observable"
import { concat, of, Observable } from 'rxjs'
import { catchError, switchMap, filter, mergeMap } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Actions
import * as actions from "./slice"
import * as cataloguesEntitiesActions from "store/entities/catalogues/slice"

export const fetchRecomendedCataloguesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_RECOMENDED_CATALOGUES.match),
    switchMap((action) => concat(
        of(actions.FETCH_RECOMENDED_CATALOGUES_START()),
        axiosInstance$.get('/catalogues/recomended', {
            params: {
                page: action.payload,
            }
        }).pipe(
            mergeMap(response => concat(
                of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response.data)),
                of(actions.FETCH_RECOMENDED_CATALOGUES_SUCCESS(response.data)),
            )),
            catchError(() => of(actions.FETCH_RECOMENDED_CATALOGUES_FAILURE()))
        )
    ))
)

export const recomendedCataloguesEpics = combineEpics(
    fetchRecomendedCataloguesEpic,
)