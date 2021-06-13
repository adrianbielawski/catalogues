import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, Observable, merge, forkJoin } from 'rxjs'
import { catchError, mergeMap, switchMap, filter, map, defaultIfEmpty } from 'rxjs/operators'
//Actions
import * as actions from "../slice"
import * as fieldsEntitiesActions from "store/entities/fields/slice"

export const refreshCatalogueFieldEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_CATALOGUE_FIELD.match)),
).pipe(
    map(action => actions.FETCH_CATALOGUE_FIELD(action.payload))
)

export const fetchCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_CATALOGUE_FIELD.match),
    mergeMap(action =>
        defer(() => axiosInstance$.get(`/fields/${action.payload.fieldId}/`)).pipe(
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELD_UPDATED(response.data)),
                of(actions.FETCH_CATALOGUE_FIELD_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                })),
            )),
            catchError(() =>
                of(actions.FETCH_CATALOGUE_FIELD_FAILURE(action.payload.catalogueId))
            )
        )
    )
)

export const refreshCatalogueFieldsEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.CREATE_CATALOGUE_FIELD_SUCCESS.match)),
    action$.pipe(filter(actions.DELETE_CATALOGUE_FIELD_SUCCESS.match)),
    action$.pipe(filter(actions.REORDER_CATALOGUE_FIELDS_SUCCESS.match)),
).pipe(
    map(action => actions.FETCH_AUTH_USER_CATALOGUE_FIELDS(action.payload))
)

export const fetchCatalogueFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_AUTH_USER_CATALOGUE_FIELDS.match),
    mergeMap(action => concat(
        of(actions.FETCH_AUTH_USER_CATALOGUE_FIELDS_START(action.payload)),
        defer(() => axiosInstance$.get('/fields/', {
            params: { catalogue_id: action.payload }
        })).pipe(
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELDS_UPDATED(response.data)),
                of(actions.FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload
                })),
            )),
            catchError(() => of(actions.FETCH_AUTH_USER_CATALOGUE_FIELDS_FAILURE(action.payload)))
        )
    ))
)

export const fetchCataloguesFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.FETCH_AUTH_USER_CATALOGUES_SUCCESS.match),
    mergeMap(action => {
        const requests = action.payload.map(catalogue =>
            axiosInstance$.get('/fields/', {
                params: { catalogue_id: catalogue.id }
            }).pipe(map(response => response.data))
        )

        if (requests.length === 0) {
            return of(actions.AUTH_USER_CATALOGUES_FIELDS_NOT_NEEDED())
        }

        return forkJoin(requests).pipe(
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELDS_UPDATED(response.flat())),
                of(actions.FETCH_AUTH_USER_CATALOGUES_FIELDS_SUCCESS(response.flat())),
            )),
            catchError(() => of(actions.FETCH_AUTH_USER_CATALOGUES_FIELDS_FAILURE()))
        )
    })
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
            public: action.payload.public,
        }).pipe(
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELD_ADDED(response.data)),
                of(actions.CREATE_CATALOGUE_FIELD_SUCCESS(action.payload.catalogueId)),
            )),
            catchError(() => of(actions.CREATE_CATALOGUE_FIELD_FAILURE(action.payload.catalogueId)))
        ))
    )
)

export const deleteCatalogueFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.DELETE_CATALOGUE_FIELD.match),
    mergeMap(action => concat(
        of(actions.DELETE_CATALOGUE_FIELD_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.delete(`/fields/${action.payload.fieldId}/`)).pipe(
            mergeMap(response => concat(
                of(fieldsEntitiesActions.FIELD_REMOVED(response.data)),
                of(actions.DELETE_CATALOGUE_FIELD_SUCCESS(action.payload.catalogueId)),
            )),
            catchError(() => concat(
                of(actions.REFRESH_CATALOGUE_FIELD({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                })),
                of(actions.DELETE_CATALOGUE_FIELD_FAILURE({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                }))
            ))
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
            mergeMap(response => concat(
                of(actions.CHANGE_FIELD_NAME_SUCCESS({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                    field: response.data,
                })),
                of(fieldsEntitiesActions.FIELD_UPDATED({
                    id: action.payload.fieldId,
                    changes: {
                        name: action.payload.name,
                    }
                })),
            )),
            catchError(() => of(actions.CHANGE_FIELD_NAME_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const changePublicFieldEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.CHANGE_FIELD_PUBLIC.match),
    switchMap(action => concat(
        of(fieldsEntitiesActions.FIELD_UPDATED({
            id: action.payload.fieldId,
            changes: {
                public: action.payload.public,
            }
        })),
        defer(() => axiosInstance$.patch(`/fields/${action.payload.fieldId}/`, {
            public: action.payload.public,
        })).pipe(
            map(() => actions.CHANGE_FIELD_PUBLIC_SUCCESS()),
            catchError(() => concat(
                of(actions.CHANGE_FIELD_PUBLIC_FAILURE({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                })),
                of(fieldsEntitiesActions.FIELD_UPDATED({
                    id: action.payload.fieldId,
                    changes: {
                        public: !action.payload.public,
                    }
                })),
            ))
        )
    ))
)

export const reorderCatalogueFieldsEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.REORDER_CATALOGUE_FIELDS.match),
    switchMap(action => concat(
        defer(() => axiosInstance$.patch(`/fields/${action.payload.fieldId}/`, {
            position: action.payload.newPosition,
        })).pipe(
            map(() => actions.REORDER_CATALOGUE_FIELDS_SUCCESS(action.payload.catalogueId)),
            catchError(() =>
                of(actions.REORDER_CATALOGUE_FIELDS_FAILURE({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                }))
            )
        )
    ))
)

export const authUserCataloguesFieldsEpics = combineEpics(
    refreshCatalogueFieldEpic,
    fetchCatalogueFieldEpic,
    refreshCatalogueFieldsEpic,
    fetchCatalogueFieldsEpic,
    fetchCataloguesFieldsEpic,
    createCatalogueFieldEpic,
    deleteCatalogueFieldEpic,
    changeFieldNameEpic,
    changePublicFieldEpic,
    reorderCatalogueFieldsEpic,
)