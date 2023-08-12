import { combineEpics } from 'redux-observable'
import { concat, of, Observable, forkJoin, defer, iif, from, merge } from 'rxjs'
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
import { Action } from '@reduxjs/toolkit'
import mime from 'mime-types'
import { axiosInstance$ } from 'src/axiosInstance'
// Types
import { RootState } from 'store/storeConfig'
import { DeserializedImage, Item, ItemCommentParent } from 'src/globalTypes'
// Serializers
import { itemFieldSerializer } from 'src/serializers'
// Actions
import * as actions from './slice'
import * as usersEntitiesActions from 'store/entities/users/slice'
import * as itemsEntitiesActions from 'store/entities/items/slice'
import * as itemsCommentsEntitiesActions from 'store/entities/items-comments/slice'
import * as cataloguesEntitiesActions from 'store/entities/catalogues/slice'
import * as fieldsEntitiesActions from 'store/entities/fields/slice'
import * as choicesEntitiesActions from 'store/entities/choices/slice'
import * as authUserCataloguesActions from 'store/modules/auth-user-catalogues/slice'

export const fetchSingleItemEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_SINGLE_ITEM.match),
    switchMap((action) =>
      concat(
        of(actions.FETCH_SINGLE_ITEM_START()),
        axiosInstance$.get(`/items/${action.payload}/`).pipe(
          mergeMap((response) =>
            concat(
              of(usersEntitiesActions.USER_ADDED(response.data.created_by)),
              of(itemsEntitiesActions.UPSERT_ITEM(response.data)),
              of(actions.FETCH_SINGLE_ITEM_SUCCESS(response.data)),
            ),
          ),
          catchError((error) =>
            of(actions.FETCH_SINGLE_ITEM_FAILURE(error.response.status)),
          ),
        ),
      ),
    ),
  )

export const refreshSingleItemCommentsEpic = (action$: Observable<Action>) =>
  merge(
    action$.pipe(filter(actions.FETCH_MORE_SINGLE_ITEM_COMMENTS.match)).pipe(
      map((action) => ({
        itemId: action.payload.itemId,
        page: action.payload.page,
      })),
    ),
    action$.pipe(filter(actions.FETCH_SINGLE_ITEM_SUCCESS.match)).pipe(
      map((action) => ({
        itemId: action.payload.id,
        page: 1,
      })),
    ),
  ).pipe(map((payload) => actions.FETCH_SINGLE_ITEM_COMMENTS(payload)))

export const fetchSingleItemCommentsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_SINGLE_ITEM_COMMENTS.match),
    switchMap((action) => {
      return axiosInstance$
        .get('/comments/', {
          params: {
            item_id: action.payload.itemId,
            page: action.payload.page,
          },
        })
        .pipe(
          mergeMap((response) => {
            const comments = response.data.results as ItemCommentParent[]

            const users = comments
              .map((c) => {
                const newUsers = c.children.map((ch) => ch.created_by)
                newUsers.push(c.created_by)
                return newUsers
              })
              .flat()

            return concat(
              of(usersEntitiesActions.USERS_ADDED(users)),
              of(
                itemsCommentsEntitiesActions.ITEMS_COMMENTS_UPDATED(
                  response.data.results,
                ),
              ),
              of(actions.FETCH_SINGLE_ITEM_COMMENTS_SUCCESS(response.data)),
            )
          }),
          catchError(() => of(actions.FETCH_SINGLE_ITEM_COMMENTS_FAILURE())),
        )
    }),
  )

export const fetchSingleItemCatalogueEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_SINGLE_ITEM_SUCCESS.match),
    withLatestFrom(state$.pipe(pluck('entities', 'catalogues', 'ids'))),
    switchMap(([action, ids]) => {
      const id = action.payload.catalogue_id

      if (ids.includes(id)) {
        return of(actions.FETCH_SINGLE_ITEM_CATALOGUE_SUCCESS(id))
      }

      return axiosInstance$.get(`/catalogues/${id}/`).pipe(
        mergeMap((response) =>
          concat(
            of(cataloguesEntitiesActions.UPSERT_CATALOGUE(response.data)),
            of(actions.FETCH_SINGLE_ITEM_CATALOGUE_SUCCESS(id)),
          ),
        ),
        catchError(() => of(actions.FETCH_SINGLE_ITEM_CATALOGUE_FAILURE())),
      )
    }),
  )

export const fetchSingleItemFieldsEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_SINGLE_ITEM_CATALOGUE_SUCCESS.match),
    withLatestFrom(state$.pipe(pluck('entities', 'fields', 'entities'))),
    mergeMap(([action, fields]) => {
      const exists = Object.values(fields).find((f) => f?.id === action.payload)

      if (exists != null) {
        return of(actions.SINGLE_ITEM_FIELDS_NOT_NEEDED())
      }

      return axiosInstance$
        .get('/fields/', {
          params: { catalogue_id: action.payload },
        })
        .pipe(
          mergeMap((response) =>
            concat(
              of(fieldsEntitiesActions.FIELDS_UPDATED(response.data)),
              of(actions.FETCH_SINGLE_ITEM_FIELDS_SUCCESS(response.data)),
            ),
          ),
          catchError(() => of(actions.FETCH_SINGLE_ITEM_FIELDS_FAILURE())),
        )
    }),
  )

export const fetchSingleItemChoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.FETCH_SINGLE_ITEM_FIELDS_SUCCESS.match),
    mergeMap((action) => {
      const fields = action.payload
        .flat()
        .filter(
          (f) => f.type === 'multiple_choice' || f.type === 'single_choice',
        )

      if (fields.length === 0) {
        return of(actions.SINGLE_ITEM_CHOICES_NOT_NEEDED())
      }

      const requests = Object.fromEntries(
        fields.map((field) => [
          field.id,
          axiosInstance$
            .get('/choices/', {
              params: { field_id: field.id },
            })
            .pipe(map((response) => response.data)),
        ]),
      )

      return concat(
        forkJoin<typeof requests, string>(requests).pipe(
          defaultIfEmpty(),
          mergeMap((data) =>
            concat(
              of(
                choicesEntitiesActions.CHOICES_UPDATED(
                  Object.values(data).flat(),
                ),
              ),
              of(actions.FETCH_SINGLE_ITEM_CHOICES_SUCCESS(data)),
            ),
          ),
          catchError(() => of(actions.FETCH_SINGLE_ITEM_CHOICES_FAILURE())),
        ),
      )
    }),
  )

export const postSingleItemCommentEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.POST_SINGLE_ITEM_COMMENT.match),
    mergeMap((action) =>
      concat(
        of(actions.POST_SINGLE_ITEM_COMMENT_START(action.payload.itemId)),
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
                  of(actions.POST_SINGLE_ITEM_COMMENT_SUCCESS(response.data)),
                ),
              ),
              catchError(() =>
                of(
                  actions.POST_SINGLE_ITEM_COMMENT_FAILURE(
                    action.payload.itemId,
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
  )

export const saveSingleItemEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.SAVE_SINGLE_ITEM.match),
    switchMap((action) => {
      const filteredValues = action.payload.fieldsValues.filter(
        (v) => v.value !== null,
      )
      const values = filteredValues.map(itemFieldSerializer)

      const request$ = axiosInstance$.patch<Item>(
        `/items/${action.payload.id}/`,
        {
          values,
        },
      )

      const imagesRequests$ = (itemId: number) => {
        const isNew = (img: DeserializedImage) =>
          img.id.toString().startsWith('newImage')
        const { images, removedImages } = action.payload

        return forkJoin([
          ...images.filter(isNew).map((img) =>
            from(fetch(img.image)).pipe(
              mergeMap(async (r) => await r.blob()),
              mergeMap((imageBlob) => {
                const data = new FormData()

                const extension = mime.extension(imageBlob.type)
                if (extension) {
                  data.append('image', imageBlob, `image.${extension}`)
                }
                data.append('item_id', JSON.stringify(itemId))
                data.append('is_primary', JSON.stringify(img.isPrimary))
                return axiosInstance$.post('/images/', data)
              }),
            ),
          ),

          ...removedImages.map((img) =>
            axiosInstance$.delete(`/images/${img.id}/`),
          ),

          // Set primary flag only on existing images. If a new image is primary,
          // it gets the flag set at creation time.
          ...images
            .filter((img) => !isNew(img) && img.isPrimary)
            .map((primary) =>
              axiosInstance$.patch(`/images/${primary.id}/`, {
                is_primary: true,
              }),
            ),
        ])
      }

      return concat(
        of(actions.SAVE_SINGLE_ITEM_START(action.payload.id)),
        request$.pipe(
          mergeMap((response) =>
            imagesRequests$(response.data.id).pipe(
              defaultIfEmpty(),
              withLatestFrom(
                state$.pipe(
                  pluck(
                    'entities',
                    'catalogues',
                    'entities',
                    `${response.data.id}`,
                  ),
                ),
              ),
              mergeMap(([_, catalogue]) =>
                merge(
                  iif(
                    () => catalogue?.itemsRanges.date.min === null,
                    of(
                      authUserCataloguesActions.REFRESH_CATALOGUE(
                        action.payload.catalogueId,
                      ),
                    ),
                  ),
                  of(actions.SAVE_SINGLE_ITEM_SUCCESS(response.data.id)),
                ),
              ),
              catchError(() =>
                of(actions.SAVE_SINGLE_ITEM_FAILURE(action.payload.id)),
              ),
            ),
          ),
        ),
      )
    }),
  )

export const refreshSingleItemEpic = (action$: Observable<Action>) =>
  merge(
    action$.pipe(filter(actions.REFRESH_SINGLE_ITEM.match)),
    action$.pipe(filter(actions.SAVE_SINGLE_ITEM_SUCCESS.match)),
  ).pipe(map((action) => actions.FETCH_SINGLE_ITEM(action.payload)))

export const singleItemEpics = combineEpics(
  fetchSingleItemEpic,
  refreshSingleItemCommentsEpic,
  fetchSingleItemCommentsEpic,
  fetchSingleItemCatalogueEpic,
  fetchSingleItemFieldsEpic,
  fetchSingleItemChoicesEpic,
  postSingleItemCommentEpic,
  saveSingleItemEpic,
  refreshSingleItemEpic,
)
