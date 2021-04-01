import React from 'react'
import styles from './recomendedCatalogues.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { FETCH_RECOMENDED_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custon hooks and utils
import { useElementInView } from 'src/hooks/useElementInView'
//Custom components
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import Button from 'components/global-components/button/button'
import Column from '../column/column'

const RecomendedCatalogues = () => {
    const dispatch = useAppDispatch()
    const cats = useTypedSelector(state => state.catalogues.authUser.catalogues)
    const recomended = useTypedSelector(state => state.catalogues.authUser.recomended)

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

    const catalogues = cats.map((c, i) => {
        const ref = i === cats.length - 3 ? thirdFromTheEndRef : null
        return (
            <CatalogueCard
                catalogue={c}
                key={c.id}
                ref={ref}
            />
        )
    })

    return (
        <Column
            className={styles.recomendedCatalogues}
            title="Recomended catalogues"
        >
            {catalogues}
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