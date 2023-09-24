import { useCallback, useRef } from 'react'
import styles from './editItem.module.scss'
import {
  AuthUserCatalogueData,
  DeserializedItem,
  DeserializedItemData,
} from 'src/globalTypes'
import { useDelay } from 'src/hooks/useDelay'
import {
  ADD_IMAGES_TO_STATE,
  CHANGE_PRIMARY_IMAGE,
  REMOVE_IMAGE_FROM_STATE,
} from 'store/entities/items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemSelector } from 'store/selectors'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import AddImage, { NewImage } from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'
import ItemSettings from './item-settings/itemSettings'

interface Props {
  itemId: number
  itemData: DeserializedItemData
  catalogueData: AuthUserCatalogueData
  isItemNew: boolean
  onSave: (item: DeserializedItem) => void
  onCancel: (isNew: boolean) => void
}

const EditItem = ({
  itemId,
  itemData,
  catalogueData,
  isItemNew,
  onSave,
  onCancel,
}: Props) => {
  const dispatch = useAppDispatch()
  const largeViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.largeViewport,
  )
  const item = useTypedSelector(itemSelector(itemData.id))!

  const delayCompleted = useDelay(itemData.isSubmitting)
  const editItemRef = useRef<HTMLDivElement>(null)

  const handleImageRemove = useCallback(
    (index: number) => {
      dispatch(REMOVE_IMAGE_FROM_STATE({ itemId, index }))
    },
    [itemId],
  )

  const handlePrimaryImageChange = useCallback(
    (index: number) => {
      dispatch(CHANGE_PRIMARY_IMAGE({ itemId, index }))
    },
    [itemId],
  )

  const handleAddImage = useCallback(
    (images: NewImage[]) => {
      dispatch(ADD_IMAGES_TO_STATE({ itemId, images }))
    },
    [itemId],
  )

  const handleEditConfirm = useCallback(() => {
    onSave(item)
  }, [onSave, item])

  const handleEditCancel = useCallback(() => {
    onCancel(isItemNew)
  }, [onCancel, isItemNew])

  if (catalogueData.isFetchingFieldsChoices) {
    return null
  }

  return (
    <div className={styles.editItem} ref={editItemRef}>
      <div className={styles.carouselWrapper}>
        <ImagesCarousel
          images={item.images}
          singleView={!largeViewport}
          useThumbnails={true}
          showCounter={true}
          showPrimaryStar={true}
          onRemove={handleImageRemove}
          onPrimaryChange={handlePrimaryImageChange}
        />
      </div>
      <div className={styles.contentWrapper}>
        <AddImage className={styles.addImageButton} onAdd={handleAddImage} />
        {!isItemNew && <p className={styles.itemId}>Item id: {item.id}</p>}
        <EditItemFields
          item={item}
          fieldsData={catalogueData.fieldsData}
          parentFieldId={null}
        />
        <ItemSettings itemData={itemData} />
        <div className={styles.buttons}>
          <Button
            disabled={itemData.isSubmitting}
            loading={delayCompleted}
            onClick={handleEditConfirm}
          >
            Save
          </Button>
          <Button onClick={handleEditCancel}>
            {isItemNew ? 'Cancel' : 'Cancel changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditItem
