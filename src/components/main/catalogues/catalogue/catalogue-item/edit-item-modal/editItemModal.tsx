import React from 'react'
import styles from './editItemModal.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import Modal from 'components/global-components/modal/modal'

type Props = {
    show: boolean,
    item: DeserializedItem
    onClose: () => void
}

const EditItemModal = (props: Props) => {
    const modalParent = document.getElementById('catalogueMainContent')

    const handleClose = () => {
        props.onClose()
    }

    return (
        <Modal show={props.show} parent={modalParent!} onClose={handleClose}>
            <div className={styles.editItemModal}>
                Item: {props.item.id}
            </div>
        </Modal>
    )
}

export default EditItemModal