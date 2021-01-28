import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './editItem.scss'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
import { itemSelector } from 'store/selectors'
import { addImageToState, changePrimaryImage, removeImageFromState } from 'store/actions/cataloguesActions'
//Custom components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import AddImage from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'

type Props = {
    show: boolean,
    item: DeserializedItem
    onEditConfirm: () => void
    onCancel: () => void
}

const EditItem = (props: Props) => {
    const dispatch = useDispatch()
    const item = useTypedSelector(itemSelector(props.item.catalogueId, props.item.id))
    const delayCompleated = useDelay(item.isSubmitting)
    const editItemRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const screenWidth = window.innerWidth

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
        dispatch(removeImageFromState(item.catalogueId, item.id, i))
    }

    const handleImageChange = (i: number) => {
        dispatch(changePrimaryImage(item.catalogueId, item.id, i))
    }

    const handleAddImage = (image: File) => {
        dispatch(addImageToState(item.catalogueId, item.id, image))
    }

    return (
        <div className={styles.editItem} ref={editItemRef} >
            {item.images.length > 0 ? <p className={styles.currentImage}>Main image</p> : null}
            <ImagesCarousel
                width={screenWidth > 800 ? width * .8 : width}
                images={item.images}
                onRemove={handleImageRemove}
                onChange={handleImageChange}
            />
            <AddImage
                className={styles.addImageButton}
                onConfirm={handleAddImage}
            />
            <EditItemFields item={props.item} />
            <div className={styles.buttons}>
                <Button
                    className={styles.closeButton}
                    loading={delayCompleated}
                    onClick={props.onEditConfirm}
                >
                    Save
                </Button>
                <Button
                    className={styles.closeButton}
                    onClick={props.onCancel}
                >
                    Close
                </Button>
            </div>
        </div>
    )
}

export default EditItem