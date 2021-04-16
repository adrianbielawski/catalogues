import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable, from, merge, iif } from 'rxjs'
import {
    catchError, mergeMap, switchMap, retryWhen, defaultIfEmpty, filter, map, withLatestFrom, pluck, tap,
} from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import mime from 'mime-types'
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Serializers
import { itemFieldSerializer, itemRatingDeserializer } from "src/serializers"
//Types
import { DeserializedImage, Item, ItemCommentParent, User } from "src/globalTypes"
import { RootState } from "store/storeConfig"
//Actions
import * as actions from "./slice"
import * as authUserCataloguesActions from "store/modules/auth-user-catalogues/slice"
import * as itemsActions from "store/entities/items/slice"
import * as itemsCommentsActions from "store/entities/items-comments/slice"
import * as usersActions from "store/entities/users/slice"

export const refreshItemEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_CURRENT_USER_ITEM.match)),
    action$.pipe(filter(actions.SAVE_ITEM_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_CURRENT_USER_ITEM(action.payload))
)

export const fetchItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CURRENT_USER_ITEM.match),
    mergeMap(action => concat(
        of(actions.FETCH_CURRENT_USER_ITEM_START(action.payload)),
        defer(() => axiosInstance$.get(`/items/${action.payload}/`)).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response => concat(
                of(usersActions.USER_ADDED(response.data.map((i: Item) => i.created_by))),
                of(itemsActions.ITEM_UPDATED(response.data)),
                of(actions.FETCH_CURRENT_USER_ITEM_SUCCESS({
                    data: response.data,
                    itemId: action.payload,
                }))
            )),
            catchError(() => of(actions.FETCH_CURRENT_USER_ITEM_FAILURE(action.payload)))
        )
    ))
)

export const fetchItemsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CURRENT_USER_ITEMS.match),
    switchMap(action => concat(
        of(actions.FETCH_CURRENT_USER_ITEMS_START()),
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
            mergeMap(response => concat(
                of(usersActions.USERS_ADDED(response.data.results.map((i: Item) => i.created_by))),
                of(itemsActions.ITEMS_UPDATED(response.data.results)),
                of(actions.FETCH_CURRENT_USER_ITEMS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                }))
            )),
            catchError(() => of(actions.FETCH_CURRENT_USER_ITEMS_FAILURE()))
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
            mergeMap(response => concat(
                of(itemsActions.ITEM_ADDED(response.data)),
                of(actions.ADD_ITEM_SUCCESS(response.data))
            )),
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
            mergeMap(() => concat(
                of(actions.DELETE_ITEM_SUCCESS(action.payload)),
                of(itemsActions.ITEM_REMOVED(action.payload))
            )),
            catchError(() => of(actions.DELETE_ITEM_FAILURE(action.payload)))
        )
    ))
)

export const changeItemRatingEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_ITEM_RATING.match),
    switchMap(action => concat(
        of(itemsActions.ITEM_UPDATED({
            id: action.payload.itemId,
            changes: {
                rating: {
                    average: action.payload.prevRating.average,
                    count: action.payload.prevRating.count,
                    currentUser: action.payload.rating,
                },
            }
        })),
        defer(() =>
            iif(() => action.payload.rating !== null,
                axiosInstance$.put(`/items/${action.payload.itemId}/rating/`, {
                    rating: action.payload.rating
                }),
                axiosInstance$.delete(`/items/${action.payload.itemId}/rating/`)
            ).pipe(
                map(response => itemsActions.ITEM_UPDATED({
                    id: action.payload.itemId,
                    changes: {
                        rating: itemRatingDeserializer(response.data.rating),
                    }
                })),
                catchError(() => concat(
                    of(itemsActions.ITEM_UPDATED({
                        id: action.payload.itemId,
                        changes: {
                            rating: action.payload.prevRating,
                        }
                    })),
                    of(actions.CHANGE_ITEM_RATING_FAILURE(action.payload.itemId))
                ))
            ))
    ))
)

export const changeFavouriteItemEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_FAVOURITE_ITEM.match),
    switchMap(action => concat(
        of(itemsActions.ITEM_UPDATED({
            id: action.payload.itemId,
            changes: {
                isFavourite: action.payload.isFavourite,
            }
        })),
        defer(() =>
            iif(() =>
                action.payload.isFavourite,
                axiosInstance$.put(`/items/${action.payload.itemId}/favourite/`, {
                    is_favourite: true,
                }),
                axiosInstance$.delete(`/items/${action.payload.itemId}/favourite/`)
            ).pipe(
                map(() => actions.CHANGE_FAVOURITE_ITEM_SUCCESS()),
                catchError(() => concat(
                    of(itemsActions.ITEM_UPDATED({
                        id: action.payload.itemId,
                        changes: {
                            isFavourite: !action.payload.isFavourite,
                        }
                    })),
                    of(actions.CHANGE_FAVOURITE_ITEM_FAILURE(action.payload.itemId))
                ))
            )
        )
    ))
)

export const fetchItemsCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CURRENT_USER_ITEMS_SUCCESS.match),
    mergeMap(action => {
        const items = action.payload.data.results
        const requests = Object.fromEntries(
            items.map(item => [
                item.id,
                axiosInstance$.get(`/comments/`, {
                    params: {
                        item_id: item.id,
                        page: 1,
                    }
                }).pipe(map(response => response.data))
            ])
        )

        return concat(
            of(actions.FETCH_ITEMS_COMMENTS_START()),
            forkJoin<typeof requests, string>(requests).pipe(
                defaultIfEmpty(),
                mergeMap(data => {
                    const comments = Object.values(data).flat().map(list => list.results).filter(c => c.length > 0).flat() as ItemCommentParent[]
                    
                    return concat(
                        of(usersActions.USERS_ADDED(comments.map((c: ItemCommentParent) => c.created_by as User))),
                        of(itemsCommentsActions.ITEMS_COMMENTS_UPDATED(comments)),
                        of(actions.FETCH_ITEMS_COMMENTS_SUCCESS(data)),
                    )
                }),
                catchError(() => of(actions.FETCH_ITEMS_COMMENTS_FAILURE()))
            )
        )
    }),
)

export const fetchItemCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_ITEM_COMMENTS.match),
    mergeMap(action => concat(
        of(actions.FETCH_ITEM_COMMENTS_START(action.payload.itemId)),
        axiosInstance$.get(`/comments/`, {
            params: {
                item_id: action.payload.itemId,
                page: action.payload.page,
            }
        }).pipe(
            mergeMap(response => concat(
                of(usersActions.USERS_ADDED(response.data.results.map((c: ItemCommentParent) => c.created_by))),
                of(itemsCommentsActions.ITEMS_COMMENTS_UPDATED(response.data.results)),
                of(actions.FETCH_ITEM_COMMENTS_SUCCESS({
                    itemId: action.payload.itemId,
                    data: response.data
                }))
            )),
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
            mergeMap(response => concat(
                iif(() =>
                    action.payload.parentId !== undefined,
                    of(itemsCommentsActions.ITEM_COMMENT_CHILD_ADDED({
                        parentId: action.payload.parentId!,
                        child: response.data,
                    })),
                    of(itemsCommentsActions.ITEM_COMMENT_ADDED(response.data))
                ),
                of(actions.POST_ITEM_COMMENT_SUCCESS(response.data))
            )),
            catchError(() => of(actions.POST_ITEM_COMMENT_FAILURE(action.payload.itemId)))
        ))
    ))
)

export const currentUserItemsEpics = combineEpics(
    refreshItemEpic,
    fetchItemEpic,
    fetchItemsEpic,
    addItemEpic,
    saveItemEpic,
    deleteItemEpic,
    changeItemRatingEpic,
    changeFavouriteItemEpic,
    fetchItemCommentsEpic,
    fetchItemsCommentsEpic,
    postItemCommentEpic,
)