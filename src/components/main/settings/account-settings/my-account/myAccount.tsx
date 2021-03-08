import React, { useState } from 'react'
import styles from './myAccount.scss'
//Custom hooks and utils
import { useDebouncedDispatch } from 'src/customHooks'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CHANGE_USERNAME, CLEAR_MY_ACCOUNT_ERROR, TOGGLE_USERNAME_EDIT
} from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
import { CHECK_USER_AVAILABILITY } from 'store/slices/authSlices/authSlices'
//Custom components
import EditableFieldWithConfirm from 'components/global-components/editable-field/editableFieldWithConfirm'
import MessageModal from 'components/global-components/message-modal/messageModal'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const auth = useTypedSelector(state => state.auth)
    const myAccount = useTypedSelector(state => state.settings.myAccount)
    const [error, setError] = useState({ field: '', title: '', message: '' })

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
        username => CHECK_USER_AVAILABILITY(username),
        200,
        validateUsername,
    )

    const handleUsernameConfirm = (username: string) => {
        dispatch(CHANGE_USERNAME(username))
    }

    const clearMyAccountError = () => {
        dispatch(CLEAR_MY_ACCOUNT_ERROR())
    }
    
    const clearFormError = () => {
        setError({
            field: '',
            title: '',
            message: '',
        })
    }
    
    const isPasswordValid = error.field.length === 0 || error.field !== 'password'

    return (
        <div className={styles.myAccount}>
            <ul>
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
                    {/* <EditableFieldWithConfirm
                        id={1}
                        isEditing={myAccount.isEditingPassword}
                        isSubmitting={myAccount.isSubmittingPassword}
                        title="Password"
                        content={['password', 'confirm password']}
                        hiddenContent={true}
                        inputProps={{ type: "password" }}
                        reset={isPasswordValid}
                        onEditClick={handleEditPassword}
                        onConfirm={handlePasswordChange}
                    /> */}
                </li>
            </ul>
            <MessageModal
                show={error.message.length !== 0}
                title={error.title}
                message={error.message}
                onConfirm={clearFormError}
            />
        </div>
    )
}

export default MyAccount