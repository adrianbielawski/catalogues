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
import EditItem from './edit-item/editItem'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    item: DeserializedItem
}

const CatalogueItem = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const screenWidth = window.innerWidth

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCloseModal = () => {
        setIsEditing(false)
    }

    const mainImage = <MainImage />
    const itemFields = <ItemFields item={props.item} />
    const editButton = (
        <TransparentButton className={styles.editButton} onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
        </TransparentButton>
    )

    return (
        <li className={styles.item}>
            {isEditing
                ? (<EditItem
                    show={isEditing}
                    item={props.item}
                    onClose={handleCloseModal}
                />
                )
                : screenWidth <= 640
                    ? (
                        <div className={styles.itemContent}>
                            {mainImage}
                            <div className={styles.contentWrapper}>
                                {itemFields}
                                {editButton}
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className={styles.itemContent}>
                                {mainImage}
                                {itemFields}
                            </div>
                            {editButton}
                        </>
                    )
            }
        </li>
    )
}

export default CatalogueItem