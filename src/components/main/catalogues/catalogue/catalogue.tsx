import React, { useEffect, useState, MouseEvent } from 'react'
import styles from './catalogue.module.scss'
import { FETCH_CURRENT_USER_CATALOGUE_FIELDS } from 'store/modules/current-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
  authUserCatalogueDataSelector,
  catalogueSelectorBySlug,
  currentUserCatalogueSelector,
  fieldsSelector,
} from 'store/selectors'
import { scrollTop } from 'src/utils'
import buildFilters from './filter-bar-utils/filtersBuilder'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import CatalogueItems from './catalogue-items/catalogueItems'
import CatalogueHeader from './catalogue-header/catalogueHeader'
import SideBar from 'components/global-components/side-bar/sideBar'
import Search from 'components/global-components/filters-bar/search/search'
import Sort from 'components/global-components/filters-bar/sort/sort'
import Filters from 'components/global-components/filters-bar/filters/filters'
import { useParams } from 'react-router-dom'
import { useEntitiesSelector } from 'store/entities/hooks'

const Catalogue = () => {
  const dispatch = useAppDispatch()

  const { catalogueSlug } = useParams()

  const { filtersContext } = useFiltersBarContext()
  const smallViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.smallViewport,
  )
  const authUserId = useTypedSelector((state) => state.modules.authUser.id)
  const currentUserId = useTypedSelector(
    (state) => state.modules.currentUser.userId,
  )

  const catalogue = useTypedSelector(
    catalogueSelectorBySlug(catalogueSlug ?? '', currentUserId!),
  )
  const catalogueDataSelector =
    authUserId === currentUserId
      ? authUserCatalogueDataSelector
      : currentUserCatalogueSelector
  const catalogueData = useTypedSelector(catalogueDataSelector(catalogue!.id))
  const catalogueFields = useTypedSelector(
    fieldsSelector(catalogueData.fieldsData.map((f) => f.id)),
  )
  const choices = useEntitiesSelector('choices')

  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!catalogue) {
      return
    }
    dispatch(FETCH_CURRENT_USER_CATALOGUE_FIELDS(catalogue.id))
  }, [catalogue?.id])

  useEffect(() => {
    if (!catalogueData.isFetchingFieldsChoices) {
      const filters = buildFilters(
        catalogueData.fieldsData,
        catalogue!.itemsRanges,
        catalogueFields,
        choices,
      )
      filtersContext.changeFilters(filters)
    }
  }, [catalogueData.isFetchingFieldsChoices])

  useEffect(() => {
    scrollTop()
  }, [catalogue?.id])

  const toggleFiltersBar = (e: MouseEvent) => {
    e.stopPropagation()
    setShowFilters(!showFilters)
  }

  if (!filtersContext.filtersInitialized || !catalogue) {
    return null
  }

  return (
    <div className={styles.catalogue}>
      <CatalogueHeader
        catalogue={catalogue}
        toggleFiltersBar={toggleFiltersBar}
      />
      <div className={styles.wrapper}>
        {catalogue.itemsRanges.date.min && (
          <SideBar
            active={showFilters}
            mobile={smallViewport}
            onBackgroundClick={toggleFiltersBar}
          >
            <div className={styles.filtersBar}>
              <Search />
              <Sort />
              <Filters />
            </div>
          </SideBar>
        )}
        <div className={styles.mainContent}>
          <CatalogueItems
            catalogueData={catalogueData}
            key={catalogueData.id}
          />
        </div>
      </div>
    </div>
  )
}

export default Catalogue
