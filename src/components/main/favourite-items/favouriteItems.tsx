import React, { useEffect, useRef, useState } from 'react'
import styles from './favouriteItems.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import Header from 'components/global-components/header/header'
import ComponentHeader from 'components/global-components/component-header/componentHeader'

const FavouriteItems = () => {
    const favouriteItemsRef = useRef<HTMLDivElement>(null)
    const screenHeight = useTypedSelector(state => state.modules.app.screenHeight)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        if (favouriteItemsRef.current === null) {
            return
        }

        getMinHeight()
    }, [favouriteItemsRef.current, screenHeight])


    const getMinHeight = () => {
        const top = favouriteItemsRef.current!.getBoundingClientRect().top
        const minHeight = screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    return (
        <div
            className={styles.favouriteItems}
            style={{ minHeight: `${minHeight}px` }}
            ref={favouriteItemsRef}
        >
            <Header />
            <ComponentHeader
                className={styles.favouriteItemsHeader}
            >
                <p className={styles.title}>
                    My favourite items
                </p>
            </ComponentHeader>
            <p>favourite items</p>
        </div>
    )
}

export default FavouriteItems