import React from 'react'
import styles from './newItemModal.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import EditItem from '../../catalogue-item/edit-item/editItem'

const NewItemModal = () => {
    const itemsData = useTypedSelector(state => state.itemsData)

    return (
        <AnimatedModal
            show={itemsData.newItemId !== null}
            className={styles.newItemModal}
        >
            <div className={styles.editItem}>
                <EditItem
                    show={itemsData.newItemId !== null}
                    itemId={itemsData.newItemId!}
                    isItemNew={true}
                />
            </div>
        </AnimatedModal>
    )
}

export default NewItemModal