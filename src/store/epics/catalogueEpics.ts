import { combineEpics, ofType } from "redux-observable"
import { concat, of, from, defer } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom, retryWhen } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Store types
import { AppActionTypes, EpicType } from 'store/storeTypes/appTypes'
import {
    CATALOGUES_FETCH_CATALOGUES,
    CATALOGUES_FETCH_CATALOGUE_ITEMS,
    CATALOGUES_FETCH_CATALOGUE_FIELD,
    CATALOGUES_FETCH_CATALOGUE_FIELDS,
    CATALOGUES_FETCH_FIELDS_CHOICES,
    CATALOGUES_SAVE_ITEM,
    FetchCatalogues, FetchCatalogueField, FetchCatalogueFields,
    FetchFieldsChoices, FetchCatalogueItems, SaveItem,
} from "store/storeTypes/cataloguesTypes"
import {
    REFRESH_CATALOGUE_FIELDS_EPIC, REFRESH_CATALOGUE_FIELD_EPIC,
    RefreshCatalogueFieldEpic, RefreshCatalogueFieldsEpic,
} from "store/storeTypes/epicsTypes"
//Store actions
import {
    fetchCataloguesStart, fetchCataloguesSuccess, fetchCataloguesFailure,
    fetchCatalogueFields, fetchCatalogueFieldsStart, fetchCatalogueFieldsSuccess, fetchCatalogueFieldsFailure,
    fetchFieldsChoicesStart, fetchFieldsChoicesSuccess, fetchFieldsChoicesFailure,
    fetchCatalogueField, fetchCatalogueFieldStart, fetchCatalogueFieldSuccess, fetchCatalogueFieldFailure,
    fetchCatalogueItemsStart, fetchCatalogueItemsSuccess, fetchCatalogueItemsFailure,
    saveItemStart, saveItemSuccess, saveItemFailure,
} from "store/actions/cataloguesActions"

export const fetchCataloguesEpic: EpicType = (action$, state$) => action$.pipe(
    ofType<AppActionTypes, FetchCatalogues>(CATALOGUES_FETCH_CATALOGUES),
    withLatestFrom(state$.pipe(pluck('app', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(fetchCataloguesStart()),
        from(axiosInstance.get('/catalogues/', {
            params: { created_by: id }
        })).pipe(
            mergeMap(response => of(fetchCataloguesSuccess(response.data))),
            catchError(() => of(fetchCataloguesFailure()))
        )
    ))
)

export const refreshCatalogueFieldsEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, RefreshCatalogueFieldsEpic>(REFRESH_CATALOGUE_FIELDS_EPIC),
    mergeMap(action => of(fetchCatalogueFields(action.catalogueId)))
)

export const fetchCatalogueFieldsEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueFields>(CATALOGUES_FETCH_CATALOGUE_FIELDS),
    mergeMap(action => concat(
        of(fetchCatalogueFieldsStart(action.catalogueId)),
        defer(() => axiosInstance.get('/fields/', {
            params: { catalogue_id: action.catalogueId }
        })).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(fetchCatalogueFieldsSuccess(
                    response.data,
                    action.catalogueId
                ))
            ),
            catchError(() => of(fetchCatalogueFieldsFailure(action.catalogueId)))
        )
    ))
)

export const refreshCatalogueFieldEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, RefreshCatalogueFieldEpic>(REFRESH_CATALOGUE_FIELD_EPIC),
    mergeMap(action => of(fetchCatalogueField(action.fieldId, action.catalogueId)))
)

export const fetchCatalogueFieldEpic: EpicType = action$ => action$.pipe(
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

export const fetchCatalogueItems: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueItems>(CATALOGUES_FETCH_CATALOGUE_ITEMS),
    mergeMap(action => concat(
        of(fetchCatalogueItemsStart(action.catalogueId)),
        defer(() => axiosInstance.get('/items/', {
            params: {
                catalogue_id: action.catalogueId
            }
        })).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(fetchCatalogueItemsSuccess(
                    response.data,
                    action.catalogueId,
                ))
            ),
            catchError(() => of(fetchCatalogueItemsFailure(action.catalogueId)))
        )
    ))
)

export const fetchFieldsChoicesEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchFieldsChoices>(CATALOGUES_FETCH_FIELDS_CHOICES),
    mergeMap(action => concat(
        of(fetchFieldsChoicesStart(action.fieldId, action.catalogueId)),
        from(axiosInstance.get('/choices/', {
            params: { field_id: action.fieldId }
        })).pipe(
            mergeMap(response =>
                of(fetchFieldsChoicesSuccess(action.fieldId, action.catalogueId, response.data))
            ),
            catchError(() => of(fetchFieldsChoicesFailure(action.fieldId, action.catalogueId)))
        )
    ))
)

export const saveItemEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, SaveItem>(CATALOGUES_SAVE_ITEM),
    switchMap(action => {
        const filteredValues = action.item.fieldsValues.filter(v => v.value.length > 0)
        const values = filteredValues.map(field => ({
            field_id: field.fieldId,
            value: field.value,
        }))

        const axiosMethod = action.item.id.toString().startsWith('newItem')
            ? axiosInstance.post
            : axiosInstance.patch

        return concat(
            of(saveItemStart(action.catalogueId)),
            from(axiosMethod('/items/', {
                catalogue_id: action.catalogueId,
                values,
                images: action.item.images,
            })).pipe(
                mergeMap((response) => of(saveItemSuccess(action.catalogueId, action.item.id, response.data))),
                catchError(() => of(saveItemFailure(action.catalogueId)))
            )
        )
    })
)

export const cataloguesEpics = combineEpics(
    fetchCataloguesEpic,
    refreshCatalogueFieldEpic,
    fetchCatalogueFieldEpic,
    refreshCatalogueFieldsEpic,
    fetchCatalogueFieldsEpic,
    fetchCatalogueItems,
    fetchFieldsChoicesEpic,
    saveItemEpic,
)