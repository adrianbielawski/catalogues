import { useCallback } from 'react'
import styles from './newItemModal.module.scss'
import { DELETE_ITEM, SAVE_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
  itemDataSelector,
  authUserCatalogueDataSelector,
  itemSelector,
} from 'store/selectors'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import EditItem from '../../catalogue-item/edit-item/editItem'

const NewItemModal = () => {
  const dispatch = useAppDispatch()
  const currentUserItems = useTypedSelector(
    (state) => state.modules.currentUserItems,
  )
  const catalogueData = useTypedSelector(
    authUserCatalogueDataSelector(currentUserItems.catalogueId!),
  )
  const itemData = useTypedSelector(
    itemDataSelector(currentUserItems.newItemId!),
  )
  const item = useTypedSelector(itemSelector(currentUserItems.newItemId!))!

  const handleEditConfirm = useCallback(() => {
    dispatch(SAVE_ITEM(item))
  }, [item])

  const handleEditCancel = useCallback(() => {
    dispatch(DELETE_ITEM(item.id))
  }, [item])

  if (itemData == null) {
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
            itemId={currentUserItems.newItemId}
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
