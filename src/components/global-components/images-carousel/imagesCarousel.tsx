import React, { useState, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useResizeDetector } from 'react-resize-detector';
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './imagesCarousel.scss'
//Hooks and utils
import { mod } from 'src/utils'
import { useSwipe } from 'src/hooks/useSwipe'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Custom components
import ArrowButton from './arrow-button/arrowButton'
import TransparentButton from '../transparent-button/transparentButton'
import ImagesCounter from './images-counter/imagesCounter'
import PrimaryImageStar from './primary-image-star/primaryImageStar'
import NoInameIcon from '../no-image-icon/noImageIcon'

const BASE_URL = process.env.API_URL

type Props = {
    images: DeserializedImage[],
    singleView?: boolean,
    useThumbnails?: boolean,
    withShadow?: boolean,
    showCounter?: boolean,
    showPrimaryStar?: true,
    className?: string,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
    onPrimaryChange?: (i: number) => void,
    onImageClick?: () => void,
}

const cx = classNames.bind(styles)

const ImagesCarousel = (props: Props) => {
    const count = props.images.length

    const MIN_SCALE = .7
    const MAX_SCALE = 1

    const [swipeX, setSwipeX] = useState<number>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isPrimary === true))
    const currentRef = useRef<HTMLLIElement>(null)
    const { width } = useResizeDetector({ targetRef: currentRef })

    const changeCurrent = useCallback(
        (diff: number) => {
            if (props.onChange && count > 0) {
                props.onChange(mod(current + diff, count))
            }

            setCurrent(current + diff)
        },
        [current, count, props.onChange]
    )

    const handleSwipe = useCallback(
        (x: number, y: number) => {
            if (Math.abs(x) < Math.abs(y)) {
                return
            }

            setSwipeX(x / width!)
        },
        [width]
    )

    const handleSwipeEnd = useCallback(
        (x: number, y: number, isQuick: boolean) => {
            let diff = 0
            if (isQuick) {
                if (x > 50) {
                    diff = -1
                }
                if (x < -50) {
                    diff = 1
                }
            } else {
                diff = -Math.round(x / width!)
            }

            setSwipeX(0)
            changeCurrent(diff)
        },
        [current, count, width, changeCurrent]
    )

    const carouselRef = useSwipe(handleSwipe, handleSwipeEnd)

    const handlePreviousImage = () => {
        changeCurrent(-1)
    }

    const handleNextImage = () => {
        changeCurrent(1)
    }

    const getDynamicStyles = (i: number) => {
        const offset = width! * 1.3

        let styles = {
            scale: i === current ? MAX_SCALE : MIN_SCALE,
            offset: `${offset * (i - current)}px`,
        }

        if (swipeX) {
            const scaleValue = Math.abs(swipeX % 1 * .3)

            let scale = i === current
                ? clamp(
                    MAX_SCALE - scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
                : MIN_SCALE

            if (swipeX < 0 && i === current + 1 || swipeX > 0 && i === current - 1) {
                scale = clamp(
                    MIN_SCALE + scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
            }

            styles = {
                scale,
                offset: `${offset * (i - current) + swipeX * offset}px`,
            }
        }

        return styles
    }

    const getItems = () => {
        let items = []

        for (let i = current - 3; i <= current + 3; i++) {
            const onRemove = () => {
                if (props.onRemove !== undefined) {
                    props.onRemove(mod(i, count))
                }
            }

            const onPrimaryImageChange = () => {
                if (props.onPrimaryChange !== undefined && count > 0) {
                    props.onPrimaryChange(mod(i, count))
                }
            }

            const dynamicStyles = getDynamicStyles(i)

            const img = props.images[mod(i, count)]
            const url = img.id.toString().startsWith('newImage')
                ? img.image
                : props.useThumbnails
                    ? `${BASE_URL}${img.imageThumbnail}`
                    : `${BASE_URL}${img.image}`

            const imgRef = current ? currentRef : null

            items.push(
                <li key={i} ref={imgRef}>
                    <div
                        style={{
                            '--offset': dynamicStyles.offset,
                            '--scale': dynamicStyles.scale,
                        } as React.CSSProperties}
                    >
                        <img
                            src={url}
                            onClick={props.onImageClick}
                        />
                        {props.onRemove &&
                            <TransparentButton
                                className={styles.trashButton}
                                onClick={onRemove}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </TransparentButton>
                        }
                        {props.showPrimaryStar &&
                            <PrimaryImageStar
                                className={styles.primaryImageStar}
                                solid={img.isPrimary}
                                onClick={onPrimaryImageChange}
                            />
                        }
                    </div>
                </li>
            )
        }
        return items
    }

    const carouselClass = cx(
        'carousel',
        props.className,
        {
            singleView: props.singleView,
            withShadow: props.withShadow,
        }
    )

    return (
        <div
            className={carouselClass}
            ref={carouselRef}
        >
            {count > 0
                ? (
                    <>
                        {count >= 2 && (
                            <ArrowButton
                                className={styles.prev}
                                leftArrow={true}
                                onClick={handlePreviousImage}
                            />
                        )}
                        <ul>
                            {getItems()}
                        </ul>
                        {count >= 2 && (
                            <ArrowButton
                                className={styles.next}
                                leftArrow={false}
                                onClick={handleNextImage}
                            />
                        )}
                        {props.showCounter && (
                            <ImagesCounter current={mod(current, count) + 1} total={count} />
                        )}
                    </>
                )
                : <NoInameIcon size="6x" />
            }
        </div>
    )
}

export default ImagesCarousel