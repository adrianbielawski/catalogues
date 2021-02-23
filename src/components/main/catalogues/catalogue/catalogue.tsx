import React, { useEffect } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch } from 'store/storeConfig'
//Filter bar utils
import buildFilters from '../filter-bar-utils/filtersBuilder'
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
            const filters = buildFilters(catalogue.fields)
            filtersContext.changeFilters(filters)
        }
    }, [catalogue.fetchingFieldsChoices])

    return (
        <div className={styles.catalogue}>
            <FiltersBar />
            <div id="catalogueMainContent" className={styles.mainContent}>
                {filtersContext.filters.length > 0 &&
                    <CatalogueItems key={catalogue.id} catalogueId={catalogue.id} />
                }
            </div>
        </div>
    )
}

export default Catalogue