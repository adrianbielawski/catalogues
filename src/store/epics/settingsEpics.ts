
import { Observable, of, from } from 'rxjs'
import { catchError, mergeMap, switchMap } from 'rxjs/operators'
import axiosInstance from "src/axiosInstance"
import { ActionsObservable, ofType } from "redux-observable"
import {
    MY_ACCOUNT_CHANGE_USERNAME, MY_ACCOUNT_CHANGE_PASSWORD,
    AppActionTypes, changeUsername, changePassword
} from "store/storeTypes"
import {
    changeUsernameSuccess, changeUsernameFailure,
    changePasswordSuccess, changePasswordFailure,
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