import React from 'react'
import styles from './accountSettings.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import SideMenu from 'components/main/side-menu/sideMenu'

const AccountSettings = () => {
    const user = useTypedSelector(state => state.app.user)

    const SIDE_MENU_CONTENT = [
        {
            title: 'Manage catalogues',
            url: `/${user!.id}/settings/account-settings/manage-catalogues`,
        },
        {
            title: 'Change password',
            url: `/${user!.id}/settings/account-settings/change-password`
        },
        {
            title: 'Change name',
            url: `/${user!.id}/settings/account-settings/change-name`,
        },
    ]

    return (
        <div className={styles.accountSettings}>
            <SideMenu content={SIDE_MENU_CONTENT} />
            <div className={styles.content}>
            </div>
        </div>
    )
}

export default AccountSettings