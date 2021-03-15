import React from 'react'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './editItemButton.scss'
//Redux
import { TOGGLE_EDIT_ITEM } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch } from 'store/storeConfig'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    itemId: number,
}

const EditItemButton = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleEdit = () => {
        dispatch(TOGGLE_EDIT_ITEM(props.itemId))
    }

    return (
        <TransparentButton className={styles.editButton} onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
        </TransparentButton>
    )
}

export default EditItemButton