import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './recommendedCatalogues.scss'
//Redux
import { FETCH_RECOMMENDED_CATALOGUES } from 'store/modules/auth-user-dashboard/recomended-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import Column from '../column/column'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import Loader from 'components/global-components/loader/loader'

const cx = classNames.bind(styles)

const RecommendedCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const recommended = useTypedSelector(state => state.modules.authUserDashboard.recomendedCatalogues)
    const cataloguesData = recommended.cataloguesData

    useEffect(() => {
        fetchRecommended()
    }, [])

    const fetchRecommended = () => {
        dispatch(FETCH_RECOMMENDED_CATALOGUES(cataloguesData.next || 1))
    }

    const cataloguesComponents = cataloguesData.results.map((id, i) => {
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
    
    if (recommended.isFetchingCatalogues && !cataloguesData.results.length) {
        return <Loader className={styles.loader} />
    }

    return (
        <Column
            className={styles.recommendedCatalogues}
            title="Recommended catalogues"
        >
            <PaginatedList
                className={styles.list}
                next={cataloguesData.next}
                buttonChild="See more"
                isFetching={recommended.isFetchingCatalogues}
                fetchOnButtonClick="once"
                intersectingElement={3}
                onLoadMore={fetchRecommended}
            >
                {cataloguesComponents}
            </PaginatedList>
        </Column>
    )
}

export default RecommendedCatalogues