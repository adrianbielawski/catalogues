import React, { useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './addImage.scss'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'

type Props = {
    onAdd: (images: NewImage[]) => void,
    className?: string,
}

interface Event<T = EventTarget> {
    target: T;
}

export type NewImage = {
    url: string,
    dimensions: {
        width: number,
        height: number,
    }
}

const cx = classNames.bind(styles)

const AddImage = (props: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: Event<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            const files = Object.values(e.target.files)

            const getImage = async (f: File) => {
                const url = URL.createObjectURL(f)
                const img = new Image
                img.src = url
                await img.decode()

                return {
                    url,
                    dimensions: {
                        width: img.width,
                        height: img.height,
                    }
                }
            }

            Promise.all(files.map(f =>
                getImage(f)
            )).then(image => {
                props.onAdd(image)
            })

        }
    }

    const handleAddClick = () => {
        fileInputRef.current!.click()
    }

    const addImageClass = cx(
        'addImage',
        props.className,
    )

    return (
        <div className={addImageClass}>
            <AddButton
                text="Add image"
                className={styles.addButton}
                onClick={handleAddClick}
            />
            <input
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                multiple={true}
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </div>
    )
}

export default AddImage