import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './latestCatalogues.scss'
//Redux
import { CLEAR_LATEST_CATALOGUES, FETCH_LATEST_CATALOGUES } from 'store/modules/homepage/latest-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import Loader from 'components/global-components/loader/loader'

const cx = classNames.bind(styles)

const LatestCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const latestCatalogues = useTypedSelector(state => state.modules.homepage.latestCatalogues)
    const cataloguesData = latestCatalogues.cataloguesData!

    useEffect(() => {
        fetchCatalogues(1)

        return () => {
            dispatch(CLEAR_LATEST_CATALOGUES())
        }
    }, [])

    const fetchCatalogues = (page?: number) => {
        dispatch(FETCH_LATEST_CATALOGUES(page || cataloguesData?.next || 1))
    }

    const cataloguesComponents = () => {
        return cataloguesData.results.map((id, i) => {
            const catalogueCardClass = cx(
                'catalogueCard',
                {
                    last: i === cataloguesData.results.length - 1,
                }
            )

            return (
                <CatalogueCard
                    className={catalogueCardClass}
                    catalogue={catalogues[id]!}
                    key={id}
                />
            )
        })
    }

    if (!cataloguesData || latestCatalogues.isFetchingCatalogues && !cataloguesData.results.length) {
        return <Loader className={styles.loader} />
    }

    if (!latestCatalogues.isFetchingCatalogues && !cataloguesData.results.length) {
        return <p className={styles.noContent}>No content</p>
    }

    return (
        <PaginatedList
            next={cataloguesData.next}
            buttonChild="See more"
            isFetching={latestCatalogues.isFetchingCatalogues}
            fetchOnButtonClick="once"
            intersectingElement={3}
            onLoadMore={fetchCatalogues}
        >
            {cataloguesComponents()}
        </PaginatedList>
    )
}

export default LatestCatalogues