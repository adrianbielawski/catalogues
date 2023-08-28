import { StateObservable } from 'redux-observable'
import { Action } from '@reduxjs/toolkit'
import { axiosInstance$ } from 'src/axiosInstance'
import mime from 'mime-types'
import { concat, of, defer, Observable, from, EMPTY } from 'rxjs'
import {
  catchError,
  mergeMap,
  switchMap,
  withLatestFrom,
  filter,
  map,
} from 'rxjs/operators'
// Types
import { RootState } from 'store/storeConfig'
// Serializers
import { catalogueDeserializer } from 'src/serializers'
// Actions
import * as actions from '../slice'
import * as cataloguesActions from 'store/entities/catalogues/slice'
import { FETCH_FAVOURITE_CATALOGUES } from 'store/modules/auth-user-favourites/slice'
import { typedCombineEpics } from 'store/utils'

export const createCatalogueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CREATE_CATALOGUE.match),
    switchMap((action) =>
      concat(
        of(actions.CREATE_CATALOGUE_START()),
        axiosInstance$
          .post('/catalogues/', {
            name: action.payload,
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(cataloguesActions.CATALOGUE_ADDED(response.data)),
                of(actions.CREATE_CATALOGUE_SUCCESS(response.data)),
              ),
            ),
            catchError(() => of(actions.CREATE_CATALOGUE_FAILURE())),
          ),
      ),
    ),
  )

export const fetchAuthUserCataloguesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_AUTH_USER_CATALOGUES.match),
    withLatestFrom(state$.pipe(map((state) => state.modules.authUser.id))),
    switchMap(([, id]) =>
      concat(
        of(actions.FETCH_AUTH_USER_CATALOGUES_START()),
        axiosInstance$
          .get('/catalogues/', {
            params: { created_by: id },
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(cataloguesActions.CATALOGUES_UPDATED(response.data)),
                of(actions.FETCH_AUTH_USER_CATALOGUES_SUCCESS(response.data)),
              ),
            ),
            catchError(() => of(actions.FETCH_AUTH_USER_CATALOGUES_FAILURE())),
          ),
      ),
    ),
  )

export const refreshCatalogueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.REFRESH_CATALOGUE.match),
    switchMap((action) =>
      concat(
        axiosInstance$.get(`/catalogues/${action.payload}/`).pipe(
          map((response) =>
            cataloguesActions.CATALOGUE_UPDATED({
              id: action.payload,
              changes: {
                ...catalogueDeserializer(response.data),
              },
            }),
          ),
          catchError(() =>
            of(actions.REFRESH_CATALOGUE_FAILURE(action.payload)),
          ),
        ),
      ),
    ),
  )

export const changeCatalogueNameEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CHANGE_CATALOGUE_NAME.match),
    switchMap((action) =>
      concat(
        of(actions.CHANGE_CATALOGUE_NAME_START(action.payload.catalogueId)),
        axiosInstance$
          .patch(`/catalogues/${action.payload.catalogueId}/`, {
            name: action.payload.name,
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(
                  cataloguesActions.CATALOGUE_UPDATED({
                    id: action.payload.catalogueId,
                    changes: {
                      name: response.data.name,
                      slug: response.data.slug,
                    },
                  }),
                ),
                of(
                  actions.CHANGE_CATALOGUE_NAME_SUCCESS(
                    action.payload.catalogueId,
                  ),
                ),
              ),
            ),
            catchError(() =>
              of(
                actions.CHANGE_CATALOGUE_NAME_FAILURE(
                  action.payload.catalogueId,
                ),
              ),
            ),
          ),
      ),
    ),
  )

export const changeDefaultCatalogueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CHANGE_DEFAULT_CATALOGUE.match),
    switchMap((action) =>
      concat(
        of(
          cataloguesActions.CATALOGUE_UPDATED({
            id: action.payload.catalogueId,
            changes: {
              default: action.payload.default,
            },
          }),
        ),
        axiosInstance$
          .patch(`/catalogues/${action.payload.catalogueId}/`, {
            default: action.payload.default,
          })
          .pipe(
            map(() => actions.CHANGE_DEFAULT_CATALOGUE_SUCCESS()),
            catchError(() =>
              concat(
                of(
                  cataloguesActions.CATALOGUE_UPDATED({
                    id: action.payload.catalogueId,
                    changes: {
                      default: !action.payload.default,
                    },
                  }),
                ),
                of(
                  actions.CHANGE_DEFAULT_CATALOGUE_FAILURE(
                    action.payload.catalogueId,
                  ),
                ),
              ),
            ),
          ),
      ),
    ),
  )

export const changePublicCatalogueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.CHANGE_PUBLIC_CATALOGUE.match),
    switchMap((action) =>
      concat(
        of(
          cataloguesActions.CATALOGUE_UPDATED({
            id: action.payload.catalogueId,
            changes: {
              public: action.payload.public,
            },
          }),
        ),
        axiosInstance$
          .patch(`/catalogues/${action.payload.catalogueId}/`, {
            public: action.payload.public,
          })
          .pipe(
            map(() => actions.CHANGE_PUBLIC_CATALOGUE_SUCCESS()),
            catchError(() =>
              concat(
                of(
                  cataloguesActions.CATALOGUE_UPDATED({
                    id: action.payload.catalogueId,
                    changes: {
                      public: !action.payload.public,
                    },
                  }),
                ),
                of(
                  actions.CHANGE_PUBLIC_CATALOGUE_FAILURE(
                    action.payload.catalogueId,
                  ),
                ),
              ),
            ),
          ),
      ),
    ),
  )

export const postCatalogueImageEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.POST_CATALOGUE_IMAGE.match),
    switchMap((action) =>
      concat(
        of(actions.POST_CATALOGUE_IMAGE_START(action.payload.catalogueId)),
        from(fetch(action.payload.image))
          .pipe(
            mergeMap(async (r) => await r.blob()),
            mergeMap((imageBlob) => {
              const data = new FormData()
              const extension = mime.extension(imageBlob.type)
              if (extension) {
                data.append('image', imageBlob, `image.${extension}`)
              }
              return axiosInstance$.patch(
                `/catalogues/${action.payload.catalogueId}/`,
                data,
              )
            }),
          )
          .pipe(
            mergeMap((response) =>
              concat(
                of(
                  cataloguesActions.CATALOGUE_UPDATED({
                    id: action.payload.catalogueId,
                    changes: {
                      image: response.data.image,
                      imageThumbnail: response.data.image_thumbnail,
                    },
                  }),
                ),
                of(
                  actions.POST_CATALOGUE_IMAGE_SUCCESS(
                    action.payload.catalogueId,
                  ),
                ),
              ),
            ),
            catchError(() =>
              of(
                actions.POST_CATALOGUE_IMAGE_FAILURE(
                  action.payload.catalogueId,
                ),
              ),
            ),
          ),
      ),
    ),
  )

export const deleteCatalogueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.DELETE_CATALOGUE.match),
    mergeMap((action) =>
      concat(
        of(actions.DELETE_CATALOGUE_START(action.payload)),
        defer(() => {
          axiosInstance$.delete(`/catalogues/${action.payload}/`)
          return EMPTY
        }).pipe(
          mergeMap(() =>
            concat(
              of(actions.DELETE_CATALOGUE_SUCCESS(action.payload)),
              of(cataloguesActions.CATALOGUE_REMOVED(action.payload)),
            ),
          ),
          catchError(() =>
            of(actions.DELETE_CATALOGUE_FAILURE(action.payload)),
          ),
        ),
      ),
    ),
  )

export const addCatalogueToFavouritesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.ADD_CATALOGUE_TO_FAVOURITE.match),
    switchMap((action) =>
      concat(
        of(
          cataloguesActions.CATALOGUE_UPDATED({
            id: action.payload,
            changes: {
              isFavourite: true,
            },
          }),
        ),
        defer(() =>
          axiosInstance$
            .put(`/catalogues/${action.payload}/favourite/`, {
              is_favourite: true,
            })
            .pipe(
              map(() => FETCH_FAVOURITE_CATALOGUES()),
              catchError(() =>
                concat(
                  of(
                    actions.ADD_CATALOGUE_TO_FAVOURITE_FAILURE(action.payload),
                  ),
                  of(
                    cataloguesActions.CATALOGUE_UPDATED({
                      id: action.payload,
                      changes: {
                        isFavourite: false,
                      },
                    }),
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
  )

export const deleteCatalogueFromFavouriteEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(actions.DELETE_CATALOGUE_FROM_FAVOURITE.match),
    switchMap((action) =>
      concat(
        of(
          cataloguesActions.CATALOGUE_UPDATED({
            id: action.payload,
            changes: {
              isFavourite: false,
            },
          }),
        ),
        defer(() =>
          axiosInstance$
            .delete(`/catalogues/${action.payload}/favourite/`)
            .pipe(
              map(() => FETCH_FAVOURITE_CATALOGUES()),
              catchError(() =>
                concat(
                  of(
                    actions.DELETE_CATALOGUE_FROM_FAVOURITE_FAILURE(
                      action.payload,
                    ),
                  ),
                  of(
                    cataloguesActions.CATALOGUE_UPDATED({
                      id: action.payload,
                      changes: {
                        isFavourite: true,
                      },
                    }),
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
  )

export const authUserCataloguesEpics = typedCombineEpics(
  createCatalogueEpic,
  fetchAuthUserCataloguesEpic,
  refreshCatalogueEpic,
  changeCatalogueNameEpic,
  changeDefaultCatalogueEpic,
  changePublicCatalogueEpic,
  postCatalogueImageEpic,
  deleteCatalogueEpic,
  addCatalogueToFavouritesEpic,
  deleteCatalogueFromFavouriteEpic,
)
