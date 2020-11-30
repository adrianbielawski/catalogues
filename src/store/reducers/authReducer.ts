import { cloneDeep } from 'lodash'
import { AuthState, AppActionTypes } from 'store/storeTypes'

const initialState: AuthState = {
    isLoggingIn: false,
}

const authReducer = (
    state = initialState,
    action: AppActionTypes
): AuthState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'AUTH/LOG_IN/START':
            newState.isLoggingIn = true
            return newState

        case 'AUTH/LOG_IN/SUCCESS':
        case 'AUTH/LOG_IN/FAILURE':
            newState.isLoggingIn = false
            return newState

        default:
            return state
    }
}

export default authReducer