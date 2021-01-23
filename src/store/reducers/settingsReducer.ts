import { cloneDeep } from 'lodash'
import { AppActionTypes, SettingsState } from 'store/storeTypes'

const initialState: SettingsState = {
    myAccount: {
        isEditingUsername: false,
        isSubmittingUsername: false,
        isEditingPassword: false,
        isSubmittingPassword: false,
    },
    manageCatalogues: {
        creatingNewCatalogue: false,
    }
}

const settingsReducer = (
    state = initialState,
    action: AppActionTypes
): SettingsState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'MY_ACCOUNT/TOGGLE_USERNAME_EDIT':
            newState.myAccount.isEditingUsername = action.isEditing
            return newState

        case 'MY_ACCOUNT/CHANGE_USERNAME':
            newState.myAccount.isSubmittingUsername = true
            return newState

        case 'MY_ACCOUNT/CHANGE_USERNAME/SUCCESS':
        case 'MY_ACCOUNT/CHANGE_USERNAME/FAILURE':
            newState.myAccount.isSubmittingUsername = false
            newState.myAccount.isEditingUsername = false
            return newState

        case 'MY_ACCOUNT/TOGGLE_PASSWORD_EDIT':
            newState.myAccount.isEditingPassword = action.isEditing
            return newState

        case 'MY_ACCOUNT/CHANGE_PASSWORD':
            newState.myAccount.isSubmittingPassword = true
            return newState

        case 'MY_ACCOUNT/CHANGE_PASSWORD/SUCCESS':
        case 'MY_ACCOUNT/CHANGE_PASSWORD/FAILURE':
            newState.myAccount.isSubmittingPassword = false
            newState.myAccount.isEditingPassword = false
            return newState

        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE/START':
            newState.manageCatalogues.creatingNewCatalogue = true
            return newState

        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE/FAILURE':
        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE/SUCCESS':
            newState.manageCatalogues.creatingNewCatalogue = false
            return newState

        default:
            return newState
    }
}

export default settingsReducer
