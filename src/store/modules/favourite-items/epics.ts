import { combineEpics } from "redux-observable"
import { concat, of, Observable, forkJoin, defer, iif } from 'rxjs'
import { catchError, switchMap, filter, mergeMap, map, defaultIfEmpty, withLatestFrom, pluck } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Types
import { RootState } from "store/storeConfig"
import { ItemCommentParent, User } from "src/globalTypes"
//Actions
import * as actions from "./slice"
import * as usersEntitiesActions from "store/entities/users/slice"
import * as itemsEntitiesActions from "store/entities/items/slice"
import * as itemsCommentsEntitiesActions from "store/entities/items-comments/slice"
import * as cataloguesEntitiesActions from "store/entities/catalogues/slice"
import * as fieldsEntitiesActions from "store/entities/fields/slice"
import * as choicesEntitiesActions from "store/entities/choices/slice"

export const fetchFavouriteItemsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS.match),
    switchMap((action) => concat(
        of(actions.FETCH_FAVOURITE_ITEMS_START()),
        axiosInstance$.get('/items/favourites/', {
            params: {
                page: action.payload,
            }
        }).pipe(
            mergeMap(response => concat(
                of(itemsEntitiesActions.ITEMS_UPDATED(response.data.results)),
                of(actions.FETCH_FAVOURITE_ITEMS_SUCCESS(response.data)),
            )),
            catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_FAILURE()))
        )
    ))
)

export const fetchFavouriteItemsCataloguesEpic = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_SUCCESS.match),
    withLatestFrom(state$.pipe(pluck('entities', 'catalogues', 'ids'))),
    switchMap(([action, ids]) => {
        const allIds = Array.from(new Set(action.payload.results.map(c => c.catalogue_id)))
        const filteredIds = allIds.filter(id => !ids.includes(id))

        if (filteredIds.length === 0) {
            return of(actions.FETCH_FAVOURITE_ITEMS_CATALOGUES_SUCCESS(allIds))
        }

        const requests = filteredIds.map(id =>
            axiosInstance$.get(`/catalogues/${id}/`).pipe(map(response => response.data))
        )

        return forkJoin(requests).pipe(
            mergeMap(response => concat(
                of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response)),
                of(actions.FETCH_FAVOURITE_ITEMS_CATALOGUES_SUCCESS(allIds)),
            )),
            catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_CATALOGUES_FAILURE()))
        )
    })
)

export const fetchFavouriteItemsCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_SUCCESS.match),
    mergeMap(action => {
        const items = action.payload.results

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
            forkJoin<typeof requests, string>(requests).pipe(
                defaultIfEmpty(),
                mergeMap(data => {
                    const comments = Object.values(data).flat().map(list =>
                        list.results).filter(c => c.length > 0).flat() as ItemCommentParent[]

                    const users = comments.map((c: ItemCommentParent) => c.created_by as User)

                    return concat(
                        of(usersEntitiesActions.USERS_ADDED(users)),
                        of(itemsCommentsEntitiesActions.ITEMS_COMMENTS_UPDATED(comments)),
                        of(actions.FETCH_FAVOURITE_ITEMS_COMMENTS_SUCCESS(data)),
                    )
                }),
                catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_COMMENTS_FAILURE()))
            )
        )
    }),
)

export const fetchFavouriteItemsFieldsEpic = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_CATALOGUES_SUCCESS.match),
    withLatestFrom(state$.pipe(pluck('entities', 'fields', 'entities'))),
    mergeMap(([action, fields]) => {
        const cataloguesIds = Array.from(new Set(Object.values(fields).map(f => f!.catalogueId)))
        const filteredIds = action.payload.filter(id => !cataloguesIds.includes(id))

        if (filteredIds.length === 0) {
            return of(actions.FAVOURITE_ITEMS_FIELDS_NOT_NEEDED())
        }

        const requests = filteredIds.map(id =>
            axiosInstance$.get('/fields/', {
                params: { catalogue_id: id }
            }).pipe(map(response => response.data))
        )

        return forkJoin(requests).pipe(
            defaultIfEmpty(),
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELDS_UPDATED(response.flat())),
                of(actions.FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS(response)),
            )),
            catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_FIELDS_FAILURE()))
        )
    })
)

export const fetchFavouriteItemsChoicesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS.match),
    mergeMap(action => {
        const fields = action.payload.flat().filter(f =>
            f.type === 'multiple_choice' || f.type === 'single_choice'
        )

        const requests = fields.map(field =>
            axiosInstance$.get('/choices/', {
                params: { field_id: field.id }
            }).pipe(map(response => response.data))
        )

        return concat(
            forkJoin(requests).pipe(
                defaultIfEmpty(),
                mergeMap(data => {
                    const choices = Object.values(data).flat()

                    return concat(
                        of(choicesEntitiesActions.CHOICES_UPDATED(choices)),
                        of(actions.FETCH_FAVOURITE_ITEMS_CHOICES_SUCCESS(choices)),
                    )
                }),
                catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_CHOICES_FAILURE()))
            )
        )
    })
)

export const postFavouriteItemCommentEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_FAVOURITE_ITEM_COMMENT.match),
    mergeMap(action => concat(
        of(actions.POST_FAVOURITE_ITEM_COMMENT_START(action.payload.itemId)),
        defer(() => axiosInstance$.post(`/comments/`, {
            item_id: action.payload.itemId,
            parent_id: action.payload.parentId,
            text: action.payload.text,
        }).pipe(
            mergeMap(response => concat(
                iif(() =>
                    action.payload.parentId !== undefined,
                    of(itemsCommentsEntitiesActions.ITEM_COMMENT_CHILD_ADDED({
                        parentId: action.payload.parentId!,
                        child: response.data,
                    })),
                    of(itemsCommentsEntitiesActions.ITEM_COMMENT_ADDED(response.data))
                ),
                of(actions.POST_FAVOURITE_ITEM_COMMENT_SUCCESS(response.data))
            )),
            catchError(() => of(actions.POST_FAVOURITE_ITEM_COMMENT_FAILURE(action.payload.itemId)))
        ))
    ))
)

export const fetchFavouriteItemCommentsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEM_COMMENTS.match),
    mergeMap(action => concat(
        of(actions.FETCH_FAVOURITE_ITEM_COMMENTS_START(action.payload.itemId)),
        axiosInstance$.get(`/comments/`, {
            params: {
                item_id: action.payload.itemId,
                page: action.payload.page,
            }
        }).pipe(
            mergeMap(response => concat(
                of(usersEntitiesActions.USERS_ADDED(response.data.results.map((c: ItemCommentParent) => c.created_by))),
                of(itemsCommentsEntitiesActions.ITEMS_COMMENTS_UPDATED(response.data.results)),
                of(actions.FETCH_FAVOURITE_ITEM_COMMENTS_SUCCESS({
                    itemId: action.payload.itemId,
                    data: response.data
                }))
            )),
            catchError(() => of(actions.FETCH_FAVOURITE_ITEM_COMMENTS_FAILURE(action.payload.itemId)))
        )
    ))
)

export const favouriteItemsEpics = combineEpics(
    fetchFavouriteItemsEpic,
    fetchFavouriteItemsCommentsEpic,
    fetchFavouriteItemsCataloguesEpic,
    fetchFavouriteItemsFieldsEpic,
    fetchFavouriteItemsChoicesEpic,
    postFavouriteItemCommentEpic,
    fetchFavouriteItemCommentsEpic,
)