import React from 'react'
import styles from './newItemModal.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Components
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import EditItem from '../../catalogue-item/edit-item/editItem'

const NewItemModal = () => {
    const currentUserItems = useTypedSelector(state => state.modules.currentUserItems)

    return (
        <AnimatedModal
            show={currentUserItems.newItemId !== null}
            className={styles.newItemModal}
        >
            <div className={styles.editItem}>
                {currentUserItems.newItemId && (
                    <EditItem
                        show={currentUserItems.newItemId !== null}
                        itemId={currentUserItems.newItemId!}
                        isItemNew={true}
                    />
                )}
            </div>
        </AnimatedModal>
    )
}

export default NewItemModal