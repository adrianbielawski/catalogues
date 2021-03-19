import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteItemIcon.scss'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { ADD_ITEM_TO_FAVOURITE, DELETE_ITEM_FROM_FAVOURITE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    itemId: number,
    isFavourite: boolean,
}

const cx = classNames.bind(styles)

const FavouriteItemIcon = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleChange = () => {
        if (!props.isFavourite) {
            dispatch(ADD_ITEM_TO_FAVOURITE({
                itemId: props.itemId,
                isFavourite: true,
            }))
        } else {
            dispatch(DELETE_ITEM_FROM_FAVOURITE(props.itemId))
        }
    }

    const iconClass = cx(
        'favouriteItemIcon',
        {
            active: props.isFavourite
        },
    )

    return (
        <TransparentButton
            className={iconClass}
            onClick={handleChange}
        >
            <FontAwesomeIcon icon={faHeart} />
        </TransparentButton>
    )
}

export default FavouriteItemIcon