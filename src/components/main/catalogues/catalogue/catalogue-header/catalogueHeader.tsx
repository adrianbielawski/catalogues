import React, { useContext, useEffect, useState } from 'react'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueHeader.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Context
import { NavContext } from 'components/global-components/nav/nav-store/navStore'
import NavContextProvider from 'components/global-components/nav/nav-store/navContextProvider'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//custom components
import UserImage from 'components/global-components/user-image/userImage'
import Nav from 'components/global-components/nav/nav'

const BASE_URL = process.env.API_URL

const contextValue = {
    show: false,
    listId: null,
}

type Props = {
    catalogue: DeserializedCatalogue,
    className?: string,
}

const cx = classNames.bind(styles)

const CatalogueHeader = (props: Props) => {
    const { show } = useContext(NavContext)
    const is640OrLess = useTypedSelector(state => state.app.screenWidth.is640OrLess)
    const currentUser = useTypedSelector(state => state.currentUser)
    const catalogues = useTypedSelector(state => state.catalogues)
    const [yOffset, setYOffset] = useState(0)
    const [scrolledUp, setScrolledUp] = useState(true)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [yOffset, scrolledUp])

    const handleScroll = () => {
        const offset = window.pageYOffset
        let up = scrolledUp

        if (offset >= yOffset) {
            up = false
        }
        if (offset < yOffset) {
            up = true
        }

        setYOffset(offset)
        setScrolledUp(up)
    }

    const NAV_ITEMS = [
        {
            id: 'User',
            title: currentUser.user!.username,
            icon: (
                <UserImage
                    className={styles.userImage}
                    url={currentUser.user?.imageThumbnail}
                />
            ),
            url: `/${currentUser.user!.username}`
        },
        {
            id: 'Catalogues',
            title: `${currentUser.user?.username}'s catalogues`,
            faIcon: faFolderOpen,
            children: catalogues.catalogues.map(c => ({
                id: c.name,
                title: c.name,
                faIcon: faFolderOpen,
                url: `/${currentUser.user!.username}/catalogues/${c.slug}`,
            })),
        },
    ]

    const image = `${BASE_URL}${props.catalogue.imageThumbnail}`

    const headerClass = cx(
        'header',
        props.className,
        {
            hidable: is640OrLess,
            show: is640OrLess && scrolledUp,
        }
    )

    return (
        <NavContextProvider value={contextValue}>
            <div className={headerClass}>
                <Nav
                    show={show}
                    items={NAV_ITEMS}
                    listOnLeft={true}
                />
                <div className={styles.catalogueName}>
                    <div>
                        <img src={image} />
                    </div>
                    <p>
                        {props.catalogue.name}
                    </p>
                </div>
                <div className={styles.social}>

                </div>
            </div>
        </NavContextProvider>
    )
}

export default CatalogueHeader