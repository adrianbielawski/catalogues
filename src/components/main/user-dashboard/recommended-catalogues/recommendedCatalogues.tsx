import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './recommendedCatalogues.scss'
//Redux
import {
    CLEAR_RECOMENDED_CATALOGUES, FETCH_RECOMMENDED_CATALOGUES
} from 'store/modules/auth-user-dashboard/recomended-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import Loader from 'components/global-components/loader/loader'

const cx = classNames.bind(styles)

const RecommendedCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const recommended = useTypedSelector(state => state.modules.authUserDashboard.recomendedCatalogues)
    const cataloguesData = recommended.cataloguesData!

    useEffect(() => {
        fetchRecommended(1)

        return () => {
            dispatch(CLEAR_RECOMENDED_CATALOGUES())
        }
    }, [])

    const fetchRecommended = (page?: number) => {
        dispatch(FETCH_RECOMMENDED_CATALOGUES({
            page: page || cataloguesData?.next || 1,
            salt: cataloguesData?.salt || undefined,
        }))
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

    if (!cataloguesData || recommended.isFetchingCatalogues && !cataloguesData.results.length) {
        return <Loader className={styles.loader} />
    }

    if (!recommended.isFetchingCatalogues && !cataloguesData.results.length) {
        return <p className={styles.noContent}>No content</p>
    }

    return (
        <PaginatedList
            next={cataloguesData.next}
            buttonChild="See more"
            isFetching={recommended.isFetchingCatalogues}
            fetchOnButtonClick="once"
            intersectingElement={3}
            onLoadMore={fetchRecommended}
        >
            {cataloguesComponents()}
        </PaginatedList>
    )
}

export default RecommendedCatalogues