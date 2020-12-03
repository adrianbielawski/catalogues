import React from 'react'
import styles from './catalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'

const Catalogues = () => {
    const user = useTypedSelector(state => state.app.user)

    const NAV_CONTENT = [
        {
            title: 'Catalogues',
            children: [
                {
                    title: 'Nails',
                    url: `/${user!.id}/catalogues/nails`,
                },
                {
                    title: 'Watches',
                    url: `/${user!.id}/catalogues/watches`,
                }
            ]
        },
        {
            title: 'Settings',
            url: `/${user!.id}/settings`,
        }
    ]
    
    return (
        <div className={styles.catalogues}>
            <Nav content={NAV_CONTENT} extraItems={[<Logout className={styles.logout} />]} />
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    Menu
                </div>
                <div className={styles.content}>
                    Catalogues
                </div>
            </div>
        </div>
    )
}

export default Catalogues