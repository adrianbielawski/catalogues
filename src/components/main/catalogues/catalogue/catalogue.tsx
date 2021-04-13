import React, { useEffect, useState } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CURRENT_USER_CATALOGUE_FIELDS } from 'store/modules/current-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { currentUserCatalogueSelector, fieldsSelector } from 'store/selectors'
//Hooks and utils
import { scrollTop } from 'src/utils'
//Filters context
import buildFilters from './filter-bar-utils/filtersBuilder'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
//Components
import CatalogueItems from './catalogue-items/catalogueItems'
import CatalogueHeader from './catalogue-header/catalogueHeader'
import SideBar from 'components/global-components/side-bar/sideBar'
import Search from 'components/global-components/filters-bar/search/search'
import Sort from 'components/global-components/filters-bar/sort/sort'
import Filters from 'components/global-components/filters-bar/filters/filters'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const { filtersContext } = useFiltersBarContext()
    const smallViewport = useTypedSelector(state => state.app.screenWidth.smallViewport)
    const [showFilters, setShowFilters] = useState(false)
    const catalogue = props.match.params.catalogue!
    const catalogueData = useTypedSelector(currentUserCatalogueSelector(catalogue.id))
    const catalogueFields = useTypedSelector(fieldsSelector(catalogueData.fieldsData.map(f => f.id)))
    const choices = useTypedSelector(state => state.entities.choices.entities)
    
    useEffect(() => {
        dispatch(FETCH_CURRENT_USER_CATALOGUE_FIELDS(catalogue.id))
    }, [catalogue.id])

    useEffect(() => {
        if (!catalogueData.isFetchingFieldsChoices) {
            const filters = buildFilters(
                catalogueData.fieldsData,
                catalogue.itemsRanges,
                catalogueFields,
                choices
            )
            filtersContext.changeFilters(filters)
        }
    }, [catalogueData.isFetchingFieldsChoices])

    useEffect(() => {
        scrollTop()
    }, [catalogue.id])

    const toggleFiltersBar = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowFilters(!showFilters)
    }

    if (!filtersContext.filtersInitialized) {
        return null
    }

    return (
        <div className={styles.catalogue}>
            <CatalogueHeader
                catalogue={catalogue}
                toggleFiltersBar={toggleFiltersBar}
            />
            <div className={styles.wrapper}>
                {catalogue.itemsRanges.date.min &&
                    <SideBar
                        active={showFilters}
                        mobile={smallViewport!}
                        onBackgroundClick={toggleFiltersBar}
                    >
                        <div className={styles.filtersBar} >
                            <Search />
                            <Sort />
                            <Filters />
                        </div>
                    </SideBar>
                }
                <div className={styles.mainContent}>
                    <CatalogueItems
                        catalogueId={catalogue.id}
                        key={catalogue.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default Catalogue