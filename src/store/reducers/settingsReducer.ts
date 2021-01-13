import { cloneDeep } from 'lodash'
import { AppActionTypes, SettingsState } from 'store/storeTypes'

const initialState: SettingsState = {
    accountSettings: {
        myAccount: {
            isEditingUsername: false,
            isSubmittingUsername: false,
            isEditingPassword: false,
            isSubmittingPassword: false,
        }
    }
}

const settingsReducer = (
    state = initialState,
    action: AppActionTypes
): SettingsState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'MY_ACCOUNT/TOGGLE_USERNAME_EDIT':
            newState.accountSettings.myAccount.isEditingUsername = action.isEditing
            return newState

        case 'MY_ACCOUNT/CHANGE_USERNAME':
            newState.accountSettings.myAccount.isSubmittingUsername = true
            return newState

        case 'MY_ACCOUNT/CHANGE_USERNAME/SUCCESS':
        case 'MY_ACCOUNT/CHANGE_USERNAME/FAILURE':
            newState.accountSettings.myAccount.isSubmittingUsername = false
            newState.accountSettings.myAccount.isEditingUsername = false
            return newState

        case 'MY_ACCOUNT/TOGGLE_PASSWORD_EDIT':
            newState.accountSettings.myAccount.isEditingPassword = action.isEditing
            return newState

        case 'MY_ACCOUNT/CHANGE_PASSWORD':
            newState.accountSettings.myAccount.isSubmittingPassword = true
            return newState

        case 'MY_ACCOUNT/CHANGE_PASSWORD/SUCCESS':
        case 'MY_ACCOUNT/CHANGE_PASSWORD/FAILURE':
            newState.accountSettings.myAccount.isSubmittingPassword = false
            newState.accountSettings.myAccount.isEditingPassword = false
            return newState

        default:
            return newState
    }
}

export default settingsReducer
