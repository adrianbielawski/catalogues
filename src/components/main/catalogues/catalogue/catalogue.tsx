import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Utils
import buildFilters from '../filter-bar-utils/filtersBuilder'
import { scrollTop } from 'src/utils'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from 'components/global-components/filters-bar/filtersBar'
import useFiltersBarContext from 'components/global-components/filters-bar/useFiltersBarContext'
import CatalogueHeader from './catalogue-header/catalogueHeader'

const cx = classNames.bind(styles)

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const { filtersContext } = useFiltersBarContext()
    const app = useTypedSelector(state => state.app)
    const currentUser = useTypedSelector(state => state.currentUser)
    const user = useTypedSelector(state => state.auth.user)
    const [yOffset, setYOffset] = useState(0)
    const [scrolledUp, setScrolledUp] = useState(true)
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [yOffset, scrolledUp])

    const handleScroll = () => {
        const offset = window.pageYOffset
        let up = scrolledUp

        if (offset >= yOffset) {
            up = false
        }
        if (offset < yOffset) {
            up = true
        }

        setYOffset(offset)
        setScrolledUp(up)
    }

    const headerClass = cx(
        'header',
        {
            show: scrolledUp,
        }
    )

    return (
        <div className={styles.catalogue}>
            {(app.switches.find(s => s === 'NAVIGATION_REDESIGN') && user?.id !== currentUser.user?.id) && (
                <CatalogueHeader
                    className={headerClass}
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