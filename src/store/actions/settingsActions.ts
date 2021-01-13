import { User } from 'src/globalTypes'
import {
    MY_ACCOUNT_TOGGLE_USERNAME_EDIT, MY_ACCOUNT_CHANGE_USERNAME, MY_ACCOUNT_CHANGE_USERNAME_SUCCESS, MY_ACCOUNT_CHANGE_USERNAME_FAILURE,
    MY_ACCOUNT_TOGGLE_PASSWORD_EDIT, MY_ACCOUNT_CHANGE_PASSWORD, MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS, MY_ACCOUNT_CHANGE_PASSWORD_FAILURE,
    AppActionTypes,
} from '../storeTypes'

export const toggleUsernameEdit = (isEditing: boolean): AppActionTypes => ({
    type: MY_ACCOUNT_TOGGLE_USERNAME_EDIT,
    isEditing,
})

export const changeUsername = (newName: string): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_USERNAME,
    newName,
})

export const changeUsernameSuccess = (user: User): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_USERNAME_SUCCESS,
    user,
})

export const changeUsernameFailure = (): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_USERNAME_FAILURE,
})

export const togglePasswordEdit = (isEditing: boolean): AppActionTypes => ({
    type: MY_ACCOUNT_TOGGLE_PASSWORD_EDIT,
    isEditing,
})

export const changePassword = (newPassword1: string, newPassword2: string): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_PASSWORD,
    newPassword1,
    newPassword2,
})

export const changePasswordSuccess = (): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS,
})

export const changePasswordFailure = (): AppActionTypes => ({
    type: MY_ACCOUNT_CHANGE_PASSWORD_FAILURE,
})
