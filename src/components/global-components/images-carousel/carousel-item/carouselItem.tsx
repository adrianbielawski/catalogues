import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './carouselItem.scss'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import PrimaryImageStar from '../primary-image-star/primaryImageStar'

const BASE_URL = process.env.API_URL

type Props = {
    offset: string,
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
    const onPrimaryChange = () => {
        if (props.onPrimaryChange !== undefined) {
            props.onPrimaryChange()
        }
    }

    const url = props.image.id.toString().startsWith('newImage')
        ? props.image.image
        : props.useThumbnails
            ? `${BASE_URL}${props.image.imageThumbnail}`
            : `${BASE_URL}${props.image.image}`


    const carouselItemClass = cx(
        'carouselItem',
        {
            singleView: props.singleView,
            withShadow: props.withShadow,
        }
    )

    return (
        <div
            className={carouselItemClass}
            style={{
                '--offset': props.offset,
                '--scale': props.scale,
            } as React.CSSProperties}
        >
            <img
                src={url}
                onClick={props.onImageClick}
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