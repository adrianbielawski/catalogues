import axiosInstance from 'src/axiosInstance'
import { ThunkAction } from 'store/storeTypes'
import { History, Location } from 'history';
import { LocationState, User } from 'src/globalTypes'
import {
    AUTH_LOG_IN_START, AUTH_LOG_IN_SUCCESS, AUTH_LOG_IN_FAILURE,
    AppActionTypes, ErrorData
} from '../storeTypes'

const logInStart = (): AppActionTypes => ({
    type: AUTH_LOG_IN_START,
})

const logInSuccess = (user: User): AppActionTypes => ({
    type: AUTH_LOG_IN_SUCCESS,
    user,
})

const logInFailure = (): AppActionTypes => ({
    type: AUTH_LOG_IN_FAILURE,
})

export const logIn = (
    email: string,
    password: string,
    history: History,
    location: Location<LocationState>,
): ThunkAction => dispatch => {
    dispatch(logInStart())
    
    axiosInstance.post('/login/', {
        email,
        password,
    })
    .then(response => {
        localStorage.setItem('token', response.data.key)
        dispatch(logInSuccess(response.data.user))

        const { referrer } = location.state || { referrer: `/${response.data.user.id}` }
        history.push(referrer)
    })
    .catch(error => {
        dispatch(logInFailure())
        if (error.response) {
            console.log(Object.values(error.response.data as ErrorData)[0][0])
        } else {
            console.log('Something went wrong')
        }
    })
}