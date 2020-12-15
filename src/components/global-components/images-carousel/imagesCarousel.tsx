import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './imagesCarousel.scss'
//Custom components
import HorizontalArrowButton from '../horizontal-arrow-button/horizontalArrowButton'
import TrashButton from '../trash-button/trashButton'

type Image = {
    url: string,
    isMain: boolean,
}

type Props = {
    width: number,
    images: Image[],
    className?: string,
    onRemove?: (i: number) => void,
    onChange?: (i: number) => void,
}

type TouchStart = number | null
type SlideX = number

type Mod = (i: number, n: number) => number

const cx = classNames.bind(styles)

const mod: Mod = (i, n) => ((i % n) + n) % n

const ImagesCarousel = (props: Props) => {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [touchStart, setTouchStart] = useState<TouchStart>(null)
    const [slideX, setSlideX] = useState<SlideX>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isMain === true))
    const screenWidth = window.innerWidth

    const count = props.images.length
    const MIN_SCALE = .7
    const MAX_SCALE = 1
    const IMAGE_SIZE = screenWidth > 600 ? (props.width) * .416 : props.width

    useEffect(() => {
        if (props.onChange !== undefined) {
            props.onChange(current)
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
            const onTrashClick = () => {
                if (props.onRemove === undefined) {
                    return
                }
                props.onRemove(mod(i, count))
            }
            const dynamicStyles = getDynamicStyles(i)
            items.push(
                <li key={i}>
                    <div
                        style={{
                            '--offset': dynamicStyles.offset,
                            '--scale': dynamicStyles.scale,
                            '--size': `${IMAGE_SIZE}px`,
                        } as React.CSSProperties}
                    >
                        <img src={props.images[mod(i, count)].url} />
                        {props.onRemove &&
                            <TrashButton
                            className={styles.trashButton}
                            onClick={onTrashClick} />
                        }
                    </div>
                </li>
            )
        }
        return items
    }

    const handlePreviousImage = () => {
        setCurrent(current - 1);
    };
    const handleNextImage = () => {
        setCurrent(current + 1);
    }
    const carouselClass = cx(
        'carousel',
        props.className,
    )

    return (
        <div
            className={carouselClass}
            ref={carouselRef}
            style={{
                '--size': `${IMAGE_SIZE}px`,
                '--minScale': MIN_SCALE,
            } as React.CSSProperties}
        >
            <HorizontalArrowButton
                className={styles.prev}
                leftArrow={true}
                disabled={props.images.length <= 1}
                onClick={handlePreviousImage}
            />
            <ul>
                {getItems()}
            </ul>
            <HorizontalArrowButton
                className={styles.next}
                leftArrow={false}
                disabled={props.images.length <= 1}
                onClick={handleNextImage}
            />
        </div>
    )
}

export default ImagesCarousel