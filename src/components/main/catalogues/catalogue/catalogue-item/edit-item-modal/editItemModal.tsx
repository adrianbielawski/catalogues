import React, { useState, useRef, useEffect } from 'react'
import styles from './editItemModal.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import Modal from 'components/global-components/modal/modal'
import EditableList from 'components/global-components/editable-list/editableList'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'

type Props = {
    show: boolean,
    item: DeserializedItem
    onClose: () => void
}
type OnConfirm = (input: string[]) => void

const EditItemModal = (props: Props) => {
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

    const handleNameChange: OnConfirm = (newName) => {
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

    const IMAGES = [
        {
            url: 'http://placekitten.com/300/300',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/300/300',
            isMain: true,
        },
        {
            url: 'http://placekitten.com/300/300',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/300/400',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/120/90',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/200/120',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/200/240',
            isMain: false,
        },
        {
            url: 'http://placekitten.com/200/300',
            isMain: false,
        },
    ]

    return (
        <Modal show={props.show} parent={modalParent!} onClose={handleClose}>
            <div className={styles.editItemModal} ref={editItemRef} >
                <ImagesCarousel width={width * .7} images={IMAGES} />
                <EditableList className={styles.editableList} fields={FIELDS} />
            </div>
        </Modal>
    )
}

export default EditItemModal