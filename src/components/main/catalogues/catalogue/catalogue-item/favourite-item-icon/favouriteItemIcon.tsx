import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteItemIcon.scss'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CHANGE_FAVOURITE_ITEM } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
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
        dispatch(CHANGE_FAVOURITE_ITEM({
            itemId: props.itemId,
            isFavourite: !props.isFavourite,
        }))
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