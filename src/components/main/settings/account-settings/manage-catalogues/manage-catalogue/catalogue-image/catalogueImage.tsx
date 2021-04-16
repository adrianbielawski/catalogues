import React, { useRef } from 'react'
import styles from './catalogueImage.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { POST_CATALOGUE_IMAGE } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueSelector } from 'store/selectors'
//Components
import Loader from 'components/global-components/loader/loader'
import NoImageIcon from 'components/global-components/no-image-icon/noImageIcon'

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
    const catalogueData = useTypedSelector(authUserCatalogueSelector(props.catalogue.id))
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
        : <NoImageIcon size="6x" />

    return (
        <div className={styles.catalogueImage} onClick={handleClick}>
            {catalogueData.isSubmittingImage
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