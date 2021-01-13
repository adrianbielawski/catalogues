import axiosInstance from 'src/axiosInstance'
import { ThunkAction } from 'store/storeTypes'
import { History, Location } from 'history';
import { LocationState, User } from 'src/globalTypes'
import { clearAppState } from './appActions';
import {
    AUTH_INITIALIZED, AUTH_GET_USER_SUCCESS, AUTH_GET_USER_FAILURE,
    AUTH_LOG_IN_START, AUTH_LOG_IN_SUCCESS, AUTH_LOG_IN_FAILURE,
    AUTH_SIGN_UP_START, AUTH_SIGN_UP_SUCCESS, AUTH_SIGN_UP_FAILURE,
    AppActionTypes, ErrorData
} from '../storeTypes'

export const authInitialized = (): AppActionTypes => ({
    type: AUTH_INITIALIZED,
})

const getUserSuccess = (user: User): AppActionTypes => ({
    type: AUTH_GET_USER_SUCCESS,
    user,
})

const getUserFailure = (): AppActionTypes => ({
    type: AUTH_GET_USER_FAILURE,
})

export const getUser = (
    history: History,
    location: Location<LocationState>
): ThunkAction => dispatch => {
    axiosInstance.get('/user/')
    .then(response => {
        dispatch(getUserSuccess(response.data))

        if(location.pathname === '/') { 
            history.push(`/${response.data.id}/catalogues`)
        }
    })
    .catch(() => {
        localStorage.removeItem('token')
        dispatch(getUserFailure())
    })
}

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
        history.push(`/${response.data.user.id}/catalogues`)
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

        const { referrer } = location.state || { referrer: `/${response.data.user.id}/catalogues` }
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

export const logOut = (
    history: History,
): ThunkAction => dispatch => {
    axiosInstance.post('/logout/')
    .then(() => {
        dispatch(clearAppState())
        localStorage.removeItem('token')
        history.push('/')
    })
    .catch(error => {
        if (error.response) {
            console.log(Object.values(error.response.data as ErrorData)[0][0])
        } else {
            console.log('Something went wrong')
        }
    });
}