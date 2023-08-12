import { ErrorMessage, LocationState, User } from 'src/globalTypes'
import { History, Location } from 'history'

export interface AuthUserState {
  id: number | null
  isEditingUsername: boolean
  isSubmittingUsername: boolean
  isEditingPassword: boolean
  isSubmittingPassword: boolean
  isPostingUserImage: boolean
  isInitialized: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  isCheckingUsername: boolean
  isSigningUp: boolean
  invalidUsernameMessage: string
  signUpMessage: ErrorMessage | null
  verifyEmailError: string
  authUserError: ErrorMessage | null
}

export interface ChangePasswordPayload {
  password1: string
  password2: string
}

export interface HistoryAndLocationPayload {
  history: History<LocationState>
  location: Location<LocationState>
}

export interface LoginPayload extends HistoryAndLocationPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  userName: string
  email: string
  password: string
  repeatedPassword: string
  history: History<LocationState>
}

export interface VerifyEmailPayload extends HistoryAndLocationPayload {
  key: string
}

export interface ChangeUsernamePayload extends HistoryAndLocationPayload {
  name: string
}

export interface AuthResponse {
  key: string
  user: User
}
