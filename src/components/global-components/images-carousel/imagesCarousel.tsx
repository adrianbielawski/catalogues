import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './imagesCarousel.scss'
//Hooks and utils
import { useFirstRender } from 'src/hooks/useFirstRender'
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
    width: number,
    height?: number,
    singleView?: boolean,
    fullSizeImages?: boolean,
    background?: string,
    showCounter?: boolean,
    primaryImageStar?: true,
    className?: string,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
    onPrimaryChange?: (i: number) => void,
    onFullScreenView?: () => void,
}

const cx = classNames.bind(styles)

const ImagesCarousel = (props: Props) => {
    const count = props.images.length
    const screenWidth = window.innerWidth
    
    const [swipeX, setSwipeX] = useState<number>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isPrimary === true))
    const firstRender = useFirstRender()

    const MIN_SCALE = .7
    const MAX_SCALE = 1
    const IMAGE_HEIGHT = props.height
    let IMAGE_WIDTH = props.width
    if (!props.singleView && screenWidth > 800) {
        IMAGE_WIDTH = (props.width) * .416
    }

    const changeCurrent = useCallback(
        (diff: number) => {
            if (props.onChange && count > 0) {
                props.onChange(mod(current + diff, count))
            }

            setCurrent(current + diff)
        },
        [current, props.onChange]
    )

    const handleSwipe = useCallback(
        (x: number, y: number) => {
            if (Math.abs(x) < Math.abs(y)) {
                return
            }

            setSwipeX(x / IMAGE_WIDTH)
        },
        [IMAGE_WIDTH]
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
                diff = -Math.round(x / IMAGE_WIDTH)
            }
            
            setSwipeX(0)
            changeCurrent(diff)
        },
        [current, IMAGE_WIDTH]
    )

    const columnsRef = useSwipe(handleSwipe, handleSwipeEnd)

    const handlePreviousImage = () => {
        changeCurrent(-1)
    }

    const handleNextImage = () => {
        changeCurrent(1)
    }

    const getDynamicStyles = (i: number) => {
        let newCurrent = current - parseInt(swipeX.toString())
        const IMAGE_OFFSET = IMAGE_WIDTH * 1.22

        let styles = {
            scale: i === current ? MAX_SCALE : MIN_SCALE,
            offset: `${IMAGE_OFFSET * (i - current)}px`,
        }

        if (swipeX) {
            const scaleValue = Math.abs(swipeX % 1 * .3)

            let scale = i === newCurrent
                ? clamp(
                    MAX_SCALE - scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
                : MIN_SCALE

            if (swipeX < 0 && i === newCurrent + 1 || swipeX > 0 && i === newCurrent - 1) {
                scale = clamp(
                    MIN_SCALE + scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
            }

            styles = {
                scale,
                offset: `${IMAGE_OFFSET * (i - current) + swipeX * IMAGE_OFFSET}px`,
            }
        }

        return styles
    }

    const handleFullImageViev = () => {
        if (props.onFullScreenView === undefined) {
            return
        }
        props.onFullScreenView()
    }

    const getItems = () => {
        let items = []

        for (let i = current - 3; i <= current + 3; i++) {
            const onRemove = () => {
                if (props.onRemove === undefined) {
                    return
                }
                props.onRemove(mod(i, count))
            }

            const onPrimaryImageChange = () => {
                if (props.onPrimaryChange !== undefined && count > 0 && !firstRender) {
                    props.onPrimaryChange(mod(i, count))
                }
            }

            const dynamicStyles = getDynamicStyles(i)

            const IMG = props.images[mod(i, count)]
            const IMAGE_URL = IMG.id.toString().startsWith('newImage')
                ? IMG.image
                : !props.fullSizeImages
                    ? `${BASE_URL}${IMG.imageThumbnail}`
                    : `${BASE_URL}${IMG.image}`


            const imgClass = cx(
                {
                    imgHover: props.onFullScreenView !== undefined,
                }
            )
            items.push(
                <li key={i}>
                    <div
                        style={{
                            '--offset': dynamicStyles.offset,
                            '--scale': dynamicStyles.scale,
                            '--width': `${IMAGE_WIDTH}px`,
                            '--height': `${IMAGE_HEIGHT}px`,
                        } as React.CSSProperties}
                    >
                        <img src={IMAGE_URL} className={imgClass} onClick={handleFullImageViev} />
                        {props.onRemove &&
                            <TransparentButton
                                className={styles.trashButton}
                                onClick={onRemove}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </TransparentButton>
                        }
                        {props.primaryImageStar &&
                            <PrimaryImageStar
                                className={styles.primaryImageStar}
                                solid={IMG.isPrimary}
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
            whiteBackground: props.background === 'white',
            greyBackground: props.background === 'grey'
        }
    )

    const CSSConstants = {
        '--width': `${IMAGE_WIDTH}px`,
        '--height': `${IMAGE_HEIGHT}px`,
        '--minScale': MIN_SCALE,
        '--scaledImagesQty': !props.singleView && count >= 3 ? 2 : 0,
    } as React.CSSProperties

    const displayButtons = count >= 2

    return (
        <div
            className={carouselClass}
            ref={columnsRef}
            style={count ? CSSConstants : undefined}
        >
            {count > 0
                ? (
                    <>
                        {displayButtons && (
                            <ArrowButton
                                className={styles.prev}
                                leftArrow={true}
                                onClick={handlePreviousImage}
                            />
                        )}
                        <ul>
                            {getItems()}
                        </ul>
                        {displayButtons && (
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