import React from 'react'
import styles from './sideMenu.scss'
//Custom components
import SideMenuItem from './side-menu-item/sideMenuItem'

type ItemType = {
    title: string,
    url: string,
    children?: never,
}

interface Props {
    content: ItemType[],
}

type GetItems = () => React.ReactNode

const SideMenu = (props: Props) => {

    const getItems: GetItems = () => {
        return props.content.map((item, index) => {
                return (
                    <SideMenuItem
                        title={item.title}
                        url={item.url}
                        key={index}
                    />
                )
        })
    }

    return (
        <ul className={styles.sideMenu}>
            {getItems()}
        </ul>
    )
}

export default SideMenu