import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
//Types
import { LocationState } from 'src/globalTypes'
//Hooks and utils
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import { useDelay } from 'src/hooks/useDelay'
//Redux
import { CHANGE_USERNAME, TOGGLE_USERNAME_EDIT, VALIDATE_USERNAME } from 'store/modules/auth-user/slice'
import { userSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import EditableField from 'components/global-components/editable-field/editableField'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

const ChangeUsername = () => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const authUser = useTypedSelector(state => state.modules.authUser)
    const user = useTypedSelector(userSelector(authUser.id!))
    const delayCompleated = useDelay(authUser.isSubmittingUsername)

    const handleEditUsername = () => {
        dispatch(TOGGLE_USERNAME_EDIT(!authUser.isEditingUsername))
    }

    const validateUsername = (username: string) => {
        if (username.toLowerCase() === user.username.toLowerCase()) {
            return false
        }
        return true
    }

    const usernameInputRef = useDebouncedDispatch(
        username => VALIDATE_USERNAME(username),
        200,
        validateUsername,
    )

    const handleUsernameConfirm = (username: string) => {
        dispatch(CHANGE_USERNAME({
            name: username,
            location,
            history,
        }))
    }

    const content = authUser.isEditingUsername ? (
        <InputWithConfirmButton
            loading={delayCompleated}
            inputProps={{ defaultValue: user.username }}
            buttonProps={{ disabled: authUser.invalidUsernameMessage?.length !== 0 }}
            invalidInputMessage={authUser.invalidUsernameMessage}
            onConfirm={handleUsernameConfirm}
            ref={usernameInputRef}
        />
    ) : user.username

    return (
        <EditableField
            title="User name"
            isEditing={authUser.isEditingUsername}
            onEditClick={handleEditUsername}
            content={content}
        />
    )
}

export default ChangeUsername