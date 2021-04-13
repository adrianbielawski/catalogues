import { combineEpics } from "redux-observable"
import { concat, of, Observable } from 'rxjs'
import { catchError, mergeMap, switchMap, filter} from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Actions
import * as actions from "../slice"
import * as cataloguesEntitiesActions from "store/entities/catalogues/slice"

export const fetchFavCataloguesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_CATALOGUES.match),
    switchMap(() => concat(
        of(actions.FETCH_FAVOURITE_CATALOGUES_START()),
        axiosInstance$.get(`/catalogues/favourites/`).pipe(
            mergeMap(response => concat(
                of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response.data)),
                of(actions.FETCH_FAVOURITE_CATALOGUES_SUCCESS(response.data)),
            )),
            catchError(() => of(actions.FETCH_FAVOURITE_CATALOGUES_FAILURE()))
        )
    ))
)

export const authUserFavouritesEpics = combineEpics(
    fetchFavCataloguesEpic,
)