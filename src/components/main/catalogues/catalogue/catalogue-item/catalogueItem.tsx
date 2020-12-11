import React, { useState } from 'react'
import styles from './catalogueItem.scss'
//Redux
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import ItemFields from './item-fields/itemFields'
import MainImage from './main-image/mainImage'
import EditButton from 'components/global-components/edit-button/editButton'
import EditItemModal from './edit-item-modal/editItemModal'

type Props = {
    item: DeserializedItem
}

const CatalogueItem = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCloseModal = () => {
        setIsEditing(false)
    }

    return (
        <li className={styles.item}>
            <div className={styles.itemContent}>
                <MainImage />
                <ItemFields item={props.item} />
            </div>
            <EditButton onClick={handleEdit} />
            <EditItemModal
                show={isEditing}
                item={props.item}
                onClose={handleCloseModal}
            />
        </li>
    )
}

export default CatalogueItem