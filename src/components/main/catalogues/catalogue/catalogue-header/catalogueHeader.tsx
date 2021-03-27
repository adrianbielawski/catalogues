import React, { useContext, useEffect, useState } from 'react'
import { faFilter, faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueHeader.scss'
//Types
import { DeserializedCatalogue, LocationState } from 'src/globalTypes'
//Context
import { NavContext } from 'components/global-components/nav/nav-store/navStore'
import NavContextProvider from 'components/global-components/nav/nav-store/navContextProvider'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
    ADD_CATALOGUE_TO_FAVOURITE, DELETE_CATALOGUE_FROM_FAVOURITE
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//custom components
import Avatar from 'components/global-components/avatar/avatar'
import Nav from 'components/global-components/nav/nav'
import FavouriteIcon from 'components/global-components/favourite-icon/favouriteIcon'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router'

const contextValue = {
    show: false,
    listId: null,
    nestedListId: null,
}

type Props = {
    catalogue: DeserializedCatalogue,
    className?: string,
    toggleFiltersBar: (e: React.MouseEvent) => void,
}

const cx = classNames.bind(styles)

const CatalogueHeader = (props: Props) => {
    const dispatch = useAppDispatch()
    const location = useLocation<LocationState>()
    const { show } = useContext(NavContext)
    const smallViewport = useTypedSelector(state => state.app.screenWidth.smallViewport)
    const user = useTypedSelector(state => state.auth.user)
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

    const handleFavouriteChange = () => {
        if (!props.catalogue.isFavourite) {
            dispatch(ADD_CATALOGUE_TO_FAVOURITE(props.catalogue.id))
        } else {
            dispatch(DELETE_CATALOGUE_FROM_FAVOURITE(props.catalogue.id))
        }
    }

    const handleFilterButtonClick = (e: React.MouseEvent) => {
        props.toggleFiltersBar(e)
    }

    const NAV_ITEMS = [
        {
            id: 'User',
            title: currentUser.user!.username,
            icon: (
                <Avatar
                    placeholderIcon={faUser}
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
                icon: <Avatar
                    className={styles.catalogueImage}
                    placeholderIcon={faFolderOpen}
                    url={c.imageThumbnail}
                />,
                url: `/${currentUser.user!.username}/catalogues/${c.slug}`,
            })),
        },
    ]

    const catalogueImage = props.catalogue.imageThumbnail
        ? `${props.catalogue.imageThumbnail}`
        : undefined

    const headerClass = cx(
        'header',
        props.className,
        {
            hideable: smallViewport,
            show: smallViewport && scrolledUp,
        }
    )

    const catalogueNameClass = cx(
        'catalogueName',
        {
            noJustify: user?.id === currentUser.user?.id,
        }
    )

    const filtersButtonClass = cx(
        'filtersButton',
        {
            active: location.search,
        }
    )

    return (
        <NavContextProvider value={contextValue}>
            <div className={headerClass}>
                {user?.id !== currentUser.user?.id &&
                    <Nav
                        className={styles.nav}
                        show={show}
                        items={NAV_ITEMS}
                        listOnLeft={true}
                    />
                }
                <div className={catalogueNameClass}>
                    {catalogueImage &&
                        <Avatar
                            className={styles.userImage}
                            url={catalogueImage}
                        />
                    }
                    <p>
                        {props.catalogue.name}
                    </p>
                </div>
                <div className={styles.catalogueActions}>
                    {(smallViewport && props.catalogue.itemsRanges.date.min) &&
                        <TransparentButton
                            className={filtersButtonClass}
                            onClick={handleFilterButtonClick}
                        >
                            <FontAwesomeIcon icon={faFilter} />
                        </TransparentButton>
                    }
                    <FavouriteIcon
                        className={styles.favouriteIcon}
                        active={props.catalogue.isFavourite}
                        onChange={handleFavouriteChange}
                    />
                </div>
            </div>
        </NavContextProvider>
    )
}

export default CatalogueHeader