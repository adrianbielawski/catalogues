import React, { useEffect, useRef, useState } from 'react'
import styles from './userDashboard.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import Header from 'components/global-components/header/header'
import ComponentHeader from 'components/global-components/component-header/componentHeader'

const UserDashboard = () => {
    const userDashboardRef = useRef<HTMLDivElement>(null)
    const app = useTypedSelector(state => state.app)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        if (userDashboardRef.current === null) {
            return
        }

        getMinHeight()
    }, [userDashboardRef.current, app.screenHeight])


    const getMinHeight = () => {
        const top = userDashboardRef.current!.getBoundingClientRect().top
        const minHeight = app.screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    return (
        <div
            className={styles.userDashboard}
            style={{ minHeight: `${minHeight}px` }}
            ref={userDashboardRef}
        >
            <Header />
            <ComponentHeader
                className={styles.userDashboardHeader}
            >
                <p className={styles.title}>
                    My dashboard
            </p>
            </ComponentHeader>
            <p>dashboard</p>
        </div>
    )
}

export default UserDashboard