import { concat, of, type Observable, forkJoin, defer, iif } from 'rxjs'
import {
  catchError,
  switchMap,
  filter,
  mergeMap,
  map,
  defaultIfEmpty,
  withLatestFrom,
  pluck,
} from 'rxjs/operators'
import { type Action } from '@reduxjs/toolkit'
import { axiosInstance$ } from 'src/axiosInstance'
// Types
import { type RootState } from 'store/storeConfig'
import { CommentsData, type ItemCommentParent } from 'src/globalTypes'
// Actions
import * as actions from './slice'
import * as usersEntitiesActions from 'store/entities/users/slice'
import * as itemsEntitiesActions from 'store/entities/items/slice'
import * as itemsCommentsEntitiesActions from 'store/entities/items-comments/slice'
import * as cataloguesEntitiesActions from 'store/entities/catalogues/slice'
import * as fieldsEntitiesActions from 'store/entities/fields/slice'
import * as choicesEntitiesActions from 'store/entities/choices/slice'
import { typedCombineEpics } from 'store/utils'

export const fetchFavouriteItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS.match),
    switchMap((action) =>
      concat(
        of(actions.FETCH_FAVOURITE_ITEMS_START()),
        axiosInstance$
          .get('/items/', {
            params: {
              is_favourite: true,
              page: action.payload.page,
              search: action.payload.search,
              ordering: action.payload.sort,
              ...action.payload.filters,
            },
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(itemsEntitiesActions.ITEMS_UPDATED(response.data.results)),
                of(actions.FETCH_FAVOURITE_ITEMS_SUCCESS(response.data)),
              ),
            ),
            catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_FAILURE())),
          ),
      ),
    ),
  )

export const fetchFavouriteItemsCommentsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_SUCCESS.match),
    mergeMap((action) => {
      const items = action.payload.results

      if (items.length === 0) {
        return of(actions.FAVOURITE_ITEMS_COMMENTS_NOT_NEEDED())
      }

      const requests = Object.fromEntries(
        items.map((item) => [
          item.id,
          axiosInstance$
            .get<CommentsData>('/comments/', {
              params: {
                item_id: item.id,
                page: 1,
              },
            })
            .pipe(map((response) => response.data)),
        ]),
      )

      return concat(
        forkJoin(requests).pipe(
          defaultIfEmpty({}),
          mergeMap((data) => {
            const comments = Object.values(data)
              .flat()
              .map((list) => list.results)
              .filter((c) => c.length > 0)
              .flat()

            const users = comments
              .map((c) => {
                const newUsers = c.children.map((ch) => ch.created_by)
                newUsers.push(c.created_by)
                return newUsers
              })
              .flat()
            return concat(
              of(usersEntitiesActions.USERS_ADDED(users)),
              of(itemsCommentsEntitiesActions.ITEMS_COMMENTS_UPDATED(comments)),
              of(actions.FETCH_FAVOURITE_ITEMS_COMMENTS_SUCCESS(data)),
            )
          }),
          catchError(() =>
            of(actions.FETCH_FAVOURITE_ITEMS_COMMENTS_FAILURE()),
          ),
        ),
      )
    }),
  )

export const fetchFavouriteItemsDataEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_DATA.match),
    switchMap(() =>
      axiosInstance$.get('/catalogues/with-favourite-items/').pipe(
        mergeMap((response) =>
          concat(
            of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response.data)),
            of(actions.FETCH_FAVOURITE_ITEMS_DATA_SUCCESS(response.data)),
          ),
        ),
        catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_DATA_FAILURE())),
      ),
    ),
  )

export const fetchFavouriteItemsFieldsEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_DATA_SUCCESS.match),
    withLatestFrom(state$.pipe(pluck('entities', 'fields', 'entities'))),
    mergeMap(([action, fields]) => {
      const cataloguesIds = Array.from(
        new Set(Object.values(fields).map((f) => f!.catalogueId)),
      )
      const filteredIds = action.payload
        .filter((c) => !cataloguesIds.includes(c.id))
        .map((c) => c.id)

      if (filteredIds.length === 0) {
        return of(actions.FAVOURITE_ITEMS_FIELDS_NOT_NEEDED())
      }

      const requests = filteredIds.map((id) =>
        axiosInstance$
          .get('/fields/', {
            params: { catalogue_id: id },
          })
          .pipe(map((response) => response.data)),
      )

      return forkJoin(requests).pipe(
        defaultIfEmpty([]),
        mergeMap((response) =>
          concat(
            of(fieldsEntitiesActions.FIELDS_UPDATED(response.flat())),
            of(actions.FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS(response.flat())),
          ),
        ),
        catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_FIELDS_FAILURE())),
      )
    }),
  )

export const fetchFavouriteItemsChoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS.match),
    mergeMap((action) => {
      const fields = action.payload
        .flat()
        .filter(
          (f) => f.type === 'multiple_choice' || f.type === 'single_choice',
        )

      if (fields.length === 0) {
        return of(actions.FAVOURITE_ITEMS_CHOICES_NOT_NEEDED())
      }

      const requests = fields.map((field) =>
        axiosInstance$
          .get('/choices/', {
            params: { field_id: field.id },
          })
          .pipe(map((response) => response.data)),
      )

      return concat(
        forkJoin(requests).pipe(
          defaultIfEmpty([]),
          mergeMap((data) => {
            const choices = Object.values(data).flat()

            return concat(
              of(choicesEntitiesActions.CHOICES_UPDATED(choices)),
              of(actions.FETCH_FAVOURITE_ITEMS_CHOICES_SUCCESS(choices)),
            )
          }),
          catchError(() => of(actions.FETCH_FAVOURITE_ITEMS_CHOICES_FAILURE())),
        ),
      )
    }),
  )

export const postFavouriteItemCommentEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.POST_FAVOURITE_ITEM_COMMENT.match),
    mergeMap((action) =>
      concat(
        of(actions.POST_FAVOURITE_ITEM_COMMENT_START(action.payload.itemId)),
        defer(() =>
          axiosInstance$
            .post('/comments/', {
              item_id: action.payload.itemId,
              parent_id: action.payload.parentId,
              text: action.payload.text,
            })
            .pipe(
              mergeMap((response) =>
                concat(
                  iif(
                    () => action.payload.parentId !== undefined,
                    of(
                      itemsCommentsEntitiesActions.ITEM_COMMENT_CHILD_ADDED({
                        parentId: action.payload.parentId!,
                        child: response.data,
                      }),
                    ),
                    of(
                      itemsCommentsEntitiesActions.ITEM_COMMENT_ADDED(
                        response.data,
                      ),
                    ),
                  ),
                  of(
                    actions.POST_FAVOURITE_ITEM_COMMENT_SUCCESS(response.data),
                  ),
                ),
              ),
              catchError(() =>
                of(
                  actions.POST_FAVOURITE_ITEM_COMMENT_FAILURE(
                    action.payload.itemId,
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
  )

export const fetchFavouriteItemCommentsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_FAVOURITE_ITEM_COMMENTS.match),
    mergeMap((action) =>
      concat(
        of(actions.FETCH_FAVOURITE_ITEM_COMMENTS_START(action.payload.itemId)),
        axiosInstance$
          .get('/comments/', {
            params: {
              item_id: action.payload.itemId,
              page: action.payload.page,
            },
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(
                  usersEntitiesActions.USERS_ADDED(
                    response.data.results.map(
                      (c: ItemCommentParent) => c.created_by,
                    ),
                  ),
                ),
                of(
                  itemsCommentsEntitiesActions.ITEMS_COMMENTS_UPDATED(
                    response.data.results,
                  ),
                ),
                of(
                  actions.FETCH_FAVOURITE_ITEM_COMMENTS_SUCCESS({
                    itemId: action.payload.itemId,
                    data: response.data,
                  }),
                ),
              ),
            ),
            catchError(() =>
              of(
                actions.FETCH_FAVOURITE_ITEM_COMMENTS_FAILURE(
                  action.payload.itemId,
                ),
              ),
            ),
          ),
      ),
    ),
  )

export const favouriteItemsEpics = typedCombineEpics(
  fetchFavouriteItemsEpic,
  fetchFavouriteItemsCommentsEpic,
  fetchFavouriteItemsDataEpic,
  fetchFavouriteItemsFieldsEpic,
  fetchFavouriteItemsChoicesEpic,
  postFavouriteItemCommentEpic,
  fetchFavouriteItemCommentsEpic,
)
