import React, { useRef } from 'react'
import { faCamera, faSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './catalogueImage.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { POST_CATALOGUE_IMAGE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import Loader from 'components/global-components/loader/loader'
import NoInameIcon from 'components/global-components/no-image-icon/noImageIcon'

const BASE_URL = process.env.API_URL

interface Event<T = EventTarget> {
    target: T;
}

type Props = {
    url?: string,
    catalogue: DeserializedCatalogue,
}

const CatalogueImage = (props: Props) => {
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: Event<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            const files = Object.values(e.target.files)
            const image = files.map(f => URL.createObjectURL(f))[0]
            dispatch(POST_CATALOGUE_IMAGE({
                catalogueId: props.catalogue.id,
                image
            }))
        }
    }

    const handleClick = () => {
        fileInputRef.current!.click()
    }

    const image = props.url?.length
        ? (
            <img
                src={`${BASE_URL}${props.url}`}
                className={styles.image}
            />
        )
        : <NoInameIcon size="6x" />

    return (
        <div className={styles.catalogueImage} onClick={handleClick}>
            {props.catalogue.isSubmittingImage
                ? <Loader className={styles.loader} />
                : image
            }
            <input
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </div>
    )
}

export default CatalogueImage