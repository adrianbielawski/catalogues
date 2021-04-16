import React, { useRef } from 'react'
import styles from './editItem.scss'
//Hooks
import { useDelay } from 'src/hooks/useDelay'
//Redux
import { ADD_IMAGES_TO_STATE, CHANGE_PRIMARY_IMAGE, REMOVE_IMAGE_FROM_STATE } from 'store/entities/items/slice'
import { DELETE_ITEM, REFRESH_CURRENT_USER_ITEM, SAVE_ITEM } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemSelector, itemDataSelector, currentUserCatalogueSelector } from 'store/selectors'
//Components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import AddImage from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'
import ItemSettings from './item-settings/itemSettings'

type Props = {
    show: boolean,
    itemId: number,
    isItemNew: boolean,
    className?: string,
}

const EditItem = (props: Props) => {
    const dispatch = useAppDispatch()
    const largeViewport = useTypedSelector(state => state.modules.app.screenWidth.largeViewport)
    const item = useTypedSelector(itemSelector(props.itemId))
    const itemData = useTypedSelector(itemDataSelector(props.itemId))
    const catalogueData = useTypedSelector(currentUserCatalogueSelector(item.catalogueId))
    const delayCompleated = useDelay(itemData.isSubmitting)
    const editItemRef = useRef<HTMLDivElement>(null)

    const handleImageRemove = (i: number) => {
        dispatch(REMOVE_IMAGE_FROM_STATE({
            itemId: item.id,
            index: i
        }))
    }

    const handlePrimaryImageChange = (i: number) => {
        dispatch(CHANGE_PRIMARY_IMAGE({
            itemId: item.id,
            index: i
        }))
    }

    const handleAddImage = (images: string[]) => {
        dispatch(ADD_IMAGES_TO_STATE({
            itemId: item.id,
            images
        }))
    }

    const handleEditConfirm = () => {
        dispatch(SAVE_ITEM(item))
    }

    const handleEditCancel = () => {
        if (props.isItemNew) {
            dispatch(DELETE_ITEM(item.id))
        } else {
            dispatch(REFRESH_CURRENT_USER_ITEM(item.id))
        }
    }

    if (catalogueData.isFetchingFieldsChoices) {
        return null
    }

    return (
        <div className={styles.editItem} ref={editItemRef} >
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
                <AddImage
                    className={styles.addImageButton}
                    onAdd={handleAddImage}
                />
                {!props.isItemNew &&
                    <p className={styles.itemId}>
                        Item id: {item.id}
                    </p>
                }
                <EditItemFields item={item} />
                <ItemSettings itemId={item.id} />
                <div className={styles.buttons}>
                    <Button
                        disabled={itemData.isSubmitting}
                        loading={delayCompleated}
                        onClick={handleEditConfirm}
                    >
                        Save
                </Button>
                    <Button
                        onClick={handleEditCancel}
                    >
                        {props.isItemNew ? 'Cancel' : 'Cancel changes'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditItem