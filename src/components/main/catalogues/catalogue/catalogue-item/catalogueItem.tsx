import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueItem.scss'
//Redux
import { useTypedSelector } from 'store/reducers'
import { itemSelector } from 'store/selectors'
import { saveItem, toggleEditItem } from 'store/actions/cataloguesActions'
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
    const dispatch = useDispatch()
    const item = useTypedSelector(itemSelector(props.item.catalogueId, props.item.id))
    const screenWidth = window.innerWidth

    const handleEdit = () => {
        dispatch(toggleEditItem(props.item.catalogueId, item.id))
    }

    const handleEditConfirm = () => {
        dispatch(saveItem(props.item.catalogueId, item))
    }

    const handleCancel = () => {
        dispatch(toggleEditItem(props.item.catalogueId, item.id))
    }

    const mainImage = <MainImage />
    const itemFields = <ItemFields item={item} />
    const editButton = (
        <TransparentButton className={styles.editButton} onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
        </TransparentButton>
    )

    return (
        <li className={styles.item}>
            {item.isEditing
                ? (
                    <EditItem
                        show={item.isEditing}
                        item={props.item}
                        onEditConfirm={handleEditConfirm}
                        onCancel={handleCancel}
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