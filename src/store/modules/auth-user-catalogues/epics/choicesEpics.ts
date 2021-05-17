import { combineEpics } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { concat, of, Observable, merge, forkJoin } from 'rxjs'
import { catchError, mergeMap, filter, map, defaultIfEmpty } from 'rxjs/operators'
//Actions
import * as actions from "../slice"
import * as choicesEntitiesActions from "store/entities/choices/slice"

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

export const fetchAuthUserCataloguesChoicesEpic = (action$: Observable<Action>) => merge(
    action$.pipe(filter(actions.FETCH_AUTH_USER_CATALOGUES_FIELDS_SUCCESS.match)),
).pipe(mergeMap(action => {
    const fields = action.payload.filter(f =>
        f.type === 'multiple_choice' || f.type === 'single_choice'
    )

    if (fields.length === 0) {
        return of(actions.AUTH_USER_CATALOGUES_CHOICES_NOT_NEEDED())
    }

    const requests = fields.map(field =>
        axiosInstance$.get('/choices/', {
            params: { field_id: field.id }
        }).pipe(map(response => response.data))
    )

    return forkJoin(requests).pipe(
        mergeMap(data => concat(
            of(choicesEntitiesActions.CHOICES_UPDATED(data.flat())),
            of(actions.FETCH_AUTH_USER_CATALOGUES_CHOICES_SUCCESS()),
        )),
        catchError(() => of(actions.FETCH_AUTH_USER_CATALOGUES_CHOICES_FAILURE()))
    )
}))

export const postFieldChoiceEpic = (action$: Observable<Action>) => action$.pipe(
    filter(actions.POST_FIELD_CHOICE.match),
    mergeMap(action => concat(
        axiosInstance$.post(`/choices/`, {
            field_id: action.payload.fieldId,
            value: action.payload.name,
        }).pipe(
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
        axiosInstance$.delete(`/choices/${action.payload.choiceId}/`).pipe(
            mergeMap(() => concat(
                of(actions.REMOVE_FIELD_CHOICE_SUCCESS(action.payload)),
                of(choicesEntitiesActions.CHOICE_REMOVED(action.payload.choiceId)),
            )),
            catchError(() => of(actions.REMOVE_FIELD_CHOICE_FAILURE(action.payload)))
        )
    ))
)

export const authUserChoicesEpics = combineEpics(
    fetchFieldsChoicesEpic,
    fetchAuthUserCataloguesChoicesEpic,
    postFieldChoiceEpic,
    removeFieldChoiceEpic,
)