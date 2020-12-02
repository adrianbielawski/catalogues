import React from 'react'
import styles from './main.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Header from 'components/global-components/header/header'
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'

const Main = () => {
    const user = useTypedSelector(state => state.app.user)

    const NAV_CONTENT = [
        {
            title: 'Catalogues',
            children: []
        },
        {
            title: 'Settings',
            url: `/${user!.id}/settings`,
        }
    ]
    return (
        <div className={styles.main}>
            <Header />
            <Nav content={NAV_CONTENT} extraItems={[<Logout className={styles.logout} />]} />
        </div>
    )
}

export default Main