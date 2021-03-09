import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable, merge } from 'rxjs'
import {
    catchError, mergeMap, pluck, switchMap, withLatestFrom, retryWhen, filter, mapTo, map,
    defaultIfEmpty,
} from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Types
import { RootState } from "store/storeConfig"
//Actions
import * as actions from "store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice"

export const createCatalogueEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CREATE_CATALOGUE.match),
    switchMap(action => concat(
        of(actions.CREATE_CATALOGUE_START()),
        axiosInstance$.post('/catalogues/', {
            name: action.payload,
        }).pipe(
            map(response => actions.CREATE_CATALOGUE_SUCCESS(response.data)),
            catchError(() => of(actions.CREATE_CATALOGUE_FAILURE()))
        )
    ))
)

export const changeCatalogueNameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_CATALOGUE_NAME.match),
    switchMap(action => concat(
        of(actions.CHANGE_CATALOGUE_NAME_START(action.payload.catalogueId)),
        axiosInstance$.patch(`/catalogues/${action.payload.catalogueId}/`, {
            name: action.payload.name
        }).pipe(
            map(response =>
                actions.CHANGE_CATALOGUE_NAME_SUCCESS(response.data)
            ),
            catchError(() => of(actions.CHANGE_CATALOGUE_NAME_FAILURE(action.payload.catalogueId)))
        )
    ))
)

export const changeDefaultCatalogueEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_DEFAULT_CATALOGUE.match),
    switchMap(action => concat(
        of(actions.CHANGE_DEFAULT_CATALOGUE_START()),
        defer(() => axiosInstance$.patch(`/catalogues/${action.payload.catalogueId}/`, {
            default: action.payload.default,
        })).pipe(
            map(response => actions.CHANGE_DEFAULT_CATALOGUE_SUCCESS({
                catalogueId: action.payload.catalogueId,
                default: action.payload.default,
            })),
            catchError(() => of(actions.CHANGE_DEFAULT_CATALOGUE_FAILURE(
                action.payload.catalogueId,
            )))
        )
    ))
)

export const deleteCatalogueEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_CATALOGUE.match),
    mergeMap(action => concat(
        of(actions.DELETE_CATALOGUE_START(action.payload)),
        defer(() => axiosInstance$.delete(`/catalogues/${action.payload}/`)).pipe(
            map(() => actions.DELETE_CATALOGUE_SUCCESS(action.payload)),
            catchError(() => of(actions.DELETE_CATALOGUE_FAILURE(action.payload)))
        )
    ))
)

export const postChoiceEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_CHOICE.match),
    mergeMap(action => concat(
        of(actions.POST_CHOICE_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.post(`/choices/`, {
            field_id: action.payload.fieldId,
            value: action.payload.name,
        })).pipe(
            map(response => actions.POST_CHOICE_SUCCESS({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
                choice: response.data,
            })),
            catchError(() => of(actions.POST_CHOICE_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const changeFieldNameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_FIELD_NAME.match),
    switchMap(action => concat(
        of(actions.CHANGE_FIELD_NAME_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.patch(`/fields/${action.payload.fieldId}/`, {
            name: action.payload.name,
        })).pipe(
            map(response => actions.CHANGE_FIELD_NAME_SUCCESS({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
                field: response.data,
            })),
            catchError(() => of(actions.CHANGE_FIELD_NAME_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const removeChoiceEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.REMOVE_CHOICE.match),
    mergeMap(action => concat(
        of(actions.REMOVE_CHOICE_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.delete(`/choices/${action.payload.choiceId}/`)).pipe(
            map(() => actions.REMOVE_CHOICE_SUCCESS({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
                choiceId: action.payload.choiceId,
            })),
            catchError(() => of(actions.REMOVE_CHOICE_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const deleteCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_CATALOGUE_FIELD.match),
    mergeMap(action => concat(
        of(actions.DELETE_CATALOGUE_FIELD_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.delete(`/fields/${action.payload.fieldId}/`)).pipe(
            map(() => actions.DELETE_CATALOGUE_FIELD_SUCCESS(action.payload.catalogueId)),
            catchError(() => of(actions.DELETE_CATALOGUE_FIELD_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const createCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CREATE_CATALOGUE_FIELD.match),
    switchMap(action => concat(
        of(actions.CREATE_CATALOGUE_FIELD_START(action.payload.catalogueId)),
        axiosInstance$.post(`/fields/`, {
            name: action.payload.name,
            catalogue_id: action.payload.catalogueId,
            type: action.payload.type,
            position: action.payload.position,
        }).pipe(
            mapTo(actions.CREATE_CATALOGUE_FIELD_SUCCESS(action.payload.catalogueId)),
            catchError(() => of(actions.CREATE_CATALOGUE_FIELD_FAILURE(action.payload.catalogueId)))
        ))
    )
)

export const refreshCatalogueEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.REFRESH_CATALOGUE.match),
    switchMap(action => concat(
        of(actions.REFRESH_CATALOGUE_START()),
        axiosInstance$.get(`/catalogues/${action.payload}/`).pipe(
            map(response => actions.REFRESH_CATALOGUE_SUCCESS(response.data)),
            catchError(() => of(actions.REFRESH_CATALOGUE_FAILURE()))
        )
    ))
)

export const fetchCataloguesEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
    filter(actions.FETCH_CATALOGUES.match),
    withLatestFrom(state$.pipe(pluck('auth', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(actions.FETCH_CATALOGUES_START()),
        axiosInstance$.get('/catalogues/', {
            params: { created_by: id }
        }).pipe(
            map(response => actions.FETCH_CATALOGUES_SUCCESS(response.data)),
            catchError(() => of(actions.FETCH_CATALOGUES_FAILURE()))
        )
    ))
)

export const refreshCatalogueFieldsEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_CATALOGUE_FIELDS.match)),
    action$.pipe(filter(actions.CREATE_CATALOGUE_FIELD_SUCCESS.match)),
    action$.pipe(filter(actions.DELETE_CATALOGUE_FIELD_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_CATALOGUE_FIELDS(action.payload))
)

export const fetchCatalogueFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CATALOGUE_FIELDS.match),
    mergeMap(action => concat(
        of(actions.FETCH_CATALOGUE_FIELDS_START(action.payload)),
        defer(() => axiosInstance$.get('/fields/', {
            params: { catalogue_id: action.payload }
        })).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.FETCH_CATALOGUE_FIELDS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload
                })
            ),
            catchError(() => of(actions.FETCH_CATALOGUE_FIELDS_FAILURE(action.payload)))
        )
    ))
)

export const refreshCatalogueFieldEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_CATALOGUE_FIELD.match)),
).pipe(
    map(action => actions.FETCH_CATALOGUE_FIELD({
        catalogueId: action.payload.catalogueId,
        fieldId: action.payload.fieldId
    }))
)

export const fetchCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CATALOGUE_FIELD.match),
    mergeMap(action => concat(
        of(actions.FETCH_CATALOGUE_FIELD_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.get(`/fields/${action.payload.fieldId}/`)).pipe(
            retryWhen(err => retry$(err)),
            map(response =>
                actions.FETCH_CATALOGUE_FIELD_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                })
            ),
            catchError(() => of(actions.FETCH_CATALOGUE_FIELD_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const fetchFieldChoicesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_FIELD_CHOICES.match),
    mergeMap(action => concat(
        of(actions.FETCH_FIELD_CHOICES_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        axiosInstance$.get('/choices/', {
            params: { field_id: action.payload.fieldId }
        }).pipe(
            map(response =>
                actions.FETCH_FIELD_CHOICES_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,

                })
            ),
            catchError(() => of(actions.FETCH_FIELD_CHOICES_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const fetchFieldsChoicesEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.FETCH_CATALOGUE_FIELDS_SUCCESS.match)),
).pipe(mergeMap(action => {
    const fields = action.payload.data.filter(f =>
        f.type === 'multiple_choice' || f.type === 'single_choice'
    )

    const requests = Object.fromEntries(
        fields.map(field => [
            field.id,
            axiosInstance$.get('/choices/', {
                params: { field_id: field.id }
            }).pipe(map(response => response.data))
        ])
    )

    return concat(
        of(actions.FETCH_FIELDS_CHOICES_START(action.payload.catalogueId)),
        forkJoin<typeof requests, string>(requests).pipe(
            defaultIfEmpty(),
            map(data => actions.FETCH_FIELDS_CHOICES_SUCCESS({
                catalogueId: action.payload.catalogueId,
                data,
            })),
            catchError(() => of(actions.FETCH_FIELDS_CHOICES_FAILURE(action.payload.catalogueId)))
        ))
}))

export const cataloguesEpics = combineEpics(
    createCatalogueEpic,
    changeCatalogueNameEpic,
    changeDefaultCatalogueEpic,
    deleteCatalogueEpic,
    postChoiceEpic,
    removeChoiceEpic,
    deleteCatalogueFieldEpic,
    changeFieldNameEpic,
    createCatalogueFieldEpic,
    refreshCatalogueEpic,
    fetchCataloguesEpic,
    refreshCatalogueFieldEpic,
    fetchCatalogueFieldEpic,
    refreshCatalogueFieldsEpic,
    fetchCatalogueFieldsEpic,
    fetchFieldChoicesEpic,
    fetchFieldsChoicesEpic,
)