import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './myAccount.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom hooks and utils
import { useDebouncedDispatch, useFirstRender } from 'src/customHooks'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
    CHANGE_USERNAME, CLEAR_MY_ACCOUNT_ERROR, TOGGLE_USERNAME_EDIT
} from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
import { VALIDATE_USERNAME } from 'store/slices/authSlices/authSlices'
//Custom components
import EditableFieldWithConfirm from 'components/global-components/editable-field/editableFieldWithConfirm'
import MessageModal from 'components/global-components/message-modal/messageModal'
import ChangePassword from './change-password/changePassword'
import ChangeUserImage from './change-password/change-image/changeUserImage'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const auth = useTypedSelector(state => state.auth)
    const myAccount = useTypedSelector(state => state.settings.myAccount)
    const firstRender = useFirstRender()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()

    useEffect(() => {
        if (firstRender) {
            return
        }
        const username = auth.user?.username
        const referrer = location.state?.referrer

        const pathname = `/${username}/settings/account/my-account`
        referrer.params.username = username

        history.push(pathname, { referrer })
    }, [auth.user?.username])

    const handleEditUsername = () => {
        dispatch(TOGGLE_USERNAME_EDIT(!myAccount.isEditingUsername))
    }

    const validateUsername = (username: string) => {
        if (username.toLowerCase() === auth.user?.username.toLowerCase()) {
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
        dispatch(CHANGE_USERNAME(username))
    }

    const clearMyAccountError = () => {
        dispatch(CLEAR_MY_ACCOUNT_ERROR())
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
                        isEditing={myAccount.isEditingUsername}
                        isSubmitting={myAccount.isSubmittingUsername}
                        title="User name"
                        value={auth.user!.username}
                        invalidInputMessage={auth.invalidUsernameMessage}
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
                show={myAccount.myAccountError.message.length !== 0}
                title={myAccount.myAccountError.title}
                message={myAccount.myAccountError.message}
                onConfirm={clearMyAccountError}
            />
        </div>
    )
}

export default MyAccount