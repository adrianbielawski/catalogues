import { Observable, of, from, concat, forkJoin } from 'rxjs'
import { catchError, mapTo, mergeMap, switchMap } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { ActionsObservable, Epic, ofType } from "redux-observable"
import {
    MY_ACCOUNT_CHANGE_USERNAME, MY_ACCOUNT_CHANGE_PASSWORD,
    MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES,
    AppActionTypes, changeUsername, changePassword, changeCatalogueName, PostChoiceFieldChanges,
    PostTextFieldNameChange,
} from "store/storeTypes"
import {
    changeUsernameSuccess, changeUsernameFailure,
    changePasswordSuccess, changePasswordFailure,
    changeCatalogueNameStart, changeCatalogueNameSuccess, changeCatalogueNameFailure,
    postTextFieldNameChangeStart, postTextFieldNameChangeSuccess, postTextFieldNameChangeFailure,
    postChoiceFieldChangesStart, postChoiceFieldChangesSuccess, postChoiceFieldChangesFailure,
} from "store/actions/settingsActions"

export const changeUsernameEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<any> => action$.pipe(
    ofType(MY_ACCOUNT_CHANGE_USERNAME),
    switchMap((action) =>
        from(axiosInstance.patch('/user/', {
            username: (action as changeUsername).newName
        })).pipe(
            mergeMap((response) => of(
                changeUsernameSuccess(response.data)
            )),
            catchError(err => of(changeUsernameFailure()))
        )
    )
)

export const changePasswordEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<any> => action$.pipe(
    ofType(MY_ACCOUNT_CHANGE_PASSWORD),
    switchMap((action) =>
        from(axiosInstance.post('/password/change/', {
            new_password1: (action as changePassword).newPassword1,
            new_password2: (action as changePassword).newPassword2
        })).pipe(
            mergeMap(() => of(changePasswordSuccess())),
            catchError(err => of(changePasswordFailure()))
        )
    )
)

export const changeCatalogueNameEpic = (
    action$: ActionsObservable<AppActionTypes>
): Observable<any> => action$.pipe(
    ofType(MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME),
    switchMap((action) => concat(
        of(changeCatalogueNameStart((action as changeCatalogueName).catalogueId)),
        from(axiosInstance.patch(`/catalogues/${(action as changeCatalogueName).catalogueId}/`, {
            name: (action as changeCatalogueName).newName
        })).pipe(
            mergeMap(() => of(changeCatalogueNameSuccess())),
            catchError(() => of(changeCatalogueNameFailure()))
        )
    ))
)

export const postTextFieldNameChangeEpic: Epic<AppActionTypes> = action$ => action$.pipe(
    ofType<AppActionTypes, PostTextFieldNameChange>(MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE),
    switchMap(action => concat(
        of(postTextFieldNameChangeStart(action.fieldId, action.catalogueId)),
        from(axiosInstance.patch(`/fields/${action.fieldId}/`, {
            name: action.fieldName,
        })).pipe(
            mapTo(postTextFieldNameChangeSuccess(action.fieldId, action.catalogueId)),
            catchError(() => of(postTextFieldNameChangeFailure(action.fieldId, action.catalogueId)))
        ))
    )
)

export const postChoiceFieldChangesEpic: Epic<AppActionTypes> = action$ => action$.pipe(
    ofType<AppActionTypes, PostChoiceFieldChanges>(MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES),
    switchMap(action => {
        const removedChoices = action.field.choices.filter(c => c.removed === true)
        const newChoices = action.field.choices.filter(c => c.id === null)

        const requests = []
        if (removedChoices.length || newChoices.length) {
            requests.push(concat(
                from(removedChoices).pipe(
                    mergeMap(choice => from(axiosInstance.delete(`/choices/${choice.id}/`)))
                ),
                from(newChoices).pipe(
                    mergeMap(choice => from(axiosInstance.post(`/choices/`, {
                        field_id: choice.fieldId,
                        value: choice.value,
                    }))),
                ),
            ))
        }
        requests.push(from(axiosInstance.patch(`/fields/${action.field.id}/`, {
            name: action.fieldName,
        })))

        return concat(
            of(postChoiceFieldChangesStart(action.field.id, action.field.catalogueId)),
            forkJoin(requests).pipe(
                mapTo(postChoiceFieldChangesSuccess(action.field.id, action.field.catalogueId)),
                catchError(() => of(postChoiceFieldChangesFailure(action.field.id, action.field.catalogueId)))
            ),
        )
    })
)