import React, { useState, useRef, useEffect } from 'react'
import styles from './editItem.scss'
//Types
import { DeserializedItem, Image } from 'src/globalTypes'
//Custom components
import EditableList from 'components/global-components/editable-list/editableList'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import { cloneDeep } from 'lodash'
import AddImage from './add-image/addImage'
import Button from 'components/global-components/button/button'

type Props = {
    show: boolean,
    item: DeserializedItem
    onClose: () => void
}

const mod = (i: number, n: number): number => ((i % n) + n) % n

const EditItem = (props: Props) => {
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

    const handleNameChange = (newName: string[]) => {
    }

    const FIELDS = [
        {
            title: 'Id',
            content: [props.item.id.toString()],
        },
        {
            title: "Name",
            content: [props.item.name],
            onConfirm: handleNameChange,
        },
    ]

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
            <AddImage className={styles.addImageButton} onConfirm={handleAddImage} />
            <EditableList
                className={styles.editableList}
                fields={FIELDS}
            />
            <Button className={styles.closeButton} onClick={props.onClose}>
                Close
            </Button>
        </div>
    )
}

export default EditItem