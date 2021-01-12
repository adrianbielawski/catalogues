import { AppActionTypes, CATALOGUES_CREATE_CATALOGUE, CATALOGUES_CREATE_CATALOGUE_SUCCESS,
    CATALOGUES_FETCH_CATALOGUES,    
} from "store/storeTypes"
import { Observable, concat, of, from } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { RootState } from "store/reducers"
import { ActionsObservable, ofType, StateObservable } from "redux-observable"
import {
    createCatalogueStart, createCatalogueSuccess, createCatalogueFailure,
    fetchCataloguesStart, fetchCataloguesSuccess, fetchCatalogueFailure,
} from "store/actions/cataloguesActions"

export const createCatalogueEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<any> => action$.pipe(
    ofType(CATALOGUES_CREATE_CATALOGUE),
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
    ofType(CATALOGUES_FETCH_CATALOGUES, CATALOGUES_CREATE_CATALOGUE_SUCCESS),
    withLatestFrom(state$.pipe(pluck('app', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(fetchCataloguesStart()),
        from(axiosInstance.get('/catalogues/', {
            params: { created_by: id }
        })).pipe(
            mergeMap(response => of(fetchCataloguesSuccess(response.data.results))),
            catchError(err => of(fetchCatalogueFailure()))
        )
    ))
)