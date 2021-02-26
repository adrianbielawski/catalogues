import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './imagesCarousel.scss'
//Custom hooks and utils
import { useFirstRender } from 'src/customHooks'
import { mod } from 'src/utils'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Custom components
import ArrowButton from './arrow-button/arrowButton'
import TransparentButton from '../transparent-button/transparentButton'
import ImagesCounter from './images-counter/imagesCounter'

const BASE_URL = process.env.API_URL

type Props = {
    images: DeserializedImage[],
    width: number,
    height?: number,
    singleView?: boolean,
    fullSizeImages?: boolean,
    background?: string,
    showCounter?: boolean,
    className?: string,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
    onFullScreenView?: () => void,
}

const cx = classNames.bind(styles)

interface TouchStart { x: number, y: number }

const ImagesCarousel = (props: Props) => {
    const count = props.images.length
    const screenWidth = window.innerWidth

    const carouselRef = useRef<HTMLDivElement>(null)
    const [touchStart, setTouchStart] = useState<TouchStart | null>(null)
    const [touchStartTime, setTouchStartTime] = useState<number | null>(null)
    const [slideX, setSlideX] = useState<number>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isPrimary === true))
    const firstRender = useFirstRender()

    const MIN_SCALE = .7
    const MAX_SCALE = 1
    const IMAGE_HEIGHT = props.height
    let IMAGE_WIDTH = props.width
    if (!props.singleView && screenWidth > 800) {
        IMAGE_WIDTH = (props.width) * .416
    }

    useEffect(() => {
        if (props.onChange !== undefined && count > 0 && !firstRender) {
            props.onChange(mod(current, count))
        }
    }, [current])

    useEffect(() => {
        if (carouselRef.current !== null && count > 1) {
            carouselRef.current.addEventListener('touchstart', handleTouchStart)
        }

        return () => {
            if (carouselRef.current !== null) {
                carouselRef.current.removeEventListener('touchstart', handleTouchStart)
            }
        }
    }, [touchStart])

    useEffect(() => {
        if (carouselRef.current !== null && touchStart !== null) {
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleTouchEnd)
        } else if (carouselRef.current !== null && touchStart === null) {
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
        }

        return () => {
            if (carouselRef.current !== null) {
                document.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [touchStart, slideX, current, count])

    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
        setTouchStartTime(Date.now())
    }

    const handleTouchMove = (e: TouchEvent) => {
        const slideX = e.touches[0].clientX - touchStart!.x
        const slideY = e.touches[0].clientY - touchStart!.y
        if (Math.abs(slideY) > Math.abs(slideX)) {
            return
        }
        const newSlideX = (slideX) / IMAGE_WIDTH
        setSlideX(newSlideX)
    }

    const handleTouchEnd = (e: TouchEvent) => {
        let newCurrent = current
        if (Date.now() < touchStartTime! + 300) {
            const slideX = e.changedTouches[0].clientX - touchStart!.x
            if (slideX > 50) {
                newCurrent-= 1
            }
            if (slideX < -50) {
                newCurrent+= 1
            }
        } else {
            newCurrent-= Math.round(slideX)
        }
        setTouchStart(null)
        setSlideX(0)
        setCurrent(newCurrent)
        setTouchStartTime(null)
    }

    const handlePreviousImage = () => {
        setCurrent(current - 1)
    }

    const handleNextImage = () => {
        setCurrent(current + 1)
    }

    const getDynamicStyles = (i: number) => {
        let newCurrent = current - parseInt(slideX.toString())
        const IMAGE_OFFSET = IMAGE_WIDTH * 1.22

        let styles = {
            scale: i === current ? MAX_SCALE : MIN_SCALE,
            offset: `${IMAGE_OFFSET * (i - current)}px`,
        }

        if (touchStart !== null) {
            const scaleValue = Math.abs(slideX % 1 * .3)

            let scale = i === newCurrent
                ? clamp(
                    MAX_SCALE - scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
                : MIN_SCALE

            if (slideX < 0 && i === newCurrent + 1 || slideX > 0 && i === newCurrent - 1) {
                scale = clamp(
                    MIN_SCALE + scaleValue,
                    MIN_SCALE,
                    MAX_SCALE
                )
            }

            styles = {
                scale,
                offset: `${IMAGE_OFFSET * (i - current) + slideX * IMAGE_OFFSET}px`,
            }
        }

        return styles
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

            const dynamicStyles = getDynamicStyles(i)

            const IMG = props.images[mod(i, count)]
            const IMAGE_URL = IMG.id.toString().startsWith('newImage')
                ? IMG.image
                : !props.fullSizeImages ? `${BASE_URL}${IMG.imageThumbnail}`
                    : `${BASE_URL}${IMG.image}`

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
                        <img src={IMAGE_URL} />
                        {props.onRemove &&
                            <TransparentButton
                                className={styles.trashButton}
                                onClick={onRemove}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </TransparentButton>
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
            ref={carouselRef}
            style={count ? CSSConstants : undefined}
        >
            {count > 0 ? (
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
                : <p className={styles.noContent}>No images yet</p>
            }
            {props.onFullScreenView &&
                <TransparentButton
                    className={styles.fullScreenButton}
                    onClick={props.onFullScreenView}
                >
                    <FontAwesomeIcon icon={faExpand} />
                </TransparentButton>
            }
        </div>
    )
}

export default ImagesCarousel