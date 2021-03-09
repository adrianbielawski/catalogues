import React, { useState, useRef, useEffect } from 'react'
import styles from './editItem.scss'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { itemSelector } from 'store/selectors'
import {
    ADD_IMAGE_TO_STATE, CHANGE_PRIMARY_IMAGE, DELETE_ITEM, REFRESH_ITEM, REMOVE_IMAGE_FROM_STATE, SAVE_ITEM
} from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
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
    const item = useTypedSelector(itemSelector(props.itemId))
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

    const handleAddImage = (images: string[]) => {
        dispatch(ADD_IMAGE_TO_STATE({
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
            dispatch(REFRESH_ITEM(item.id))
        }
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
                onAdd={handleAddImage}
            />
            {!props.isItemNew &&
                <p className={styles.itemId}>
                    Item id: {item.id}
                </p>
            }
            <EditItemFields item={item} />
            <ItemSettings item={item} />
            <div className={styles.buttons}>
                <Button
                    disabled={item.isSubmitting}
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
    )
}

export default EditItem