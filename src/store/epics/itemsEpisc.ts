import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable, from, merge, iif } from 'rxjs'
import {
    catchError, mergeMap, switchMap, retryWhen, defaultIfEmpty, filter, map, withLatestFrom, pluck
} from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import mime from 'mime-types'
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Serializers
import { itemFieldSerializer } from "src/serializers"
//Selectors
// import { getCatalogueById } from "store/entities/catalogues/"
//Types
import { DeserializedImage } from "src/globalTypes"
import { RootState } from "store/storeConfig"
//Actions
import * as actions from "store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice"
import * as authUserCataloguesActions from "store/modules/auth-user-catalogues/slice"

export const refreshItemEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_ITEM.match)),
    action$.pipe(filter(actions.SAVE_ITEM_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_ITEM(action.payload))
)

export const fetchItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEM.match),
    mergeMap(action => concat(
        of(actions.FETCH_ITEM_START(action.payload)),
        defer(() => axiosInstance$.get(`/items/${action.payload}/`)).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.FETCH_ITEM_SUCCESS({
                    data: response.data,
                    itemId: action.payload,
                })
            ),
            catchError(() => of(actions.FETCH_ITEM_FAILURE(action.payload)))
        )
    ))
)

export const fetchItemsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEMS.match),
    switchMap(action => concat(
        of(actions.FETCH_ITEMS_START()),
        defer(() => axiosInstance$.get('/items/', {
            params: {
                catalogue_id: action.payload.catalogueId,
                page: action.payload.page,
                search: action.payload.search,
                ordering: action.payload.sort,
                ...action.payload.filters
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

export const addItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.ADD_ITEM.match),
    switchMap(action => concat(
        of(actions.ADD_ITEM_START()),
        defer(() => axiosInstance$.post('/items/', {
            catalogue_id: action.payload,
        })).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.ADD_ITEM_SUCCESS(response.data)
            ),
            catchError(() => of(actions.ADD_ITEM_FAILURE()))
        )
    ))
)

export const saveItemEpic = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) => action$.pipe(
    filter(actions.SAVE_ITEM.match),
    switchMap(action => {
        const filteredValues = action.payload.fieldsValues.filter(v => v.value !== null)
        const values = filteredValues.map(itemFieldSerializer)

        const request$ = axiosInstance$.patch(`/items/${action.payload.id}/`, {
            values,
        })

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
                    withLatestFrom(state$.pipe(pluck('entities', 'catalogues', 'entities', `${response.data.id}`))),
                    mergeMap(([_, catalogue]) => merge(
                        iif(() =>
                            catalogue?.itemsRanges.date.min === null,
                            of(authUserCataloguesActions.REFRESH_CATALOGUE(action.payload.catalogueId))
                        ),
                        of(actions.SAVE_ITEM_SUCCESS(response.data.id)),
                    )),
                    catchError(() => of(actions.SAVE_ITEM_FAILURE(action.payload.id)))
                ))
            )
        )
    })
)

export const deleteItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_ITEM.match),
    switchMap(action => concat(
        of(actions.DELETE_ITEM_START(action.payload)),
        defer(() => axiosInstance$.delete(`/items/${action.payload}/`)).pipe(
            map(() => actions.DELETE_ITEM_SUCCESS(action.payload)),
            catchError(() => of(actions.DELETE_ITEM_FAILURE(action.payload)))
        )
    ))
)

export const changeItemRatingEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_ITEM_RATING.match),
    switchMap(action =>
        axiosInstance$.put(`/items/${action.payload.itemId}/rating/`, {
            rating: action.payload.rating
        }).pipe(
            map(response => actions.CHANGE_ITEM_RATING_SUCCESS({
                itemId: action.payload.itemId,
                rating: response.data.rating,
            })),
            catchError(() => of(actions.CHANGE_ITEM_RATING_FAILURE()))
        )
    )
)

export const deleteItemRatingEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_ITEM_RATING.match),
    switchMap(action =>
        axiosInstance$.delete(`/items/${action.payload}/rating/`).pipe(
            map(response => actions.DELETE_ITEM_RATING_SUCCESS({
                itemId: action.payload,
                rating: response.data.rating,
            })),
            catchError(() => of(actions.DELETE_ITEM_RATING_FAILURE()))
        )
    )
)

export const addItemToFavouriteEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.ADD_ITEM_TO_FAVOURITE.match),
    switchMap(action =>
        axiosInstance$.put(`/items/${action.payload}/favourite/`, {
            is_favourite: true,
        }).pipe(
            map(() => actions.ADD_ITEM_TO_FAVOURITE_SUCCESS()),
            catchError(() => of(actions.ADD_ITEM_TO_FAVOURITE_FAILURE(action.payload)))
        )
    )
)

export const deleteItemFromFavouriteEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_ITEM_FROM_FAVOURITE.match),
    switchMap(action =>
        axiosInstance$.delete(`/items/${action.payload}/favourite/`).pipe(
            map(() => actions.DELETE_ITEM_FROM_FAVOURITE_SUCCESS()),
            catchError(() => of(actions.DELETE_ITEM_FROM_FAVOURITE_FAILURE(action.payload)))
        )
    )
)

export const fetchItemsCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEMS_SUCCESS.match),
    mergeMap(action => from(action.payload.data.results.map(i => i.id)).pipe(
        mergeMap(id => of(actions.FETCH_ITEM_COMMENTS({
            itemId: id,
            page: 1,
        })))
    )),
)

export const refreshItemCommentsEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.FETCH_ITEM_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_ITEM_COMMENTS({
        itemId: action.payload.itemId,
        page: 1,
    }))
)

export const fetchItemCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEM_COMMENTS.match),
    mergeMap(action => concat (
        of(actions.FETCH_ITEM_COMMENTS_START(action.payload.itemId)),
        axiosInstance$.get(`/comments/`, {
            params: {
                item_id: action.payload.itemId,
                page: action.payload.page,
            }
        }).pipe(
            map(response => actions.FETCH_ITEM_COMMENTS_SUCCESS({
                itemId: action.payload.itemId,
                data: response.data
            })),
            catchError(() => of(actions.FETCH_ITEM_COMMENTS_FAILURE(action.payload.itemId)))
        )
    ))
)

export const postItemCommentEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_ITEM_COMMENT.match),
    mergeMap(action => concat(
        of(actions.POST_ITEM_COMMENT_START(action.payload.itemId)),
        defer(() => axiosInstance$.post(`/comments/`, {
            item_id: action.payload.itemId,
            parent_id: action.payload.parentId,
            text: action.payload.text,
        }).pipe(
            map(response => actions.POST_ITEM_COMMENT_SUCCESS(response.data)),
            catchError(() => of(actions.POST_ITEM_COMMENT_FAILURE(action.payload.itemId)))
        ))
    ))
)

export const itemsEpics = combineEpics(
    refreshItemEpic,
    fetchItemEpic,
    fetchItemsEpic,
    addItemEpic,
    saveItemEpic,
    deleteItemEpic,
    changeItemRatingEpic,
    deleteItemRatingEpic,
    addItemToFavouriteEpic,
    deleteItemFromFavouriteEpic,
    refreshItemCommentsEpic,
    fetchItemCommentsEpic,
    fetchItemsCommentsEpic,
    postItemCommentEpic,
)