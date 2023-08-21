import { useMemo, MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faFolderOpen,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueHeader.module.scss'
import { DeserializedCatalogue } from 'src/globalTypes'
import NavContextProvider from 'components/global-components/nav/nav-store/navContextProvider'
import {
  ADD_CATALOGUE_TO_FAVOURITE,
  DELETE_CATALOGUE_FROM_FAVOURITE,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import Avatar from 'components/global-components/avatar/avatar'
import Nav from 'components/global-components/nav/nav'
import FavouriteIcon from 'components/global-components/favourite-icon/favouriteIcon'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import { useEntitiesSelector } from 'store/entities/hooks'

const contextValue = {
  show: false,
  listId: null,
  nestedListId: null,
}

interface Props {
  catalogue: DeserializedCatalogue
  toggleFiltersBar: (e: MouseEvent) => void
}

const cx = classNames.bind(styles)

const CatalogueHeader = (props: Props) => {
  const dispatch = useAppDispatch()

  const location = useLocation()

  const smallViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.smallViewport,
  )
  const users = useEntitiesSelector('users')
  const authUserData = useTypedSelector((state) => state.modules.authUser)
  const currentUserData = useTypedSelector((state) => state.modules.currentUser)
  const authUser = authUserData.id ? users[authUserData.id] : null
  const currentUser = currentUserData.userId
    ? users[currentUserData.userId]
    : null
  const catalogues = useEntitiesSelector('catalogues')
  const currentUserCatalogues = useTypedSelector(
    (state) => state.modules.currentUserCatalogues.cataloguesData,
  )

  const handleFavouriteChange = () => {
    if (!props.catalogue.isFavourite) {
      dispatch(ADD_CATALOGUE_TO_FAVOURITE(props.catalogue.id))
    } else {
      dispatch(DELETE_CATALOGUE_FROM_FAVOURITE(props.catalogue.id))
    }
  }

  const handleFilterButtonClick = (e: MouseEvent) => {
    props.toggleFiltersBar(e)
  }

  const NAV_ITEMS = useMemo(
    () => [
      {
        id: 'User',
        title: currentUser!.username,
        icon: (
          <Avatar
            placeholderIcon={faUser}
            className={styles.userImage}
            url={currentUser?.imageThumbnail}
          />
        ),
        url: `/${currentUser!.username}`,
      },
      {
        id: 'Catalogues',
        title: `${currentUser!.username}'s catalogues`,
        faIcon: faFolderOpen,
        children: currentUserCatalogues.map((c) => ({
          id: catalogues[c.id]!.name,
          title: catalogues[c.id]!.name,
          icon: (
            <Avatar
              className={styles.catalogueImage}
              placeholderIcon={faFolderOpen}
              url={catalogues[c.id]!.imageThumbnail}
            />
          ),
          url: `/${currentUser!.username}/catalogues/${catalogues[c.id]!.slug}`,
        })),
      },
    ],
    [currentUser, catalogues],
  )

  const catalogueImage = props.catalogue.imageThumbnail
    ? `${props.catalogue.imageThumbnail}`
    : undefined

  const catalogueNameClass = cx('catalogueName', {
    noJustify: authUser?.id === currentUser!.id,
    increasedMargin: authUser?.id === currentUser!.id,
  })

  const filtersButtonClass = cx('filtersButton', {
    active: location.search,
  })

  return (
    <NavContextProvider value={contextValue}>
      <ComponentHeader className={styles.catalogueHeader}>
        {authUser?.id !== currentUser!.id && (
          <Nav className={styles.nav} items={NAV_ITEMS} position="left" />
        )}
        <div className={catalogueNameClass}>
          {catalogueImage && (
            <Avatar className={styles.userImage} url={catalogueImage} />
          )}
          <p>{props.catalogue.name}</p>
        </div>
        <div className={styles.catalogueActions}>
          {smallViewport && props.catalogue.itemsRanges.date.min && (
            <TransparentButton
              className={filtersButtonClass}
              onClick={handleFilterButtonClick}
            >
              <FontAwesomeIcon icon={faFilter} />
            </TransparentButton>
          )}
          {authUser != null && (
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
