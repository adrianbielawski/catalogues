import { AppActionTypes, CATALOGUES_CREATE_CATALOGUE } from "store/storeTypes"
import { Observable, concat, of, from } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { RootState } from "store/reducers"
import { ActionsObservable, ofType, StateObservable } from "redux-observable"
import {
    createCatalogueStart, createCatalogueSuccess, createCatalogueFailure,
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
