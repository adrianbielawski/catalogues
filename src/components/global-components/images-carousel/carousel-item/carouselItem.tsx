import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './carouselItem.scss'
//Constants
import { BASE_URL } from 'src/constants'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Hoks
import { useImageLoader } from 'src/hooks/useImageLoader'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import PrimaryImageStar from '../primary-image-star/primaryImageStar'
import Loader from 'components/global-components/loader/loader'

type Props = {
    offset: string | null,
    scale: number,
    image: DeserializedImage,
    singleView?: boolean,
    useThumbnails?: boolean,
    showPrimaryStar?: boolean,
    withShadow?: boolean,
    onRemove?: () => void,
    onPrimaryChange?: () => void,
    onImageClick?: () => void,
}

const cx = classNames.bind(styles)

const CarouselItem = (props: Props) => {
    const url = props.image.id.toString().startsWith('newImage')
        ? props.image.image
        : props.useThumbnails
            ? `${BASE_URL}${props.image.imageThumbnail}`
            : `${BASE_URL}${props.image.image}`

    const image = useImageLoader(url)

    const onPrimaryChange = () => {
        if (props.onPrimaryChange !== undefined) {
            props.onPrimaryChange()
        }
    }

    const carouselItemClass = cx(
        'carouselItem',
        {
            singleView: props.singleView,
            withShadow: props.withShadow,
        }
    )

    const imageClass = cx(
        'img',
        {
            loaded: image,
        }
    )

    if (!props.offset) {
        return null
    }

    return (
        <div
            className={carouselItemClass}
            style={{
                '--offset': props.offset,
                '--scale': props.scale,
            } as React.CSSProperties}
        >
            {!image && <Loader className={styles.loader} />}
            <img
                className={imageClass}
                src={image || ''}
                onClick={props.onImageClick}
                key={props.image.id}
            />
            {props.onRemove &&
                <TransparentButton
                    className={styles.trashButton}
                    onClick={props.onRemove}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </TransparentButton>
            }
            {props.showPrimaryStar &&
                <PrimaryImageStar
                    className={styles.primaryImageStar}
                    solid={props.image.isPrimary}
                    onClick={onPrimaryChange}
                />
            }
        </div>
    )
}

export default CarouselItem