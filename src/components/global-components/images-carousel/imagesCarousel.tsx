import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './imagesCarousel.scss'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Custom components
import ArrowButton from './arrow-button/arrowButton'
import TransparentButton from '../transparent-button/transparentButton'

const BASE_URL = process.env.API_URL

type Props = {
    width: number,
    images: DeserializedImage[],
    className?: string,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
}

const cx = classNames.bind(styles)

const mod = (i: number, n: number): number => ((i % n) + n) % n

const ImagesCarousel = (props: Props) => {
    const count = props.images.length
    const screenWidth = window.innerWidth

    const carouselRef = useRef<HTMLDivElement>(null)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [slideX, setSlideX] = useState<number>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isPrimary === true))

    const MIN_SCALE = .7
    const MAX_SCALE = 1
    const IMAGE_SIZE = screenWidth > 800 ? (props.width) * .416 : props.width

    useEffect(() => {
        if (props.onChange !== undefined && props.images.length > 0) {
            props.onChange(mod(current, count))
        }
    }, [current])

    useEffect(() => {
        if (carouselRef.current !== null) {
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
        setTouchStart(e.touches[0].pageX)
    }

    const handleTouchMove = (e: TouchEvent) => {
        const newSlideX = (e.touches[0].pageX - touchStart!) / IMAGE_SIZE
        setSlideX(newSlideX)
    }

    const handleTouchEnd = () => {
        setTouchStart(null)
        setSlideX(0)
        setCurrent(current - Math.round(slideX))
    }

    const handlePreviousImage = () => {
        setCurrent(current - 1);
    }

    const handleNextImage = () => {
        setCurrent(current + 1);
    }

    const getDynamicStyles = (i: number) => {
        let newCurrent = current - parseInt(slideX.toString())
        const IMAGE_OFFSET = IMAGE_SIZE * 1.22

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
            : `${BASE_URL}${IMG.imageThumbnail}`

            items.push(
                <li key={i}>
                    <div
                        style={{
                            '--offset': dynamicStyles.offset,
                            '--scale': dynamicStyles.scale,
                            '--size': `${IMAGE_SIZE}px`,
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
    )

    const CSSConstants = {
        '--size': `${IMAGE_SIZE}px`,
        '--minScale': MIN_SCALE,
    } as React.CSSProperties

    return (
        <div
            className={carouselClass}
            ref={carouselRef}
            style={props.images.length ? CSSConstants : undefined}
        >
            {count > 0 ? (
                <>
                    <ArrowButton
                        className={styles.prev}
                        leftArrow={true}
                        onClick={handlePreviousImage}
                    />
                    <ul>
                        {getItems()}
                    </ul>
                    <ArrowButton
                        className={styles.next}
                        leftArrow={false}
                        onClick={handleNextImage}
                    />
                </>
            )
                : <p className={styles.noContent}>No images yet</p>
            }
        </div>
    )
}

export default ImagesCarousel