import React from 'react'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import styles from './itemData.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { TOGGLE_EDIT_ITEM } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch } from 'store/storeConfig'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    item: DeserializedItem,
}

const ItemData = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleEdit = () => {
        dispatch(TOGGLE_EDIT_ITEM(props.item.id))
    }

    return (
        <div className={styles.itemData}>
            <div className={styles.wrapper} >
                <p>
                    <span>Id: </span>{props.item.id}
                </p>
                <p>
                    {moment(props.item.createdAt).format('DD MMMM YYYY')}
                </p>
            </div>
            {props.item.permissions.canEdit
                ? (
                    <TransparentButton className={styles.editButton} onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </TransparentButton>
                )
                : null
            }
        </div>
    )
}

export default ItemData