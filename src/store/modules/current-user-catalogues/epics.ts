import {
  concat,
  of,
  defer,
  forkJoin,
  Observable,
  merge,
  iif,
  EMPTY,
} from 'rxjs'
import {
  catchError,
  mergeMap,
  switchMap,
  withLatestFrom,
  filter,
  map,
  defaultIfEmpty,
} from 'rxjs/operators'
import { Action } from '@reduxjs/toolkit'
import { axiosInstance$ } from 'src/axiosInstance'
import { RootState } from 'store/storeConfig'
import * as actions from './slice'
import * as cataloguesEntitiesActions from 'store/entities/catalogues/slice'
import * as fieldsEntitiesActions from 'store/entities/fields/slice'
import * as choicesEntitiesActions from 'store/entities/choices/slice'
import { FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS } from 'store/modules/auth-user-catalogues/slice'
import { typedCombineEpics } from 'store/utils'
import { Catalogue, Choice, Field } from 'src/globalTypes'
import { fieldsDeserializer } from 'src/serializers'

export const fetchCurrentUserCataloguesEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_CURRENT_USER_CATALOGUES.match),
    withLatestFrom(
      state$.pipe(map((state) => state.modules.currentUser.userId)),
    ),
    switchMap(([_, id]) =>
      concat(
        of(actions.FETCH_CURRENT_USER_CATALOGUES_START()),
        axiosInstance$
          .get<Catalogue[]>('/catalogues/', {
            params: { created_by: id },
          })
          .pipe(
            mergeMap((response) =>
              concat(
                of(cataloguesEntitiesActions.CATALOGUES_UPDATED(response.data)),
                of(
                  actions.FETCH_CURRENT_USER_CATALOGUES_SUCCESS(response.data),
                ),
              ),
            ),
            catchError(() =>
              of(actions.FETCH_CURRENT_USER_CATALOGUES_FAILURE()),
            ),
          ),
      ),
    ),
  )

export const fetchCurrentUserCatalogueFieldsEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.FETCH_CURRENT_USER_CATALOGUE_FIELDS.match),
    mergeMap((action) =>
      concat(
        of(actions.FETCH_CURRENT_USER_CATALOGUE_FIELDS_START(action.payload)),
        defer(() =>
          axiosInstance$.get<Field[]>('/fields/', {
            params: { catalogue_id: action.payload },
          }),
        ).pipe(
          map((response) => fieldsDeserializer(response.data)),
          withLatestFrom(state$),
          mergeMap(([fields, state]) =>
            concat(
              // Set auth user fields and fetch choices if current user == auth user
              // do not have to fetch fields and choices twice
              iif(
                () =>
                  state.modules.authUser.id ===
                  state.modules.currentUser.userId,
                of(
                  FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS({
                    fields,
                    catalogueId: action.payload,
                  }),
                ),
                EMPTY,
              ),
              of(fieldsEntitiesActions.FIELDS_UPDATED(fields)),
              of(
                actions.FETCH_CURRENT_USER_CATALOGUE_FIELDS_SUCCESS({
                  fields,
                  catalogueId: action.payload,
                }),
              ),
            ),
          ),
          catchError(() =>
            of(
              actions.FETCH_CURRENT_USER_CATALOGUE_FIELDS_FAILURE(
                action.payload,
              ),
            ),
          ),
        ),
      ),
    ),
  )

export const fetchCurrentUserFieldsChoicesEpic = (
  action$: Observable<Action>,
) =>
  merge(
    action$.pipe(
      filter(actions.FETCH_CURRENT_USER_CATALOGUE_FIELDS_SUCCESS.match),
    ),
  ).pipe(
    mergeMap((action) => {
      const fields = action.payload.fields.filter(
        (f) => f.type === 'multiple_choice' || f.type === 'single_choice',
      )

      const requests = Object.fromEntries(
        fields.map((field) => [
          field.id,
          axiosInstance$
            .get<Choice[]>('/choices/', {
              params: { field_id: field.id },
            })
            .pipe(map((response) => response.data)),
        ]),
      )

      return concat(
        of(
          actions.FETCH_CURRENT_USER_FIELDS_CHOICES_START(
            action.payload.catalogueId,
          ),
        ),
        forkJoin(requests).pipe(
          defaultIfEmpty({}),
          mergeMap((data) =>
            concat(
              of(
                choicesEntitiesActions.CHOICES_UPDATED(
                  Object.values(data).flat(),
                ),
              ),
              of(
                actions.FETCH_CURRENT_USER_FIELDS_CHOICES_SUCCESS({
                  catalogueId: action.payload.catalogueId,
                  data,
                }),
              ),
            ),
          ),
          catchError(() =>
            of(
              actions.FETCH_CURRENT_USER_FIELDS_CHOICES_FAILURE(
                action.payload.catalogueId,
              ),
            ),
          ),
        ),
      )
    }),
  )

export const currentUserCataloguesEpics = typedCombineEpics(
  fetchCurrentUserCataloguesEpic,
  fetchCurrentUserCatalogueFieldsEpic,
  fetchCurrentUserFieldsChoicesEpic,
)
