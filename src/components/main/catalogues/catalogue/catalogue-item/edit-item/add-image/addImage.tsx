import React, { useState, useRef } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './addImage.scss'
//Custom components
import AddButton from './add-button/addButton'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import ImagePreview from './image-preview/imagePreview'

type Props = {
    onConfirm: (image: File) => void,
    className?: string,
}
interface Event<T = EventTarget> {
    target: T;
}

const cx = classNames.bind(styles)

const AddImage = (props: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File>()

    const handleImageChange = (e: Event<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            const img = e.target.files[0]
            setImage(img)
        }
    }

    const handleAddClick = () => {
        if (image === undefined) {
            showFileExplorer()
        }
    }

    const showFileExplorer = () => {
        fileInputRef.current!.click()
    }

    const handleConfirm = () => {
        if (image !== undefined) {
            props.onConfirm(image)
        }
        setImage(undefined)
        fileInputRef.current!.value = ''
    }

    const handleCancel = () => {
        setImage(undefined)
        fileInputRef.current!.value = ''
    }

    const addImageClass = cx(
        'addImage',
        props.className,
    )

    const contentClass = cx(
        'content',
        {
            active: image !== undefined,
        }
    )

    return (
        <div className={addImageClass}>
            <AddButton onClick={handleAddClick} />
            <input
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                capture="user"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
            <div className={contentClass}>
                {image !== undefined ? <ImagePreview image={image} onClick={showFileExplorer} /> : null}
                <div className={styles.buttons}>
                    <TransparentButton className={styles.confirm} onClick={handleConfirm}>
                        <FontAwesomeIcon icon={faCheck} />
                    </TransparentButton>
                    <TransparentButton className={styles.cancel} onClick={handleCancel}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                </div>
            </div>
        </div>
    )
}

export default AddImage