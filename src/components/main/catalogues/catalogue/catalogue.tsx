import React, { useEffect } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch } from 'store/storeConfig'
//Utils
import buildFilters from '../filter-bar-utils/filtersBuilder'
import { scrollTop } from 'src/utils'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from 'components/global-components/filters-bar/filtersBar'
import useFiltersBarContext from 'components/global-components/filters-bar/useFiltersBarContext'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const { filtersContext } = useFiltersBarContext()
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
            {catalogue.itemsRanges.date.min &&
                <FiltersBar />
            }
            <div className={styles.mainContent}>
                {filtersContext.filters.length > 0 &&
                    <CatalogueItems key={catalogue.id} catalogueId={catalogue.id} />
                }
            </div>
        </div>
    )
}

export default Catalogue