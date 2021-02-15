import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './myAccount.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'
import { changePassword, changeUsername, togglePasswordEdit, toggleUsernameEdit } from 'store/actions/settingsActions'

const MyAccount = () => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.auth.user)
    const myAccount = useTypedSelector(state => state.settings.myAccount)

    const handleEditUsername = () => {
        dispatch(toggleUsernameEdit(!myAccount.isEditingUsername))
    }

    const handleUsernameChange = (input: string[]) => {
        dispatch(changeUsername(input[0]))
    }

    const handleEditPassword = () => {
        dispatch(togglePasswordEdit(!myAccount.isEditingPassword))
    }

    const handlePasswordChange = (input: string[]) => {
        dispatch(changePassword(input[0], input[1]))
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