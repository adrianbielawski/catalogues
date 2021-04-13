import React, { useContext } from 'react'
import { useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueHeader.scss'
//Types
import { DeserializedCatalogue, LocationState } from 'src/globalTypes'
//Context
import { NavContext } from 'components/global-components/nav/nav-store/navStore'
import NavContextProvider from 'components/global-components/nav/nav-store/navContextProvider'
//Redux
import { ADD_CATALOGUE_TO_FAVOURITE, DELETE_CATALOGUE_FROM_FAVOURITE } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import Avatar from 'components/global-components/avatar/avatar'
import Nav from 'components/global-components/nav/nav'
import FavouriteIcon from 'components/global-components/favourite-icon/favouriteIcon'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import ComponentHeader from 'components/global-components/component-header/componentHeader'

const contextValue = {
    show: false,
    listId: null,
    nestedListId: null,
}

type Props = {
    catalogue: DeserializedCatalogue,
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
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const currentUserCatalogues = useTypedSelector(state => state.modules.currentUserCatalogues.cataloguesData)

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
            children: currentUserCatalogues.map(c => ({
                id: catalogues[c.id]!.name,
                title: catalogues[c.id]!.name,
                icon: <Avatar
                    className={styles.catalogueImage}
                    placeholderIcon={faFolderOpen}
                    url={catalogues[c.id]!.imageThumbnail}
                />,
                url: `/${currentUser.user!.username}/catalogues/${catalogues[c.id]!.slug}`,
            })),
        },
    ]

    const catalogueImage = props.catalogue.imageThumbnail
        ? `${props.catalogue.imageThumbnail}`
        : undefined

    const catalogueNameClass = cx(
        'catalogueName',
        {
            noJustify: user?.id === currentUser.user?.id,
            increasedMargin: user?.id === currentUser.user?.id,
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
            <ComponentHeader className={styles.catalogueHeader}>
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
                    {user && (
                        <FavouriteIcon
                            className={styles.favouriteIcon}
                            active={props.catalogue.isFavourite}
                            onChange={handleFavouriteChange}
                        />
                    )}
                </div>
            </ComponentHeader>
        </NavContextProvider>
    )
}

export default CatalogueHeader