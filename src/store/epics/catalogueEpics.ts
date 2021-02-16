import { combineEpics } from "redux-observable"
import { concat, of, defer, forkJoin, Observable, from } from 'rxjs'
import { catchError, mergeMap, pluck, switchMap, withLatestFrom, retryWhen, filter, mapTo } from 'rxjs/operators'
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
//Store observables
import { retry$ } from "store/storeObservables"
//Types
import { RootState } from "store/storeConfig"
import { DeserializedChoice } from "src/globalTypes"
//Actions
import {
    CREATE_CATALOGUE_FIELD_SUCCESS,
    FETCH_CATALOGUES, FETCH_CATALOGUES_FAILURE, FETCH_CATALOGUES_START, FETCH_CATALOGUES_SUCCESS,
    REFRESH_CATALOGUE_FIELD,
    FETCH_CATALOGUE_FIELD, FETCH_CATALOGUE_FIELD_START, FETCH_CATALOGUE_FIELD_SUCCESS, FETCH_CATALOGUE_FIELD_FAILURE,
    FETCH_CATALOGUE_FIELDS, FETCH_CATALOGUE_FIELDS_FAILURE, FETCH_CATALOGUE_FIELDS_START, FETCH_CATALOGUE_FIELDS_SUCCESS,
    FETCH_FIELDS_CHOICES, FETCH_FIELDS_CHOICES_START, FETCH_FIELDS_CHOICES_SUCCESS, FETCH_FIELDS_CHOICES_FAILURE,
    CREATE_CATALOGUE, CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE,
    CHANGE_CATALOGUE_NAME, CHANGE_CATALOGUE_NAME_START, CHANGE_CATALOGUE_NAME_SUCCESS, CHANGE_CATALOGUE_NAME_FAILURE,
    POST_TEXT_FIELD_NAME_CHANGE, POST_TEXT_FIELD_NAME_CHANGE_START, POST_TEXT_FIELD_NAME_CHANGE_SUCCESS, POST_TEXT_FIELD_NAME_CHANGE_FAILURE,
    POST_CHOICE_FIELD_CHANGES, POST_CHOICE_FIELD_CHANGES_SUCCESS, POST_CHOICE_FIELD_CHANGES_START, POST_CHOICE_FIELD_CHANGES_FAILURE,
    CREATE_CATALOGUE_FIELD, CREATE_CATALOGUE_FIELD_START, CREATE_CATALOGUE_FIELD_FAILURE, REFRESH_CATALOGUE_FIELDS,
} from "store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice"

export const createCatalogueEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CREATE_CATALOGUE.match),
    switchMap(() => concat(
        of(CREATE_CATALOGUE_START()),
        axiosInstance$.post('/catalogues/', {
            name: 'New catalogue'
        }).pipe(
            mergeMap(response => of(CREATE_CATALOGUE_SUCCESS(response.data))),
            catchError(() => of(CREATE_CATALOGUE_FAILURE()))
        )
    ))
)

export const changeCatalogueNameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CHANGE_CATALOGUE_NAME.match),
    switchMap((action) => concat(
        of(CHANGE_CATALOGUE_NAME_START(action.payload.catalogueId)),
        forkJoin([concat(
            axiosInstance$.patch(`/catalogues/${action.payload.catalogueId}/`, {
                name: action.payload.name
            }),
            axiosInstance$.get(`/catalogues/${action.payload.catalogueId}`))
        ]).pipe(
            mergeMap(response =>
                of(CHANGE_CATALOGUE_NAME_SUCCESS(response[0].data))
            ),
            catchError(() => of(CHANGE_CATALOGUE_NAME_FAILURE(action.payload.catalogueId)))
        )
    ))
)

export const postTextFieldNameChangeEpic = (action$: Observable<Action>) => action$.pipe(
    filter(POST_TEXT_FIELD_NAME_CHANGE.match),
    switchMap(action => concat(
        of(POST_TEXT_FIELD_NAME_CHANGE_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId
        })),
        axiosInstance$.patch(`/fields/${action.payload.fieldId}/`, {
            name: action.payload.name,
        }).pipe(
            mapTo(POST_TEXT_FIELD_NAME_CHANGE_SUCCESS({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })),
            catchError(() => of(POST_TEXT_FIELD_NAME_CHANGE_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        ))
    )
)

export const postChoiceFieldChangesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(POST_CHOICE_FIELD_CHANGES.match),
    switchMap(action => {
        const isNew = (choice: DeserializedChoice) => choice.id.toString().startsWith('newChoice')
        const removedChoices = action.payload.field.removedChoices
        const newChoices = action.payload.field.choices.filter(isNew)

        const requests = []
        if (removedChoices.length || newChoices.length) {
            requests.push(concat(
                forkJoin([
                    ...removedChoices.filter(c => !isNew(c)).map(choice =>
                        axiosInstance$.delete(`/choices/${choice.id}/`)
                    )
                ]),
                from(newChoices).pipe(
                    mergeMap(choice => axiosInstance$.post(`/choices/`, {
                        field_id: choice.fieldId,
                        value: choice.value,
                    })),
                ),
            ))
        }
        requests.push(axiosInstance$.patch(`/fields/${action.payload.field.id}/`, {
            name: action.payload.name,
        }))

        return concat(
            of(POST_CHOICE_FIELD_CHANGES_START({
                catalogueId: action.payload.field.catalogueId,
                fieldId: action.payload.field.id,
            })),
            forkJoin(requests).pipe(
                mapTo(POST_CHOICE_FIELD_CHANGES_SUCCESS({
                    catalogueId: action.payload.field.catalogueId,
                    fieldId: action.payload.field.id,
                })),
                catchError(() => of(POST_CHOICE_FIELD_CHANGES_FAILURE({
                    catalogueId: action.payload.field.catalogueId,
                    fieldId: action.payload.field.id,
                })))
            ),
        )
    })
)

export const createCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CREATE_CATALOGUE_FIELD.match),
    switchMap(action => concat(
        of(CREATE_CATALOGUE_FIELD_START(action.payload.catalogueId)),
        axiosInstance$.post(`/fields/`, {
            name: action.payload.name,
            catalogue_id: action.payload.catalogueId,
            type: action.payload.type,
            position: action.payload.position,
        }).pipe(
            mapTo(CREATE_CATALOGUE_FIELD_SUCCESS(action.payload.catalogueId)),
            catchError(() => of(CREATE_CATALOGUE_FIELD_FAILURE(action.payload.catalogueId)))
        ))
    )
)

export const fetchCataloguesEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
    filter(FETCH_CATALOGUES.match),
    withLatestFrom(state$.pipe(pluck('auth', 'user', 'id'))),
    switchMap(([_, id]) => concat(
        of(FETCH_CATALOGUES_START()),
        axiosInstance$.get('/catalogues/', {
            params: { created_by: id }
        }).pipe(
            mergeMap(response => of(FETCH_CATALOGUES_SUCCESS(response.data))),
            catchError(() => of(FETCH_CATALOGUES_FAILURE()))
        )
    ))
)

export const refreshCatalogueFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(
        CREATE_CATALOGUE_FIELD_SUCCESS.match ||
        REFRESH_CATALOGUE_FIELDS.match
    ),
    mergeMap(action => of(FETCH_CATALOGUE_FIELDS(action.payload)))
)

export const fetchCatalogueFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(FETCH_CATALOGUE_FIELDS.match),
    mergeMap(action => concat(
        of(FETCH_CATALOGUE_FIELDS_START(action.payload)),
        defer(() => axiosInstance$.get('/fields/', {
            params: { catalogue_id: action.payload }
        })).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(FETCH_CATALOGUE_FIELDS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload
                }))
            ),
            catchError(() => of(FETCH_CATALOGUE_FIELDS_FAILURE(action.payload)))
        )
    ))
)

export const refreshCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(
        REFRESH_CATALOGUE_FIELD.match ||
        POST_CHOICE_FIELD_CHANGES_SUCCESS.match ||
        POST_TEXT_FIELD_NAME_CHANGE_SUCCESS.match
    ),
    mergeMap(action => of(FETCH_CATALOGUE_FIELD({
        catalogueId: action.payload.catalogueId,
        fieldId: action.payload.fieldId
    })))
)

export const fetchCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(FETCH_CATALOGUE_FIELD.match),
    mergeMap(action => concat(
        of(FETCH_CATALOGUE_FIELD_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.get(`/fields/${action.payload.fieldId}/`)).pipe(
            retryWhen(err => retry$(err)),
            mergeMap(response =>
                of(FETCH_CATALOGUE_FIELD_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                }))
            ),
            catchError(() => of(FETCH_CATALOGUE_FIELD_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const fetchFieldsChoicesEpic = (action$: Observable<Action>) => action$.pipe(
    filter(FETCH_FIELDS_CHOICES.match),
    mergeMap(action => concat(
        of(FETCH_FIELDS_CHOICES_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        axiosInstance$.get('/choices/', {
            params: { field_id: action.payload.fieldId }
        }).pipe(
            mergeMap(response =>
                of(FETCH_FIELDS_CHOICES_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,

                }))
            ),
            catchError(() => of(FETCH_FIELDS_CHOICES_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const cataloguesEpics = combineEpics(
    createCatalogueEpic,
    changeCatalogueNameEpic,
    postTextFieldNameChangeEpic,
    postChoiceFieldChangesEpic,
    createCatalogueFieldEpic,
    fetchCataloguesEpic,
    refreshCatalogueFieldEpic,
    fetchCatalogueFieldEpic,
    refreshCatalogueFieldsEpic,
    fetchCatalogueFieldsEpic,
    fetchFieldsChoicesEpic,
)