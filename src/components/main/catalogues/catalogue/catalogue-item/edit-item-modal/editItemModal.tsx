import React, { useState, useRef, useEffect } from 'react'
import styles from './editItemModal.scss'
//Types
import { DeserializedItem, Image } from 'src/globalTypes'
//Custom components
import Modal from 'components/global-components/modal/modal'
import EditableList from 'components/global-components/editable-list/editableList'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import { cloneDeep } from 'lodash'
import AddImage from './add-image/addImage'

type Props = {
    show: boolean,
    item: DeserializedItem
    onClose: () => void
}

const mod = (i: number, n: number): number => ((i % n) + n) % n

const EditItemModal = (props: Props) => {
    let IMAGES: Image[] = []

    const [images, setImages] = useState(IMAGES)
    const editItemRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const modalParent = document.getElementById('catalogueMainContent')

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        if (editItemRef.current !== null && props.show) {
            handleResize()
        } else {
            setWidth(0)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [props.show])

    const handleResize = () => {
        if (editItemRef.current !== null) {
            setWidth(editItemRef.current!.getBoundingClientRect().width)
        }
    }

    const handleClose = () => {
        props.onClose()
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
        <Modal show={props.show} parent={modalParent!} onClose={handleClose}>
            <div className={styles.editItemModal} ref={editItemRef} >
                {images.length > 0 ? <p className={styles.currentImage}>Main image</p> : null}
                <ImagesCarousel
                    width={width * .7}
                    images={images}
                    onRemove={handleImageRemove}
                    onChange={handleImageChange}
                />
                <AddImage onConfirm={handleAddImage} />
                <EditableList
                    className={styles.editableList}
                    fields={FIELDS}
                />
            </div>
        </Modal>
    )
}

export default EditItemModal