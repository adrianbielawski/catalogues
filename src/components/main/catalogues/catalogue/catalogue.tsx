import React, { useEffect } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks and Utils
import { useSwitches } from 'src/customHooks'
import buildFilters from '../filter-bar-utils/filtersBuilder'
import { scrollTop } from 'src/utils'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from 'components/global-components/filters-bar/filtersBar'
import useFiltersBarContext from 'components/global-components/filters-bar/useFiltersBarContext'
import CatalogueHeader from './catalogue-header/catalogueHeader'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const { filtersContext } = useFiltersBarContext()
    const currentUser = useTypedSelector(state => state.currentUser)
    const user = useTypedSelector(state => state.auth.user)
    const [navigationRedesign] = useSwitches(['NAVIGATION_REDESIGN'])
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

    return (
        <div className={styles.catalogue}>
            {(navigationRedesign && user?.id !== currentUser.user?.id) && (
                <CatalogueHeader
                    className={styles.header}
                    catalogue={catalogue}
                />
            )}
            <div className={styles.wrapper}>
                {catalogue.itemsRanges.date.min &&
                    <FiltersBar />
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

export default Catalogue