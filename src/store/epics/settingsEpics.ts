import { combineEpics, ofType } from "redux-observable"
import { axiosInstance$ } from "src/axiosInstance"
import { of, from, concat, forkJoin } from 'rxjs'
import { catchError, mapTo, mergeMap, switchMap } from 'rxjs/operators'
//Store types
import { AppActionTypes, EpicType } from 'store/storeTypes/appTypes'
import { 
    MY_ACCOUNT_CHANGE_USERNAME, MY_ACCOUNT_CHANGE_PASSWORD,
    MANAGE_CATALOGUES_CREATE_CATALOGUE,
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES,
    MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD,
    ChangeUsername, ChangePassword, ChangeCatalogueName, PostChoiceFieldChanges,
    PostTextFieldNameChange, CreateCatalogueField
} from 'store/storeTypes/settingsTypes'
import {
    changeUsernameSuccess, changeUsernameFailure,
    changePasswordSuccess, changePasswordFailure,
    createCatalogueStart, createCatalogueSuccess, createCatalogueFailure,
    changeCatalogueNameStart, changeCatalogueNameSuccess, changeCatalogueNameFailure,
    postTextFieldNameChangeStart, postTextFieldNameChangeSuccess, postTextFieldNameChangeFailure,
    postChoiceFieldChangesStart, postChoiceFieldChangesSuccess, postChoiceFieldChangesFailure,
    createCatalogueFieldStart, createCatalogueFieldSuccess, createCatalogueFieldFailure,
} from "store/actions/settingsActions"

export const changeUsernameEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, ChangeUsername>(MY_ACCOUNT_CHANGE_USERNAME),
    switchMap((action) =>
        axiosInstance$.patch('/user/', {
            username: action.newName
        }).pipe(
            mergeMap((response) => of(
                changeUsernameSuccess(response.data)
            )),
            catchError(err => of(changeUsernameFailure()))
        )
    )
)

export const changePasswordEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, ChangePassword>(MY_ACCOUNT_CHANGE_PASSWORD),
    switchMap((action) =>
        axiosInstance$.post('/password/change/', {
            new_password1: action.newPassword1,
            new_password2: action.newPassword2
        }).pipe(
            mergeMap(() => of(changePasswordSuccess())),
            catchError(err => of(changePasswordFailure()))
        )
    )
)

export const createCatalogueEpic: EpicType = action$ => action$.pipe(
    ofType(MANAGE_CATALOGUES_CREATE_CATALOGUE),
    switchMap(() => concat(
        of(createCatalogueStart()),
        axiosInstance$.post('/catalogues/', {
            name: 'New catalogue'
        }).pipe(
            mergeMap((res) => of(createCatalogueSuccess(res.data))),
            catchError(() => of(createCatalogueFailure()))
        )
    ))
)

export const changeCatalogueNameEpic: EpicType = action$ => action$.pipe(
    ofType<AppActionTypes, ChangeCatalogueName>(MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME),
    switchMap((action) => concat(
        of(changeCatalogueNameStart(action.catalogueId)),
        forkJoin([concat(
            axiosInstance$.patch(`/catalogues/${action.catalogueId}/`, {
                name: action.newName
            }),
            axiosInstance$.get(`/catalogues/${action.catalogueId}`))
        ]).pipe(
            mergeMap(response => of(changeCatalogueNameSuccess(response[0].data))),
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
        const removedChoices = action.field.choices.filter(c => c.removed === true)
        const newChoices = action.field.choices.filter(c => c.id === null)

        const requests = []
        if (removedChoices.length || newChoices.length) {
            requests.push(concat(
                from(removedChoices).pipe(
                    mergeMap(choice => axiosInstance$.delete(`/choices/${choice.id}/`))
                ),
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