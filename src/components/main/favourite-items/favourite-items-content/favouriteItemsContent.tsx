import { useEffect, useState } from 'react'
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteItemsContent.module.scss'
// Redux
import { useTypedSelector } from 'store/storeConfig'
// Filters bar context and utils
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import buildFilters from '../filter-bar/utils/filtersBuilder'
// Custom components
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Items from '../items/items'
import FiltersBar from '../filter-bar/filtersBar'

const cx = classNames.bind(styles)

const FavouriteItemsContent = () => {
  const favouriteItems = useTypedSelector(
    (state) => state.modules.favouriteItems,
  )
  const catalogues = useTypedSelector(
    (state) => state.entities.catalogues.entities,
  )
  const smallViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.smallViewport,
  )
  const { filtersContext } = useFiltersBarContext()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const filters = buildFilters(favouriteItems.cataloguesIds, catalogues)

    filtersContext.changeFilters(filters)
  }, [favouriteItems.cataloguesIds, catalogues])

  const toggleFiltersBar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFilters(!showFilters)
  }

  const filtersButtonClass = cx('filtersButton', {
    active: location.search,
  })

  return (
    <div className={styles.favouriteItemsContent}>
      <ComponentHeader className={styles.favouriteItemsHeader}>
        <div></div>
        <p className={styles.title}>Favourite items</p>
        <div className={styles.actions}>
          {smallViewport && (
            <TransparentButton
              className={filtersButtonClass}
              onClick={toggleFiltersBar}
            >
              <FontAwesomeIcon icon={faFilter} />
            </TransparentButton>
          )}
        </div>
      </ComponentHeader>
      <div className={styles.content}>
        <FiltersBar show={showFilters} toggleShow={toggleFiltersBar} />
        {filtersContext.filters.length !== 0 && <Items />}
      </div>
    </div>
  )
}

export default FavouriteItemsContent
