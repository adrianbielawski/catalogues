import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import classNames from 'classnames/bind'
import { clamp } from 'lodash'
import styles from './carousel.scss'
//Hooks and utils
import { mod } from 'src/utils'
import { useSwipe } from '@adrianbielawski/use-swipe'
import { usePrevious } from 'src/hooks/usePrevious'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Custom components
import ArrowButton from '../arrow-button/arrowButton'
import ImagesCounter from '../images-counter/imagesCounter'
import CarouselItem from '../carousel-item/carouselItem'

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

const cx = classNames.bind(styles)

const Carousel = (props: Props) => {
    const count = props.images.length

    const MIN_SCALE = .7
    const MAX_SCALE = 1

    const [swipeX, setSwipeX] = useState<number>(0)
    const [current, setCurrent] = useState(props.images.findIndex(img => img.isPrimary === true))
    const currentRef = useRef<HTMLLIElement>(null)
    const [width, setWidth] = useState(0)
    const onResize = useCallback(width => setWidth(width), [])
    useResizeDetector({ targetRef: currentRef, refreshMode: 'debounce', refreshRate: 0, onResize })
    const prevIds = usePrevious(props.images.map(i => i.id))

    useEffect(() => {
        if (prevIds && props.images.length > prevIds.length) {
            const newImage = props.images.filter(image => !prevIds?.includes(image.id))[0]
            const newImageIndex = props.images.findIndex(i => i.id === newImage.id)
            setCurrent(newImageIndex)
        }
    }, [props.images, prevIds])

    const changeCurrent = useCallback(
        (diff: number) => {
            if (props.onChange) {
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

            setSwipeX(x / width)
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
                diff = -Math.round(x / width)
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
        const offset = width * 1.3

        let styles = {
            scale: i === current ? MAX_SCALE : MIN_SCALE,
            offset: offset ? `${offset * (i - current)}px` : null,
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

            const onPrimaryChange = () => {
                if (props.onPrimaryChange !== undefined) {
                    props.onPrimaryChange(mod(i, count))
                }
            }

            const dynamicStyles = getDynamicStyles(i)

            const img = props.images[mod(i, count)]

            const imgRef = current === i ? currentRef : null

            items.push(
                <li key={i} ref={imgRef}>
                    <CarouselItem
                        offset={dynamicStyles.offset}
                        scale={dynamicStyles.scale}
                        image={img}
                        singleView={props.singleView}
                        showPrimaryStar={props.showPrimaryStar}
                        withShadow={props.withShadow}
                        useThumbnails={props.useThumbnails}
                        onRemove={props.onRemove ? onRemove : undefined}
                        onPrimaryChange={onPrimaryChange}
                        onImageClick={props.onImageClick}
                    />
                </li>
            )
        }
        return items
    }

    const carouselClass = cx(
        'carousel',
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
            {props.showCounter && (
                <ImagesCounter current={mod(current, count) + 1} total={count} />
            )}
        </div>
    )
}

export default Carousel