import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable, from, merge } from 'rxjs'
import { catchError, mergeMap, switchMap, retryWhen, defaultIfEmpty, filter, map } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import mime from 'mime-types'
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Serializers
import { itemFieldSerializer } from "src/serializers"
//Types
import { DeserializedImage } from "src/globalTypes"
//Actions
import * as actions from "store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice"

export const refreshItemEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_ITEM.match)),
    action$.pipe(filter(actions.SAVE_ITEM_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_ITEM({
        itemId: action.payload.itemId,
        prevId: action.payload.prevId
    }))
)

export const fetchItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEM.match),
    mergeMap(action => concat(
        of(actions.FETCH_ITEM_START(action.payload.itemId)),
        defer(() => axiosInstance$.get(`/items/${action.payload.itemId}/`)).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.FETCH_ITEM_SUCCESS({
                    data: response.data,
                    itemId: action.payload.prevId,
                })
            ),
            catchError(() => of(actions.FETCH_ITEM_FAILURE(action.payload.prevId)))
        )
    ))
)

export const fetchItemsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEMS.match),
    mergeMap(action => concat(
        of(actions.FETCH_ITEMS_START()),
        defer(() => axiosInstance$.get('/items/', {
            params: {
                catalogue_id: action.payload.catalogueId,
                page: action.payload.page,
                search: action.payload.search,
                ordering: action.payload.sort,
            }
        })).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.FETCH_ITEMS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                })
            ),
            catchError(() => of(actions.FETCH_ITEMS_FAILURE()))
        )
    ))
)

export const saveItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.SAVE_ITEM.match),
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
                ...images.filter(isNew).map(img => from(fetch(img.image)).pipe(
                    mergeMap(r => r.blob()),
                    mergeMap(imageBlob => {
                        const data = new FormData()
                        data.append('image', imageBlob, `image.${mime.extension(imageBlob.type)}`)
                        data.append('item_id', JSON.stringify(itemId))
                        data.append('is_primary', JSON.stringify(img.isPrimary))
                        return axiosInstance$.post('/images/', data)
                    }),
                )),

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
            of(actions.SAVE_ITEM_START(action.payload.id)),
            request$.pipe(
                mergeMap(response => imagesRequests$(response.data.id).pipe(
                    defaultIfEmpty(),
                    map(() => actions.SAVE_ITEM_SUCCESS({
                        itemId: response.data.id,
                        prevId: action.payload.id,
                    })),
                    catchError(() => of(actions.SAVE_ITEM_FAILURE(action.payload.id)))
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