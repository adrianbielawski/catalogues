import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, defer, Observable, merge, forkJoin } from 'rxjs'
import { catchError, mergeMap, filter, map, defaultIfEmpty } from 'rxjs/operators'
//Actions
import * as actions from "../slice"
import * as choicesEntitiesActions from "store/entities/choices/slice"

export const refreshFieldChoicesEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.REFRESH_FIELD_CHOICES.match)),
).pipe(
    map(action => actions.FETCH_FIELD_CHOICES(action.payload))
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
            mergeMap(response => concat(
                of(choicesEntitiesActions.CHOICES_UPDATED(response.data)),
                of(actions.FETCH_FIELD_CHOICES_SUCCESS({
                    data: response.data,
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                })),
            )),
            catchError(() => of(actions.FETCH_FIELD_CHOICES_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const fetchFieldsChoicesEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.FETCH_AUTH_USER_CATALOGUE_FIELDS_SUCCESS.match)),
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
            mergeMap(data => concat(
                of(choicesEntitiesActions.CHOICES_UPDATED(Object.values(data).flat())),
                of(actions.FETCH_FIELDS_CHOICES_SUCCESS({
                    catalogueId: action.payload.catalogueId,
                    data,
                })),
            )),
            catchError(() => of(actions.FETCH_FIELDS_CHOICES_FAILURE(action.payload.catalogueId)))
        )
    )
}))

export const postFieldChoiceEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_FIELD_CHOICE.match),
    mergeMap(action => concat(
        of(actions.POST_FIELD_CHOICE_START({
            catalogueId: action.payload.catalogueId,
            fieldId: action.payload.fieldId,
        })),
        defer(() => axiosInstance$.post(`/choices/`, {
            field_id: action.payload.fieldId,
            value: action.payload.name,
        })).pipe(
            mergeMap(response => concat(
                of(choicesEntitiesActions.CHOICE_ADDED(response.data)),
                of(actions.POST_FIELD_CHOICE_SUCCESS({
                    catalogueId: action.payload.catalogueId,
                    fieldId: action.payload.fieldId,
                    choice: response.data,
                })),
            )),
            catchError(() => of(actions.POST_FIELD_CHOICE_FAILURE({
                catalogueId: action.payload.catalogueId,
                fieldId: action.payload.fieldId,
            })))
        )
    ))
)

export const removeFieldChoiceEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.REMOVE_FIELD_CHOICE.match),
    mergeMap(action => concat(
        of(actions.REMOVE_FIELD_CHOICE_START(action.payload)),
        defer(() => axiosInstance$.delete(`/choices/${action.payload.choiceId}/`)).pipe(
            mergeMap(() => concat(
                of(actions.REMOVE_FIELD_CHOICE_SUCCESS(action.payload)),
                of(choicesEntitiesActions.CHOICE_REMOVED(action.payload.choiceId)),
            )),
            catchError(() => of(actions.REMOVE_FIELD_CHOICE_FAILURE(action.payload)))
        )
    ))
)

export const authUserChoicesEpics = combineEpics(
    refreshFieldChoicesEpic,
    fetchFieldChoicesEpic,
    fetchFieldsChoicesEpic,
    postFieldChoiceEpic,
    removeFieldChoiceEpic,
)