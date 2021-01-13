import { User } from 'src/globalTypes'
import {
    MY_ACCOUNT_TOGGLE_USERNAME_EDIT, MY_ACCOUNT_CHANGE_USERNAME, MY_ACCOUNT_CHANGE_USERNAME_SUCCESS, MY_ACCOUNT_CHANGE_USERNAME_FAILURE,
    MY_ACCOUNT_TOGGLE_PASSWORD_EDIT, MY_ACCOUNT_CHANGE_PASSWORD, MY_ACCOUNT_CHANGE_PASSWORD_SUCCESS, MY_ACCOUNT_CHANGE_PASSWORD_FAILURE,
    MANAGE_CATALOGUES_CREATE_CATALOGUE, MANAGE_CATALOGUES_CREATE_CATALOGUE_START, MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS, MANAGE_CATALOGUES_CREATE_CATALOGUE_FAILURE,
    MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS, MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
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

export const toggleCatalogueNameEdit = (catalogueId: number | null): AppActionTypes => ({
    type: MANAGE_CATALOGUES_TOGGLE_CATALOGUE_NAME_EDIT,
    catalogueId,
})

export const createCatalogue = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE,
})

export const createCatalogueStart = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_START,
})

export const createCatalogueSuccess = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_SUCCESS,
})

export const createCatalogueFailure = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CREATE_CATALOGUE_FAILURE,
})

export const changeCatalogueName = (catalogueId: number, newName: string): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME,
    catalogueId,
    newName,
})

export const changeCatalogueNameStart = (catalogueId: number): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_START,
    catalogueId,
})

export const changeCatalogueNameSuccess = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_SUCCESS,
})

export const changeCatalogueNameFailure = (): AppActionTypes => ({
    type: MANAGE_CATALOGUES_CHANGE_CATALOGUE_NAME_FAILURE,
})