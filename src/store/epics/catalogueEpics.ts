import { combineEpics, ofType } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, forkJoin } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom, retryWhen } from 'rxjs/operators'
//Store observables
import { retry$ } from "store/storeObservables"
//Store types
import { AppActionTypes, EpicType } from 'store/storeTypes/appTypes'
import {
    CATALOGUES_FETCH_CATALOGUES,
    CATALOGUES_FETCH_CATALOGUE_ITEM, CATALOGUES_FETCH_CATALOGUE_ITEMS,
    CATALOGUES_REFRESH_CATALOGUE_FIELD, CATALOGUES_FETCH_CATALOGUE_FIELD,
    CATALOGUES_REFRESH_CATALOGUE_FIELDS, CATALOGUES_FETCH_CATALOGUE_FIELDS,
    CATALOGUES_FETCH_FIELDS_CHOICES,
    CATALOGUES_SAVE_ITEM, CATALOGUES_SAVE_ITEM_SUCCESS,
    CATALOGUES_REFRESH_CATALOGUE_ITEM,
    FetchCatalogues, FetchCatalogueField, FetchCatalogueFields,
    FetchFieldsChoices, FetchCatalogueItems, SaveItem, FetchCatalogueItem,
} from "store/storeTypes/cataloguesTypes"
import {
    MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS
} from "store/storeTypes/settingsTypes"
import {
    RefreshCatalogueFieldEpic, RefreshCatalogueFieldsEpic, RefreshCatalogueItemEpic,
} from "store/storeTypes/epicsTypes"
//Store actions
import {
    fetchCataloguesStart, fetchCataloguesSuccess, fetchCataloguesFailure,
    fetchCatalogueFields, fetchCatalogueFieldsStart, fetchCatalogueFieldsSuccess, fetchCatalogueFieldsFailure,
    fetchFieldsChoicesStart, fetchFieldsChoicesSuccess, fetchFieldsChoicesFailure,
    fetchCatalogueField, fetchCatalogueFieldStart, fetchCatalogueFieldSuccess, fetchCatalogueFieldFailure,
    fetchCatalogueItemStart, fetchCatalogueItemSuccess, fetchCatalogueItemFailure,
    fetchCatalogueItemsStart, fetchCatalogueItemsSuccess, fetchCatalogueItemsFailure,
    saveItemStart, saveItemSuccess, saveItemFailure, fetchCatalogueItem
} from "store/actions/cataloguesActions"
import { itemFieldSerializer } from "src/serializers"
import { DeserializedImage } from "src/globalTypes"

export const fetchCataloguesEpic: EpicType = (action$, state$) => action$.pipe(
    ofType<AppActionTypes, FetchCatalogues>(CATALOGUES_FETCH_CATALOGUES),
    withLatestFrom(state$.pipe(pluck('app', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(fetchCataloguesStart()),
        axiosInstance$.get('/catalogues/', {
            params: { created_by: id }
        }).pipe(
            mergeMap(response => of(fetchCataloguesSuccess(response.data))),
            catchError(() => of(fetchCataloguesFailure()))
        )
    ))
)

export const refreshCatalogueFieldsEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, RefreshCatalogueFieldsEpic>(
        CATALOGUES_REFRESH_CATALOGUE_FIELDS,
        MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS
    ),
    mergeMap(action => of(fetchCatalogueFields(action.catalogueId)))
)

export const fetchCatalogueFieldsEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueFields>(CATALOGUES_FETCH_CATALOGUE_FIELDS),
    mergeMap(action => concat(
        of(fetchCatalogueFieldsStart(action.catalogueId)),
        defer(() => axiosInstance$.get('/fields/', {
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
    ofType<AppActionTypes, RefreshCatalogueFieldEpic>(
        CATALOGUES_REFRESH_CATALOGUE_FIELD,
        MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
        MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS
    ),
    mergeMap(action => of(fetchCatalogueField(action.fieldId, action.catalogueId)))
)

export const fetchCatalogueFieldEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueField>(CATALOGUES_FETCH_CATALOGUE_FIELD),
    mergeMap(action => concat(
        of(fetchCatalogueFieldStart(action.fieldId, action.catalogueId)),
        defer(() => axiosInstance$.get(`/fields/${action.fieldId}/`)).pipe(
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

export const refreshCatalogueItemEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, RefreshCatalogueItemEpic>(CATALOGUES_REFRESH_CATALOGUE_ITEM,
        CATALOGUES_SAVE_ITEM_SUCCESS
    ),
    mergeMap(action => of(fetchCatalogueItem(action.catalogueId, action.itemId, action.prevId)))
)

export const fetchCatalogueItemEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueItem>(CATALOGUES_FETCH_CATALOGUE_ITEM),
    mergeMap(action => concat(
        of(fetchCatalogueItemStart(action.catalogueId, action.itemId)),
        defer(() => axiosInstance$.get(`/items/${action.itemId}/`)).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(fetchCatalogueItemSuccess(
                    response.data,
                    action.catalogueId,
                    action.prevId,
                ))
            ),
            catchError(() => of(fetchCatalogueItemFailure(action.catalogueId, action.prevId)))
        )
    ))
)

export const fetchCatalogueItemsEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, FetchCatalogueItems>(CATALOGUES_FETCH_CATALOGUE_ITEMS),
    mergeMap(action => concat(
        of(fetchCatalogueItemsStart(action.catalogueId)),
        defer(() => axiosInstance$.get('/items/', {
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
        axiosInstance$.get('/choices/', {
            params: { field_id: action.fieldId }
        }).pipe(
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
        const values = filteredValues.map(itemFieldSerializer)

        let request$

        if (action.item.id.toString().startsWith('newItem')) {
            request$ = axiosInstance$.post('/items/', {
                catalogue_id: action.catalogueId,
                values,
            })
        } else {
            request$ = axiosInstance$.patch(`/items/${action.item.id}/`, {
                values,
            })
        }

        const imagesRequests$ = (itemId: number) => {
            const isNew = (img: DeserializedImage) => img.id.toString().startsWith('newImage')
            const { images, removedImages } = action.item

            return forkJoin([
                ...images.filter(isNew).map(img => {
                    const data = new FormData()
                    data.append('image', img.image)
                    data.append('item_id', JSON.stringify(itemId))
                    data.append('is_primary', JSON.stringify(img.isPrimary))
                    return axiosInstance$.post('/images/', data)
                }),

                ...removedImages.map(img => axiosInstance$.delete(`/images/${img.id}/`)),

                // Set primary flag only on existing images. If a new image is primary,
                // it gets the flag set at creation time.
                ...images.filter(img => !isNew(img) && img.isPrimary).map(
                    primary => axiosInstance$.patch(`/images/${primary.id}/`, {
                        is_primary: true
                    })
                ),
            ])
        }

        return concat(
            of(saveItemStart(action.catalogueId, action.item.id)),
            request$.pipe(
                mergeMap(response => imagesRequests$(response.data.id).pipe(
                    mergeMap(() => of(saveItemSuccess(action.catalogueId, response.data.id, action.item.id))),
                    catchError(() => of(saveItemFailure(action.catalogueId, action.item.id)))
                ))
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
    refreshCatalogueItemEpic,
    fetchCatalogueItemEpic,
    fetchCatalogueItemsEpic,
    fetchFieldsChoicesEpic,
    saveItemEpic,
)