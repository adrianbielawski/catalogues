export interface MyAccountState {
    isEditingUsername: boolean,
    isSubmittingUsername: boolean,
    isEditingPassword: boolean,
    isSubmittingPassword: boolean,
}

export interface ChangePasswordPayload {
    password1: string,
    password2: string,
}