import { ErrorMessage, User } from 'src/globalTypes'
import { Location, NavigateFunction } from 'react-router-dom'

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

export interface NavigateAndLocationPayload {
  navigate: NavigateFunction
  location: Location
}

export interface LoginPayload extends NavigateAndLocationPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  userName: string
  email: string
  password: string
  repeatedPassword: string
  navigate: NavigateFunction
}

export interface VerifyEmailPayload extends NavigateAndLocationPayload {
  key: string
}

export interface ChangeUsernamePayload extends NavigateAndLocationPayload {
  name: string
}

export interface AuthResponse {
  key: string
  user: User
}
