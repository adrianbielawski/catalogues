import React from 'react'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './editItemButton.module.scss'
//Redux
import { TOGGLE_EDIT_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    itemId: number,
    onClick: () => void,
}

const EditItemButton = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleEdit = () => {
        dispatch(TOGGLE_EDIT_ITEM(props.itemId))
    }

    return (
        <TransparentButton className={styles.editButton} onClick={props.onClick}>
            <FontAwesomeIcon icon={faEdit} />
        </TransparentButton>
    )
}

export default EditItemButton