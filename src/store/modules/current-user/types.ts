import { ErrorMessage } from "src/globalTypes"

export interface CurrentUserState {
    userId: number | null,
    currentUserError: ErrorMessage | null,
}