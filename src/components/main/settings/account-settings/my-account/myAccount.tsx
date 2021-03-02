import React, { useState } from 'react'
import styles from './myAccount.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
    CHANGE_PASSWORD, CHANGE_USERNAME, TOGGLE_PASSWORD_EDIT, TOGGLE_USERNAME_EDIT
} from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
//Custom components
import EditableFieldWithConfirm from 'components/global-components/editable-field/editableFieldWithConfirm'
import MessageModal from 'components/global-components/message-modal/messageModal'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState({ field: '', title: '', message: '' })
    const user = useTypedSelector(state => state.auth.user)
    const myAccount = useTypedSelector(state => state.settings.myAccount)

    const handleEditUsername = () => {
        dispatch(TOGGLE_USERNAME_EDIT(!myAccount.isEditingUsername))
    }

    const validateUsername = (username: string) => {
        let error = {
            field: 'userName',
            title: '',
            message: ''
        }

        if (username.length === 0) {
            error.title = 'User name error'
            error.message = 'Please add user name'
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleUsernameChange = (input: string[]) => {
        const { valid, error } = validateUsername(input[0])
        if (!valid) {
            setError(error!)
            return
        }
        dispatch(CHANGE_USERNAME(input[0]))
    }

    const handleEditPassword = () => {
        dispatch(TOGGLE_PASSWORD_EDIT(!myAccount.isEditingPassword))
    }

    const validatePassword = (passwords: string[]) => {
        const error = {
            field: 'password',
            title: '',
            message: ''
        }

        if (passwords[0] !== passwords[1]) {
            error.title = `Passwords error`
            error.message = `Passwords don't match`
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handlePasswordChange = (input: string[]) => {
        const { valid, error } = validatePassword(input)
        if (!valid) {
            setError(error!)
            return
        }
        dispatch(CHANGE_PASSWORD({
            password1: input[0],
            password2: input[1],
        }))
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
                        content={[user!.username]}
                        onEditClick={handleEditUsername}
                        onConfirm={handleUsernameChange}
                    />
                </li>
                <li key="password">
                    <EditableFieldWithConfirm
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
                    />
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