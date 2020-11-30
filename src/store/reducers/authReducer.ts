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
        default:
            return state
    }
}

export default authReducer