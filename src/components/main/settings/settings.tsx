import React from 'react'
import styles from './settings.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'

const Settings = () => {
    const user = useTypedSelector(state => state.app.user)

    const NAV_CONTENT = [
        {
            title: 'Catalogues settings',
            children: [
                {
                    title: 'Nails settings',
                    url: `/${user!.id}/settings/nails`,
                },
                {
                    title: 'Watches settings',
                    url: `/${user!.id}/settings/watches`,
                }
            ]
        },
        {
            title: 'Account settings',
            url: `/${user!.id}/settings/account`,
        }
    ]
    
    return (
        <div className={styles.settings}>
            <Nav
                content={NAV_CONTENT}
                goBack={{default: 'Catalogues', url: `/${user!.id}/catalogues/nails`}}
                extraItems={[<Logout className={styles.logout}/>]}
            />
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    Menu
                </div>
                <div className={styles.content}>
                    Settings
                </div>
            </div>
        </div>
    )
}

export default Settings