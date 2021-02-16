import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable } from 'rxjs'
import { catchError, mergeMap, switchMap, retryWhen, defaultIfEmpty, filter } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Serializers
import { itemFieldSerializer } from "src/serializers"
//Types
import { DeserializedImage } from "src/globalTypes"
//Actions
import {
    SAVE_ITEM_SUCCESS,
    REFRESH_ITEM,
    FETCH_ITEM, FETCH_ITEM_START, FETCH_ITEM_SUCCESS, FETCH_ITEM_FAILURE,
    FETCH_ITEMS, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_START, FETCH_ITEMS_FAILURE,
    SAVE_ITEM, SAVE_ITEM_START, SAVE_ITEM_FAILURE,
} from "store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice"

export const refreshItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(
        REFRESH_ITEM.match ||
        SAVE_ITEM_SUCCESS.match
    ),
    mergeMap(action => of(FETCH_ITEM({
        itemId: action.payload.itemId,
        prevId: action.payload.prevId
    })))
)

export const fetchItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(FETCH_ITEM.match),
    mergeMap(action => concat(
        of(FETCH_ITEM_START(action.payload.itemId)),
        defer(() => axiosInstance$.get(`/items/${action.payload.itemId}/`)).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(FETCH_ITEM_SUCCESS({
                    data: response.data,
                    itemId: action.payload.prevId,
                }))
            ),
            catchError(() => of(FETCH_ITEM_FAILURE(action.payload.prevId)))
        )
    ))
)

export const fetchItemsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(FETCH_ITEMS.match),
    mergeMap(action => concat(
        of(FETCH_ITEMS_START(action.payload.catalogueId)),
        defer(() => axiosInstance$.get('/items/', {
            params: {
                catalogue_id: action.payload.catalogueId,
                page: action.payload.page,
            }
        })).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(FETCH_ITEMS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                }))
            ),
            catchError(() => of(FETCH_ITEMS_FAILURE(action.payload.catalogueId)))
        )
    ))
)

export const saveItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(SAVE_ITEM.match),
    switchMap(action => {
        const filteredValues = action.payload.fieldsValues.filter(v => v.value.length > 0)
        const values = filteredValues.map(itemFieldSerializer)

        let request$

        if (action.payload.id.toString().startsWith('newItem')) {
            request$ = axiosInstance$.post('/items/', {
                catalogue_id: action.payload.catalogueId,
                values,
            })
        } else {
            request$ = axiosInstance$.patch(`/items/${action.payload.id}/`, {
                values,
            })
        }

        const imagesRequests$ = (itemId: number) => {
            const isNew = (img: DeserializedImage) => img.id.toString().startsWith('newImage')
            const { images, removedImages } = action.payload

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
            of(SAVE_ITEM_START(action.payload.id)),
            request$.pipe(
                mergeMap(response => imagesRequests$(response.data.id).pipe(
                    defaultIfEmpty(),
                    mergeMap(() => of(SAVE_ITEM_SUCCESS({
                        itemId: response.data.id,
                        prevId: action.payload.id,
                    }))),
                    catchError(() => of(SAVE_ITEM_FAILURE(action.payload.id)))
                ))
            )
        )
    })
)

export const itemsEpics = combineEpics(
    refreshItemEpic,
    fetchItemEpic,
    fetchItemsEpic,
    saveItemEpic,
)