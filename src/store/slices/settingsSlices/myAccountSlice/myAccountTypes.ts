import { ErrorMessage } from "src/globalTypes";

export interface MyAccountState {
    isEditingUsername: boolean,
    isSubmittingUsername: boolean,
    isEditingPassword: boolean,
    isSubmittingPassword: boolean,
    isPostingUserImage: boolean,
    myAccountError: ErrorMessage,
}

export interface ChangePasswordPayload {
    password1: string,
    password2: string,
}