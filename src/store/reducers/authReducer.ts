import { cloneDeep } from 'lodash'
import { AppActionTypes } from 'store/storeTypes/appTypes'
import { AuthState } from 'store/storeTypes/authTypes'

const initialState: AuthState = {
    isInitialized: false,
    isLoggingIn: false,
    isSigningUp: false,
}

const authReducer = (
    state = initialState,
    action: AppActionTypes
): AuthState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'AUTH/INITIALIZED':
        case 'AUTH/GET_USER/SUCCESS':
        case 'AUTH/GET_USER/FAILURE':
            newState.isInitialized = true;
            return newState;

        case 'AUTH/LOG_IN/START':
            newState.isLoggingIn = true
            return newState

        case 'AUTH/LOG_IN/SUCCESS':
        case 'AUTH/LOG_IN/FAILURE':
            newState.isLoggingIn = false
            return newState

        case 'AUTH/SIGN_UP/START':
            newState.isSigningUp = true;
            return newState;

        case 'AUTH/SIGN_UP/SUCCESS':
        case 'AUTH/SIGN_UP/FAILURE':
            newState.isSigningUp = false;
            return newState;

        default:
            return state
    }
}

export default authReducer