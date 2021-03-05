import React, { useEffect, useState } from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './itemSettings.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import Button from 'components/global-components/button/button'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'
import { useAppDispatch } from 'store/storeConfig'
import { DELETE_ITEM } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'

type Props = {
    item: DeserializedItem,
}

const ItemSettings = (props: Props) => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState<ProtectedMessage | null>(null)
    const isNewItem = props.item.id.toString().startsWith('newItem')

    useEffect(() => {
        if (!props.item.isDeleting) {
            setMessage(null)
        }
    }, [props.item.isDeleting])

    const handleDeleteItem = () => {
        setMessage({
            title: 'Delete item',
            value: `Are you sure you want to delete item with id: ${props.item.id}?`,
            expectedInput: props.item.id.toString(),
        })
    }

    const deleteItem = () => {
        dispatch(DELETE_ITEM(props.item.id as number))
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
                    disabled={props.item.isSubmitting}
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