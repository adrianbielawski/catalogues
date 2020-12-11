import React from 'react'
import styles from './editItemModal.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import Modal from 'components/global-components/modal/modal'
import EditableList from 'components/global-components/editable-list/editableList'

type Props = {
    show: boolean,
    item: DeserializedItem
    onClose: () => void
}
type OnConfirm = (input: string[]) => void

const EditItemModal = (props: Props) => {
    const modalParent = document.getElementById('catalogueMainContent')

    const handleClose = () => {
        props.onClose()
    }

    const handleNameChange: OnConfirm = (newName) => {
    }

    const FIELDS = [
        {
            title: 'Id',
            content: [props.item.id.toString()],
        },
        {
            title: "Name",
            content: [props.item.name],
            onConfirm: handleNameChange,
        },
    ]

    return (
        <Modal show={props.show} parent={modalParent!} onClose={handleClose}>
            <div className={styles.editItemModal}>
                <EditableList className={styles.editableList} fields={FIELDS} />
            </div>
        </Modal>
    )
}

export default EditItemModal