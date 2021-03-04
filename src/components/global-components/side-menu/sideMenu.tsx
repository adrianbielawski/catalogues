import React, { useContext } from 'react'
import styles from './sideMenu.scss'
//Context
import { SideMenuContext } from './sideMenuStore'
//Custom components
import SideMenuItem from './side-menu-item/sideMenuItem'
import SideBar from 'components/global-components/side-bar/sideBar'

type ItemType = {
    title: string,
    url: string,
    children?: never,
}

interface Props {
    content: ItemType[],
}

const SideMenu = (props: Props) => {
    const sideMenuContext = useContext(SideMenuContext)

    const getItems = (): React.ReactNode => {
        return props.content.map((item, index) => (
            <SideMenuItem
                title={item.title}
                url={item.url}
                onClick={sideMenuContext.toggleSideMenu}
                key={index}
            />
        ))
    }

    return (
        <SideBar
            className={styles.sideMenu}
            active={sideMenuContext.active}
            onBackgroundClick={sideMenuContext.toggleSideMenu}>
            <ul>
                {getItems()}
            </ul>
        </SideBar>
    )
}

export default SideMenu