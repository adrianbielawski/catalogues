import React, { useState, useRef, useEffect } from 'react'
import styles from './editItem.scss'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Types
import { DeserializedItem, Image } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
import { itemSelector } from 'store/selectors'
//Custom components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import { cloneDeep } from 'lodash'
import AddImage from './add-image/addImage'
import Button from 'components/global-components/button/button'
import EditItemFields from './edit-item-fields/editItemFields'

type Props = {
    show: boolean,
    item: DeserializedItem
    onEditConfirm: () => void
    onCancel: () => void
}

const mod = (i: number, n: number): number => ((i % n) + n) % n

const EditItem = (props: Props) => {
    const item = useTypedSelector(itemSelector(props.item.catalogueId, props.item.id))
    const delayCompleated = useDelay(item.isSubmitting)

    let IMAGES: Image[] = [
        {
            url: 'http://placekitten.com/400/400',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/200/400',
            isMain: true,
        },
        {
            url: 'http://placekitten.com/400/200',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/200/200',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/800/800',
            isMain: false,
        },
    ]

    const [images, setImages] = useState(IMAGES)
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
        let imgs = cloneDeep(images)
        if (imgs[i].isMain === true) {
            let newMainIndex = mod(i + 1, imgs.length)
            imgs[newMainIndex].isMain = true
        }
        imgs.splice(i, 1)
        setImages(imgs)
    }

    const handleImageChange = (i: number) => {
        let imgs = cloneDeep(images)
        const prevMain = imgs.findIndex(img => img.isMain === true)
        imgs[prevMain].isMain = false
        imgs[i].isMain = true
        setImages(imgs)
    }

    const handleAddImage = (image: File) => {
        let imgs = cloneDeep(images)
        const newImage = {
            url: URL.createObjectURL(image),
            isMain: imgs.length === 0 ? true : false,
        }
        imgs.push(newImage)
        setImages(imgs)
    }

    return (
        <div className={styles.editItem} ref={editItemRef} >
            {images.length > 0 ? <p className={styles.currentImage}>Main image</p> : null}
            <ImagesCarousel
                width={screenWidth > 800 ? width * .8 : width}
                images={images}
                onRemove={handleImageRemove}
                onChange={handleImageChange}
            />
            <AddImage
                className={styles.addImageButton}
                onConfirm={handleAddImage}
            />
            <EditItemFields itemId={props.item.id} />
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