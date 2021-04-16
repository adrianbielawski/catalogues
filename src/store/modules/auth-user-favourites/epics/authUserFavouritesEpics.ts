import { combineEpics } from "redux-observable"
import { concat, of, Observable } from 'rxjs'
import { catchError, mergeMap, switchMap, filter} from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Types
import { Catalogue } from "src/globalTypes"
//Actions
import * as actions from "../slice"
import * as cataloguesEntitiesActions from "store/entities/catalogues/slice"
import * as usersActions from "store/entities/users/slice"

export const fetchFavCataloguesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_CATALOGUES.match),
    switchMap(() => concat(
        of(actions.FETCH_FAVOURITE_CATALOGUES_START()),
        axiosInstance$.get(`/catalogues/favourites/`).pipe(
            mergeMap(response => concat(
                of(usersActions.USERS_ADDED(response.data.map((c: Catalogue) => c.created_by))),
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