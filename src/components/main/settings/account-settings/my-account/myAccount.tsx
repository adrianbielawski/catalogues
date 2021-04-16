import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './myAccount.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Hooks
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
//Redux
import {
    CHANGE_USERNAME, CLEAR_AUTH_USER_ERROR, TOGGLE_USERNAME_EDIT, VALIDATE_USERNAME
} from 'store/modules/auth-user/slice'
import { userSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import EditableFieldWithConfirm from 'components/global-components/editable-field/editableFieldWithConfirm'
import MessageModal from 'components/global-components/message-modal/messageModal'
import ChangePassword from './change-password/changePassword'
import ChangeUserImage from './change-image/changeUserImage'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const authUser = useTypedSelector(state => state.modules.authUser)
    const user = useTypedSelector(userSelector(authUser.id!))
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()

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

    const clearMyAccountError = () => {
        dispatch(CLEAR_AUTH_USER_ERROR())
    }

    return (
        <div className={styles.myAccount}>
            <ul className={styles.list}>
                <li key="userImage">
                    <ChangeUserImage />
                </li>
                <li key={'username'}>
                    <EditableFieldWithConfirm
                        id={0}
                        isEditing={authUser.isEditingUsername}
                        isSubmitting={authUser.isSubmittingUsername}
                        title="User name"
                        value={user.username}
                        invalidInputMessage={authUser.invalidUsernameMessage}
                        ref={usernameInputRef}
                        onEdit={handleEditUsername}
                        onConfirm={handleUsernameConfirm}
                    />
                </li>
                <li key="password">
                    <ChangePassword />
                </li>
            </ul>
            <MessageModal
                show={authUser.authUserError !== null}
                title={authUser.authUserError?.title}
                message={authUser.authUserError?.message || ''}
                onConfirm={clearMyAccountError}
            />
        </div>
    )
}

export default MyAccount