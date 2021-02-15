import { combineEpics, ofType } from "redux-observable"
import { Action } from "@reduxjs/toolkit"
import { axiosInstance$ } from "src/axiosInstance"
import { of, from, concat, forkJoin, Observable } from 'rxjs'
import { catchError, filter, mapTo, mergeMap, switchMap } from 'rxjs/operators'
//Store types
import { AppActionTypes, EpicType } from 'store/storeTypes/appTypes'
import {
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES,
    MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD,
    ChangeCatalogueName, PostChoiceFieldChanges,
    PostTextFieldNameChange, CreateCatalogueField
} from 'store/storeTypes/settingsTypes'
import {
    changeCatalogueNameStart, changeCatalogueNameSuccess, changeCatalogueNameFailure,
    postTextFieldNameChangeStart, postTextFieldNameChangeSuccess, postTextFieldNameChangeFailure,
    postChoiceFieldChangesStart, postChoiceFieldChangesSuccess, postChoiceFieldChangesFailure,
    createCatalogueFieldStart, createCatalogueFieldSuccess, createCatalogueFieldFailure,
} from "store/actions/settingsActions"
import { DeserializedChoice } from "src/globalTypes"
import {
    CHANGE_USERNAME, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAILURE,
    CHANGE_PASSWORD, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
} from "store/slices/settingsSlices/myAccountSlice/myAccountSlice"
import {
    CREATE_CATALOGUE, CREATE_CATALOGUE_START, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE,
} from "store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice"

export const changeUsernameEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CHANGE_USERNAME.match),
    switchMap(action => concat(
        of(CHANGE_USERNAME_START()),
        axiosInstance$.patch('/user/', {
            username: action.payload
        }).pipe(
            mergeMap((response) => of(
                CHANGE_USERNAME_SUCCESS(response.data)
            )),
            catchError(() => of(CHANGE_USERNAME_FAILURE()))
        )
    ))
)

export const changePasswordEpic = (action$: Observable<Action>) => action$.pipe(
    filter(CHANGE_PASSWORD.match),
    switchMap(action => concat(
        of(CHANGE_PASSWORD_START()),
        axiosInstance$.post('/password/change/', {
            new_password1: action.payload.password1,
            new_password2: action.payload.password2
        }).pipe(
            mergeMap(() => of(CHANGE_PASSWORD_SUCCESS())),
            catchError(() => of(CHANGE_PASSWORD_FAILURE()))
        )
    ))
)

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

export const changeCatalogueNameEpic: EpicType = (action$, state$) => action$.pipe(
    ofType<AppActionTypes, ChangeCatalogueName>(MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME),
    switchMap((action) => concat(
        of(changeCatalogueNameStart(action.catalogueId)),
        forkJoin([concat(
            axiosInstance$.patch(`/catalogues/${action.catalogueId}/`, {
                name: action.newName
            }),
            axiosInstance$.get(`/catalogues/${action.catalogueId}`))
        ]).pipe(
            mergeMap(response =>
                of(changeCatalogueNameSuccess(response[0].data, action.location))
            ),
            catchError(() => of(changeCatalogueNameFailure(action.catalogueId)))
        )
    ))
)

export const postTextFieldNameChangeEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, PostTextFieldNameChange>(MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE),
    switchMap(action => concat(
        of(postTextFieldNameChangeStart(action.fieldId, action.catalogueId)),
        axiosInstance$.patch(`/fields/${action.fieldId}/`, {
            name: action.fieldName,
        }).pipe(
            mapTo(postTextFieldNameChangeSuccess(action.fieldId, action.catalogueId)),
            catchError(() => of(postTextFieldNameChangeFailure(action.fieldId, action.catalogueId)))
        ))
    )
)

export const postChoiceFieldChangesEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, PostChoiceFieldChanges>(MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES),
    switchMap(action => {
        const isNew = (choice: DeserializedChoice) => choice.id.toString().startsWith('newChoice')
        const removedChoices = action.field.removedChoices
        const newChoices = action.field.choices.filter(isNew)

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
        requests.push(axiosInstance$.patch(`/fields/${action.field.id}/`, {
            name: action.fieldName,
        }))

        return concat(
            of(postChoiceFieldChangesStart(action.field.id, action.field.catalogueId)),
            forkJoin(requests).pipe(
                mapTo(postChoiceFieldChangesSuccess(action.field.id, action.field.catalogueId)),
                catchError(() => of(postChoiceFieldChangesFailure(action.field.id, action.field.catalogueId)))
            ),
        )
    })
)

export const createCatalogueFieldEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, CreateCatalogueField>(MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD),
    switchMap(action => concat(
        of(createCatalogueFieldStart(action.catalogueId)),
        axiosInstance$.post(`/fields/`, {
            name: action.fieldName,
            catalogue_id: action.catalogueId,
            type: action.fieldType,
            position: action.position,
        }).pipe(
            mapTo(createCatalogueFieldSuccess(action.catalogueId)),
            catchError(() => of(createCatalogueFieldFailure(action.catalogueId)))
        ))
    )
)

export const settingsEpics = combineEpics(
    changeUsernameEpic,
    changePasswordEpic,
    createCatalogueEpic,
    changeCatalogueNameEpic,
    postTextFieldNameChangeEpic,
    postChoiceFieldChangesEpic,
    createCatalogueFieldEpic,
)