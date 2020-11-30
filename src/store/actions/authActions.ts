import axiosInstance from 'src/axiosInstance'
import { ThunkAction } from 'store/storeTypes'
import { History, Location } from 'history';
import { LocationState, User } from 'src/globalTypes'
import {
    AUTH_SIGN_UP_START, AUTH_SIGN_UP_SUCCESS, AUTH_SIGN_UP_FAILURE, AppActionTypes, ErrorData
} from '../storeTypes'


const signUpStart = (): AppActionTypes => ({
    type: AUTH_SIGN_UP_START,
})

const signUpSuccess = (user: User): AppActionTypes => ({
    type: AUTH_SIGN_UP_SUCCESS,
    user,
})

const signUpFailure = (): AppActionTypes => ({
    type: AUTH_SIGN_UP_FAILURE,
})

export const signUp = (
    userName: string,
    email: string,
    password: string,
    repeatedPassword: string,
    history: History,
): ThunkAction => dispatch => {
    dispatch(signUpStart())

    axiosInstance.post('/registration/', {
        email,
        password1: password,
        password2: repeatedPassword,
        username: userName,
    })
    .then(response => {
        localStorage.setItem('token', response.data.key)
        dispatch(signUpSuccess(response.data.user))
        history.push(`/${response.data.user.id}`)
    })
    .catch(error => {
        dispatch(signUpFailure())
        if (error.response) {
            console.log(Object.values(error.response.data as ErrorData)[0][0])
        } else {
            console.log('Something went wrong')
        }
    });
}

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