import React, { useRef } from 'react'
import styles from './editItem.module.scss'
//Types
import { AuthUserCatalogueData, DeserializedItem, DeserializedItemData } from 'src/globalTypes'
//Hooks
import { useDelay } from 'src/hooks/useDelay'
//Redux
import { ADD_IMAGES_TO_STATE, CHANGE_PRIMARY_IMAGE, REMOVE_IMAGE_FROM_STATE } from 'store/entities/items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemSelector } from 'store/selectors'
//Components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import AddImage, { NewImage } from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'
import ItemSettings from './item-settings/itemSettings'

type Props = {
    show: boolean,
    itemId: number,
    itemData: DeserializedItemData,
    catalogueData: AuthUserCatalogueData,
    isItemNew: boolean,
    className?: string,
    onSave: (item: DeserializedItem) => void,
    onCancel: (isNew: boolean) => void,
}

const EditItem = (props: Props) => {
    const dispatch = useAppDispatch()
    const largeViewport = useTypedSelector(state => state.modules.app.screenWidth.largeViewport)
    const item = useTypedSelector(itemSelector(props.itemData.id))
    const delayCompleated = useDelay(props.itemData.isSubmitting)
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

    const handleAddImage = (images: NewImage[]) => {
        dispatch(ADD_IMAGES_TO_STATE({
            itemId: item.id,
            images
        }))
    }

    const handleEditConfirm = () => {
        props.onSave(item)
    }

    const handleEditCancel = () => {
        props.onCancel(props.isItemNew)
    }

    if (props.catalogueData.isFetchingFieldsChoices) {
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
                <EditItemFields
                    item={item}
                    fieldsData={props.catalogueData.fieldsData}
                />
                <ItemSettings
                    itemData={props.itemData}
                />
                <div className={styles.buttons}>
                    <Button
                        disabled={props.itemData.isSubmitting}
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