import React, { useState, useRef, useEffect } from 'react'
import styles from './editItem.scss'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemSelector } from 'store/selectors'
import {
    ADD_IMAGE_TO_STATE, CHANGE_PRIMARY_IMAGE, REMOVE_IMAGE_FROM_STATE
} from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import AddImage from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'
import ItemSettings from './item-settings/itemSettings'

type Props = {
    show: boolean,
    item: DeserializedItem
    onEditConfirm: () => void
    onCancel: () => void
}

const EditItem = (props: Props) => {
    const dispatch = useAppDispatch()
    const item = useTypedSelector(itemSelector(props.item.id))
    const delayCompleated = useDelay(item.isSubmitting)
    const editItemRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (editItemRef.current && props.show) {
            window.addEventListener('resize', handleResize)
            handleResize()
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [props.show])

    const handleResize = () => {
        if (editItemRef.current) {
            setTimeout(() => setWidth(
                editItemRef.current!.getBoundingClientRect().width
            ), 300)
        }
    }

    const handleImageRemove = (i: number) => {
        dispatch(REMOVE_IMAGE_FROM_STATE({
            itemId: item.id,
            index: i
        }))
    }

    const handleImageChange = (i: number) => {
        dispatch(CHANGE_PRIMARY_IMAGE({
            itemId: item.id,
            index: i
        }))
    }

    const handleAddImage = (image: string) => {
        dispatch(ADD_IMAGE_TO_STATE({
            itemId: item.id,
            image
        }))
    }

    return (
        <div className={styles.editItem} ref={editItemRef} >
            {item.images.length > 0
                ? <p className={styles.currentImage}>Main image</p>
                : null
            }
            <ImagesCarousel
                width={width}
                height={400}
                images={item.images}
                showCounter={true}
                onRemove={handleImageRemove}
                onChange={handleImageChange}
            />
            <AddImage
                className={styles.addImageButton}
                onConfirm={handleAddImage}
            />
            {!isNewItem &&
                <p className={styles.itemId}>
                    Item id: {props.item.id}
                </p>
            }
            <EditItemFields item={props.item} />
            <ItemSettings item={props.item} />
            <div className={styles.buttons}>
                <Button
                    disabled={item.isSubmitting}
                    loading={delayCompleated}
                    onClick={props.onEditConfirm}
                >
                    Save changes
                </Button>
                <Button
                    disabled={item.isSubmitting}
                    onClick={props.onCancel}
                >
                    Cancel changes
                </Button>
            </div>
        </div>
    )
}

export default EditItem