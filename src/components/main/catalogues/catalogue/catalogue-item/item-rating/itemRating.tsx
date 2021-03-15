import React from 'react'
import styles from './itemRating.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CHANGE_ITEM_RATING } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
import AverageRating from 'components/global-components/average-rating/averageRating'
import UserRating from 'components/global-components/user-rating/userRating'

type Props = {
    item: DeserializedItem,
}

const ItemRating = (props: Props) => {
    const dispatch = useAppDispatch()
    const user = useTypedSelector(state => state.auth.user)

    const handleRatingChange = (rating: number) => {
        dispatch(CHANGE_ITEM_RATING({
            itemId: props.item.id,
            rating,
        }))
    }

    return (
        <div className={styles.itemRating}>
            <AverageRating
                rating={props.item.rating.average}
                count={props.item.rating.count}
            />

            {!props.item.permissions.canEdit && user !== null
                ? (
                    <UserRating
                        rating={props.item.rating.currentUser}
                        range={5}
                        onChange={handleRatingChange}
                    />
                ) : null
            }
        </div>
    )
}

export default ItemRating