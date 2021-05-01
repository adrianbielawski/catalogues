import React from 'react'
import styles from './newItemModal.scss'
//Redux
import { DELETE_ITEM, SAVE_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemDataSelector, authUserCatalogueDataSelector, itemSelector } from 'store/selectors'
//Components
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import EditItem from '../../catalogue-item/edit-item/editItem'

const NewItemModal = () => {
    const dispatch = useAppDispatch()
    const currentUserItems = useTypedSelector(state => state.modules.currentUserItems)
    const catalogueData = useTypedSelector(authUserCatalogueDataSelector(currentUserItems.catalogueId!))
    const itemData = useTypedSelector(itemDataSelector(currentUserItems.newItemId!))
    const item = useTypedSelector(itemSelector(currentUserItems.newItemId!))

    const handleEditConfirm = () => {
        dispatch(SAVE_ITEM(item))
    }

    const handleEditCancel = () => {
        dispatch(DELETE_ITEM(item.id))
    }

    if (!itemData) {
        return null
    }

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
                        itemData={itemData}
                        catalogueData={catalogueData}
                        isItemNew={true}
                        onSave={handleEditConfirm}
                        onCancel={handleEditCancel}
                    />
                )}
            </div>
        </AnimatedModal>
    )
}

export default NewItemModal