import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueItem.scss'
//Redux
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import ItemFields from './item-fields/itemFields'
import MainImage from './main-image/mainImage'
import EditItemModal from './edit-item-modal/editItemModal'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

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
            <TransparentButton className={styles.editButton} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            <EditItemModal
                show={isEditing}
                item={props.item}
                onClose={handleCloseModal}
            />
        </li>
    )
}

export default CatalogueItem