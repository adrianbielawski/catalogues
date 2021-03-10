import { DeserializedUser, ErrorMessage } from "src/globalTypes"

export interface CurrentUserState {
    user: DeserializedUser | null,
    currentUserError: ErrorMessage,
}