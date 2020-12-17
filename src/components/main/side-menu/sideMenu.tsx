import React from 'react'
import styles from './sideMenu.scss'
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
    const getItems = (): React.ReactNode => {
        return props.content.map((item, index) => (
            <SideMenuItem
                title={item.title}
                url={item.url}
                key={index}
            />
        ))
    }

    return (
        <SideBar className={styles.sideMenu}>
            <ul>
                {getItems()}
            </ul>
        </SideBar>
    )
}

export default SideMenu