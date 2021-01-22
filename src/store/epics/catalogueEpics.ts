import {
    MANAGE_CATALOGUES_CREATE_CATALOGUE, MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
    CATALOGUES_FETCH_CATALOGUES,
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
    CATALOGUES_FETCH_ITEMS_FIELDS,
    CATALOGUES_FETCH_FIELDS_CHOICES,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
    CATALOGUES_FETCH_CATALOGUE_FIELD,
    CATALOGUES_REFRESH_FIELD,
    AppActionTypes, fetchItemsFields, fetchFieldsChoices, FetchCatalogueField, RefreshFieldEpic,
} from "store/storeTypes"
import { Observable, concat, of, from, throwError, defer, timer } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom, retryWhen, map } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { RootState } from "store/reducers"
import { ActionsObservable, Epic, ofType, StateObservable } from "redux-observable"
import {
    fetchCataloguesStart, fetchCataloguesSuccess, fetchCatalogueFailure,
    fetchItemsFieldsStart, fetchItemsFieldsSuccess, fetchItemsFieldsFailure,
    fetchFieldsChoicesStart, fetchFieldsChoicesSuccess, fetchFieldsChoicesFailure,
    fetchCatalogueField, fetchCatalogueFieldStart, fetchCatalogueFieldSuccess, fetchCatalogueFieldFailure,
} from "store/actions/cataloguesActions"
import {
    createCatalogueStart, createCatalogueSuccess, createCatalogueFailure,
} from "store/actions/settingsActions"

const retry$ = (err: Observable<any>, attempts: number = 2) => (
    err.pipe(mergeMap((_, i) => (
        i + 1 < attempts + 1
            ? timer((i + 1) * 500)
            : throwError(err)
    )))
)

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

export const fetchItemsFieldsEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<AppActionTypes> => action$.pipe(
    ofType(CATALOGUES_FETCH_ITEMS_FIELDS),
    map((action) => (action as fetchItemsFields).catalogueId),
    mergeMap((catalogueId) => concat(
        of(fetchItemsFieldsStart(catalogueId)),
        defer(() => axiosInstance.get('/fields/', {
            params: { catalogue_id: catalogueId }
        })).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(fetchItemsFieldsSuccess(
                    response.data,
                    catalogueId
                ))
            ),
            catchError(() => of(fetchItemsFieldsFailure(catalogueId)))
        )
    ))
)

export const fetchCatalogueFieldEpic: Epic<AppActionTypes> = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueField>(CATALOGUES_FETCH_CATALOGUE_FIELD),
    mergeMap(action => concat(
        of(fetchCatalogueFieldStart(action.fieldId, action.catalogueId)),
        defer(() => axiosInstance.get(`/fields/${action.fieldId}/`)).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(fetchCatalogueFieldSuccess(
                    response.data,
                    action.fieldId,
                    action.catalogueId,
                ))
            ),
            catchError(() => of(fetchCatalogueFieldFailure(action.fieldId, action.catalogueId)))
        )
    ))
)

export const refreshFieldEpic: Epic<AppActionTypes> = action$ => action$.pipe(
    ofType<AppActionTypes, RefreshFieldEpic>(
        MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
        CATALOGUES_REFRESH_FIELD
    ),
    mergeMap(action => of(fetchCatalogueField(action.fieldId, action.catalogueId)))
)

export const fetchFieldsChoicesEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<AppActionTypes> => action$.pipe(
    ofType(CATALOGUES_FETCH_FIELDS_CHOICES),
    map((action) => action as fetchFieldsChoices),
    mergeMap((action) => concat(
        of(fetchFieldsChoicesStart(action.fieldId, action.catalogueId)),
        from(axiosInstance.get('/choices/', {
            params: { field_id: action.fieldId }
        })).pipe(
            mergeMap(response =>
                of(fetchFieldsChoicesSuccess(action.fieldId, action.catalogueId, response.data))
            ),
            catchError(err => of(fetchFieldsChoicesFailure(action.fieldId, action.catalogueId)))
        )
    ))
)