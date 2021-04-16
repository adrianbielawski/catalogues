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
    const items = useTypedSelector(state => state.entities.items.entities)
    const itemsData = useTypedSelector(state => state.modules.currentUserItems.itemsData)
    
    const fetchLatestFromFav = (page: number) => {
    
    }

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && itemsData.next && itemsData.next > 2) {
            fetchLatestFromFav(itemsData.next)
        }
    }

    const thirdFromTheEndRef = useElementInView(handleIntersecting)


    const handleSeeMoreClick = () => {
        fetchLatestFromFav(2)
    }

    const itemsComponents = itemsData.results.map((c, i) => {
        const ref = i === itemsData.results.length - 2 ? thirdFromTheEndRef : null
        return (
            <CatalogueItem
                className={styles.item}
                itemData={c}
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
            {itemsData.results.length > 0 && 
                <ul>
                    {itemsComponents}
                </ul>
            }
            {itemsData.next === 2 && (
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