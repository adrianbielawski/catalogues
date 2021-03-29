import { DeserializedUser, ErrorMessage, LocationState } from "src/globalTypes"
import { History, Location } from 'history'

export interface AuthState {
    user: DeserializedUser | null,
    isInitialized: boolean,
    isLoggingIn: boolean,
    isLoggingOut: boolean,
    isCheckingUsername: boolean,
    invalidUsernameMessage: string,
    isSigningUp: boolean,
    signUpMessage: ErrorMessage,
    verifyEmailError: string,
    authError: ErrorMessage,
}

export interface GetUserDetails {
    history: History<LocationState>,
    location: Location<LocationState>,
}

export interface HistoryPayload {
    history: History<LocationState>,
}

export interface LoginDetails {
    email: string,
    password: string,
    history: History<LocationState>,
    location: Location<LocationState>,
}

export interface SignUpDetails {
    userName: string,
    email: string,
    password: string,
    repeatedPassword: string,
    history: History<LocationState>,
}

export interface VerifyEmailPayload {
    key: string,
    history: History<LocationState>,
    location: Location<LocationState>,
}