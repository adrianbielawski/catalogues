import React from 'react'
import styles from './itemRating.module.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_RATING } from 'store/modules/current-user-items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import AverageRating from 'components/global-components/average-rating/averageRating'
import UserRating from 'components/global-components/user-rating/userRating'

type Props = {
    item: DeserializedItem,
}

const ItemRating = (props: Props) => {
    const { item } = props
    const dispatch = useAppDispatch()

    const handleRatingChange = (rating: number) => {
        dispatch(CHANGE_ITEM_RATING({
            itemId: item.id,
            rating: item.rating.currentUser === rating ? null : rating,
            prevRating: item.rating,
        }))
    }

    return (
        <div className={styles.itemRating}>
            <AverageRating
                rating={item.rating.average}
                count={item.rating.count}
            />
            {item.permissions.canRate && (
                <UserRating
                    rating={item.rating.currentUser}
                    range={5}
                    onChange={handleRatingChange}
                />
            )}
        </div>
    )
}

export default ItemRating