import React from 'react'
import styles from './myAccount.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
    CHANGE_PASSWORD, CHANGE_USERNAME, TOGGLE_PASSWORD_EDIT, TOGGLE_USERNAME_EDIT
} from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const user = useTypedSelector(state => state.auth.user)
    const myAccount = useTypedSelector(state => state.settings.myAccount)

    const handleEditUsername = () => {
        dispatch(TOGGLE_USERNAME_EDIT(!myAccount.isEditingUsername))
    }

    const handleUsernameChange = (input: string[]) => {
        dispatch(CHANGE_USERNAME(input[0]))
    }

    const handleEditPassword = () => {
        dispatch(TOGGLE_PASSWORD_EDIT(!myAccount.isEditingPassword))
    }

    const handlePasswordChange = (input: string[]) => {
        dispatch(CHANGE_PASSWORD({
            password1: input[0],
            password2: input[1],
        }))
    }

    return (
        <div className={styles.myAccount}>
            <ul>
                <li key={'username'}>
                    <EditableField
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
                    <EditableField
                        id={1}
                        isEditing={myAccount.isEditingPassword}
                        isSubmitting={myAccount.isSubmittingPassword}
                        title="Password"
                        content={['password', 'confirm password']}
                        hiddenContent={true}
                        inputProps={{ type: "password" }}
                        onEditClick={handleEditPassword}
                        onConfirm={handlePasswordChange}
                    />
                </li>
            </ul>
        </div>
    )
}

export default MyAccount