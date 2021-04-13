import React from 'react'
import styles from './recomendedCatalogues.scss'
//Redux
import { FETCH_RECOMENDED_CATALOGUES } from 'store/modules/auth-user-dashboard/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Hooks and utils
import { useElementInView } from 'src/hooks/useElementInView'
//Components
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import Button from 'components/global-components/button/button'
import Column from '../column/column'

const RecomendedCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const recomended = useTypedSelector(state => state.modules.authUserDashboard.recomendedCataloguesData)

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && recomended.next && recomended.next > 2) {
            fetchRecomended(recomended.next)
        }
    }

    const thirdFromTheEndRef = useElementInView(handleIntersecting)

    const fetchRecomended = (page: number) => {
        dispatch(FETCH_RECOMENDED_CATALOGUES(page))
    }

    const handleSeeMoreClick = () => {
        fetchRecomended(2)
    }

    const cataloguesComponents = recomended.results.map((id, i) => {
        const ref = i === recomended.results.length - 3 ? thirdFromTheEndRef : null
        return (
            <CatalogueCard
                catalogue={catalogues[id]!}
                key={id}
                ref={ref}
            />
        )
    })

    return (
        <Column
            className={styles.recomendedCatalogues}
            title="Recomended catalogues"
        >
            {cataloguesComponents}
            {recomended.next === 2 && (
                <Button
                    className={styles.button}
                    onClick={handleSeeMoreClick}
                >
                    See more
                </Button>
            )}
        </Column>
    )
}

export default RecomendedCatalogues