import React from 'react'
import styles from './myAccount.scss'
//Redux
import { CLEAR_AUTH_USER_ERROR } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import MessageModal from 'components/global-components/message-modal/messageModal'
import ChangePassword from './change-password/changePassword'
import ChangeUserImage from './change-image/changeUserImage'
import ChangeUsername from './change-username/changeUsername'

const MyAccount = () => {
    const dispatch = useAppDispatch()
    const authUser = useTypedSelector(state => state.modules.authUser)

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
                    <ChangeUsername />
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