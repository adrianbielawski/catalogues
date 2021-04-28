import React, { useEffect, useState } from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './itemSettings.scss'
//Types
import { DeserializedItemData } from 'src/globalTypes'
//Redux
import { DELETE_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import Button from 'components/global-components/button/button'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'

type Props = {
    itemData: DeserializedItemData,
}

const ItemSettings = (props: Props) => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState<ProtectedMessage | null>(null)
    const isNewItem = props.itemData.id.toString().startsWith('newItem')

    useEffect(() => {
        if (!props.itemData.isDeleting) {
            setMessage(null)
        }
    }, [props.itemData.isDeleting])

    const handleDeleteItem = () => {
        setMessage({
            title: 'Delete item',
            value: `Are you sure you want to delete item with id: ${props.itemData.id}?`,
            expectedInput: props.itemData.id.toString(),
        })
    }

    const deleteItem = () => {
        dispatch(DELETE_ITEM(props.itemData.id as number))
    }

    const clearMessage = () => {
        setMessage(null)
    }

    return (
        <IconWithTitle
            title={'Item settings'}
            icon={faListAlt}
        >
            <div className={styles.itemSettings}>
            {!isNewItem &&
                <Button
                    className={styles.deleteButton}
                    disabled={props.itemData.isSubmitting}
                    onClick={handleDeleteItem}
                >
                    Delete item
                </Button>
            }
            <ProtectedConfirmMessageModal
                show={message !== null}
                message={message}
                onConfirm={deleteItem}
                onCancel={clearMessage}
            />
            </div>
        </IconWithTitle>
    )
}

export default ItemSettings