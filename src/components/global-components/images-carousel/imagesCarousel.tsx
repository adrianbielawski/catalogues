import React from 'react'
import styles from './imagesCarousel.scss'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Components
import CarouselItem from './carousel-item/carouselItem';
import Carousel from './carousel/carousel';
import NoImageIcon from '../no-image-icon/noImageIcon';

type Props = {
    images: DeserializedImage[],
    singleView?: boolean,
    useThumbnails?: boolean,
    withShadow?: boolean,
    showCounter?: boolean,
    showPrimaryStar?: true,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
    onPrimaryChange?: (i: number) => void,
    onImageClick?: () => void,
}

const ImagesCarousel = (props: Props) => {
    const count = props.images.length

    const onRemove = () => {
        if (props.onRemove !== undefined) {
            props.onRemove(0)
        }
    }

    if (!count) {
        return <NoImageIcon className={styles.noImageIcon} size="6x"/>
    }

    if (count === 1) {
        return (
            <CarouselItem
                offset={'0px'}
                scale={1}
                image={props.images[0]}
                showPrimaryStar={props.showPrimaryStar}
                singleView={props.singleView}
                withShadow={props.withShadow}
                useThumbnails={props.useThumbnails}
                onRemove={props.onRemove ? onRemove : undefined}
                onImageClick={props.onImageClick}
            />
        )
    }

    return (
        <Carousel
            images={props.images}
            useThumbnails={props.useThumbnails}
            singleView={props.singleView}
            withShadow={props.withShadow}
            showPrimaryStar={props.showPrimaryStar}
            showCounter={props.showCounter}
            onRemove={props.onRemove}
            onChange={props.onChange}
            onPrimaryChange={props.onPrimaryChange}
            onImageClick={props.onImageClick}
        />
    )
}

export default ImagesCarousel