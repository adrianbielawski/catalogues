import {
    MANAGE_CATALOGUES_CREATE_CATALOGUE, MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
    CATALOGUES_FETCH_CATALOGUES,
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    AppActionTypes
} from "store/storeTypes"
import { Observable, concat, of, from } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { RootState } from "store/reducers"
import { ActionsObservable, ofType, StateObservable } from "redux-observable"
import {
    fetchCataloguesStart, fetchCataloguesSuccess, fetchCatalogueFailure,
} from "store/actions/cataloguesActions"
import {
    createCatalogueStart, createCatalogueSuccess, createCatalogueFailure,
} from "store/actions/settingsActions"

export const createCatalogueEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<any> => action$.pipe(
    ofType(MANAGE_CATALOGUES_CREATE_CATALOGUE),
    switchMap(() => concat(
        of(createCatalogueStart()),
        from(axiosInstance.post('/catalogues/', {
            name: 'New catalogue'
        })).pipe(
            mergeMap(() => of(createCatalogueSuccess())),
            catchError(err => of(createCatalogueFailure()))
        )
    ))
)

export const fetchCataloguesEpic = (
    action$: ActionsObservable<AppActionTypes>,
    state$: StateObservable<RootState>
): Observable<any> => action$.pipe(
    ofType(
        CATALOGUES_FETCH_CATALOGUES,
        MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
        MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    ),
    withLatestFrom(state$.pipe(pluck('app', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(fetchCataloguesStart()),
        from(axiosInstance.get('/catalogues/', {
            params: { created_by: id }
        })).pipe(
            mergeMap(response => of(fetchCataloguesSuccess(response.data))),
            catchError(err => of(fetchCatalogueFailure()))
        )
    ))
)