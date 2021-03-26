import React, { useEffect, useState } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks and Utils
import { useSwitches } from 'src/customHooks'
import { scrollTop } from 'src/utils'
//Filters context
import deprecatedBuildFilters from '../filter-bar-utils/filtersBuilder'
import buildFilters from './filter-bar-utils/filtersBuilder'
import useDeprecatedFiltersBarContext from 'components/global-components/deprecated-filters-bar/useFiltersBarContext'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import DeprecatedFiltersBar from 'components/global-components/deprecated-filters-bar/filtersBar'
import CatalogueHeader from './catalogue-header/catalogueHeader'
import SideBar from 'components/global-components/side-bar/sideBar'
import Search from 'components/global-components/filters-bar/search/search'
import Sort from 'components/global-components/filters-bar/sort/sort'
import Filters from 'components/global-components/filters-bar/filters/filters'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const [navigationRedesign] = useSwitches(['NAVIGATION_REDESIGN'])
    const deprecatedFiltersContext = useDeprecatedFiltersBarContext()
    const { filtersContext } = useFiltersBarContext()
    const smallViewport = useTypedSelector(state => state.app.screenWidth.smallViewport)
    const currentUser = useTypedSelector(state => state.currentUser)
    const user = useTypedSelector(state => state.auth.user)
    const [showFilters, setShowFilters] = useState(false)
    const catalogue = props.match.params.catalogue!

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(catalogue.id))
    }, [catalogue.id])

    useEffect(() => {
        if (!catalogue.fetchingFieldsChoices) {
            if (!navigationRedesign) {
                const filters = deprecatedBuildFilters(catalogue.fields, catalogue.itemsRanges)
                deprecatedFiltersContext.filtersContext.changeFilters(filters)
            } else {
                const filters = buildFilters(catalogue.fields, catalogue.itemsRanges)
                filtersContext.changeFilters(filters)
            }
        }
    }, [catalogue.fetchingFieldsChoices])

    useEffect(() => {
        scrollTop()
    }, [catalogue.id])

    if (!navigationRedesign) {
        return (
            <div className={styles.catalogue}>
                <div className={styles.wrapper}>
                    {catalogue.itemsRanges.date.min &&
                        <DeprecatedFiltersBar />
                    }
                    <div className={styles.mainContent}>
                        {filtersContext.filters.length > 0 &&
                            <CatalogueItems key={catalogue.id} catalogueId={catalogue.id} />
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <FiltersBarBulkContextProvider
            searchValue={searchValue}
            sortValue={sortValue}
            filtersValue={filtersValue}
            filtersBarValue={filtersBarValue}
            onChange={() => { }}
            showFilters={showFilters}
        >
            <div className={styles.catalogue}>
                {user?.id !== currentUser.user?.id && (
                    <CatalogueHeader
                        className={styles.header}
                        catalogue={catalogue}
                    />
                )}
                <div className={styles.wrapper}>
                    <div className={styles.mainContent}>
                        <CatalogueItems
                            catalogueId={catalogue.id}
                            key={catalogue.id}
                        />
                    </div>
                </div>
            </div>
        </FiltersBarBulkContextProvider>
    )
}

export default Catalogue