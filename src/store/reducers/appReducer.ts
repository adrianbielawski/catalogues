import { cloneDeep } from 'lodash'
import { userDeserializer } from 'src/serializers'
import { AppState, AppActionTypes } from 'store/storeTypes'

const initialState: AppState = {
    screenHeight: window.innerHeight,
    user: null,
}

const appReducer = (
    state = initialState,
    action: AppActionTypes
): AppState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'APP/SCREEN_HEIGHT_CHANGED':
            newState.screenHeight = action.screenHeight
            return newState

        case 'AUTH/GET_USER/SUCCESS':
        case 'AUTH/SIGN_UP/SUCCESS':
        case 'AUTH/LOG_IN/SUCCESS':
            newState.user = userDeserializer(action.user);
            return newState;

        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState)
            return newState

        default:
            return newState
    }
}

export default appReducer