import { useEffect, useState, MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteItemsContent.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import buildFilters from '../filter-bar/utils/filtersBuilder'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Items from '../items/items'
import FiltersBar from '../filter-bar/filtersBar'
import { useEntitiesSelector } from 'store/entities/hooks'

const cx = classNames.bind(styles)

const FavouriteItemsContent = () => {
  const favouriteItems = useTypedSelector(
    (state) => state.modules.favouriteItems,
  )
  const catalogues = useEntitiesSelector('catalogues')
  const smallViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.smallViewport,
  )

  const [showFilters, setShowFilters] = useState(false)

  const { filtersContext } = useFiltersBarContext()

  useEffect(() => {
    const filters = buildFilters(favouriteItems.cataloguesIds, catalogues)

    filtersContext.changeFilters(filters)
  }, [favouriteItems.cataloguesIds, catalogues])

  const toggleFiltersBar = (e: MouseEvent) => {
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
