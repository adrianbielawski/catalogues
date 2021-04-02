import React from 'react'
import styles from './latestFromFavourites.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custon hooks and utils
import { useElementInView } from 'src/hooks/useElementInView'
//Custom components
import Button from 'components/global-components/button/button'
import Column from '../column/column'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'

const LatestFromFavourites = () => {
    const latestFromFav = useTypedSelector(state => state.itemsData)
    
    const fetchLatestFromFav = (page: number) => {
    
    }

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && latestFromFav.next && latestFromFav.next > 2) {
            fetchLatestFromFav(latestFromFav.next)
        }
    }

    const thirdFromTheEndRef = useElementInView(handleIntersecting)


    const handleSeeMoreClick = () => {
        fetchLatestFromFav(2)
    }

    const items = latestFromFav.results.map((c, i) => {
        const ref = i === latestFromFav.results.length - 2 ? thirdFromTheEndRef : null
        return (
            <CatalogueItem
                className={styles.item}
                item={c}
                isNarrow={true}
                key={c.id}
                ref={ref}
            />
        )
    })

    return (
        <Column
            className={styles.latestFromFavourites}
            title="Latest from favourites"
        >
            {latestFromFav.results.length > 0 && 
                <ul>{items}</ul>
            }
            {latestFromFav.next === 2 && (
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

export default LatestFromFavourites