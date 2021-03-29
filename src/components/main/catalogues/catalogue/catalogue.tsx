import React, { useEffect, useState } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks and Utils
import { scrollTop } from 'src/utils'
//Filters context
import buildFilters from './filter-bar-utils/filtersBuilder'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
//Custom components
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

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(catalogue.id))
    }, [catalogue.id])

    useEffect(() => {
        if (!catalogue.fetchingFieldsChoices) {
                const filters = buildFilters(catalogue.fields, catalogue.itemsRanges)
                filtersContext.changeFilters(filters)
        }
    }, [catalogue.fetchingFieldsChoices])

    useEffect(() => {
        scrollTop()
    }, [catalogue.id])

    const toggleFiltersBar = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowFilters(!showFilters)
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