import React, { useEffect, useState } from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './itemSettings.scss'
//Redux
import { DELETE_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemDataSelector } from 'store/selectors'
//Components
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import Button from 'components/global-components/button/button'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'

type Props = {
    itemId: number,
}

const ItemSettings = (props: Props) => {
    const dispatch = useAppDispatch()
    const itemData = useTypedSelector(itemDataSelector(props.itemId))
    const [message, setMessage] = useState<ProtectedMessage | null>(null)
    const isNewItem = props.itemId.toString().startsWith('newItem')

    useEffect(() => {
        if (!itemData.isDeleting) {
            setMessage(null)
        }
    }, [itemData.isDeleting])

    const handleDeleteItem = () => {
        setMessage({
            title: 'Delete item',
            value: `Are you sure you want to delete item with id: ${props.itemId}?`,
            expectedInput: props.itemId.toString(),
        })
    }

    const deleteItem = () => {
        dispatch(DELETE_ITEM(props.itemId as number))
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
                    disabled={itemData.isSubmitting}
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