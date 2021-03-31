import React, { ReactNode, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './columns.scss'

export interface ColumnInterface {
    component: ReactNode,
}

interface Coords {
    x: number,
    y: number,
}

interface Slide {
    start: {
        time: number | null,
    } & Coords | null,
    length: Coords | null,
}

type Props = {
    columns: ColumnInterface[],
    mobileView: boolean,
    current?: number,
    className?: string,
    columnClassName?: string,
    onChange?: (i: number) => void,
}

const cx = classNames.bind(styles)

const Columns = (props: Props) => {
    const count = props.columns.length
    const columnsRef = useRef<HTMLUListElement>(null)
    const [current, setCurrent] = useState(props.current || 0)
    const [slide, setSlide] = useState<Slide>({ start: null, length: null })

    useEffect(() => {
        if (props.current !== undefined) {
            setCurrent(props.current)
        }
    }, [props.current])

    useEffect(() => {
        if (!props.mobileView) {
            const newCurrent = Math.floor(count / 2)

            setCurrent(newCurrent)
            
            if (props.onChange) {
                props.onChange(newCurrent)
            }
        }
    }, [props.mobileView])

    useEffect(() => {
        if (columnsRef.current !== null && count > 1) {
            columnsRef.current.addEventListener('touchstart', handleTouchStart)
        }

        return () => {
            if (columnsRef.current !== null) {
                columnsRef.current.removeEventListener('touchstart', handleTouchStart)
            }
        }
    }, [slide, count])

    useEffect(() => {
        if (columnsRef.current !== null && slide.start?.x !== null) {
            columnsRef.current.addEventListener('touchmove', handleTouchMove)
            columnsRef.current.addEventListener('touchend', handleTouchEnd)
        }

        return () => {
            if (columnsRef.current !== null) {
                columnsRef.current.removeEventListener('touchmove', handleTouchMove)
                columnsRef.current.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [slide, current, count])

    const handleTouchStart = (e: TouchEvent) => {
        setSlide({
            ...slide,
            start: {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now(),
            },
        })
    }

    const handleTouchMove = (e: TouchEvent) => {
        const slideX = e.touches[0].clientX - slide.start!.x
        const slideY = e.touches[0].clientY - slide.start!.y

        if ((current === count - 1 && slideX < 0)
            || (current === 0 && slideX > 0)
            || (Math.abs(slideX) < Math.abs(slideY))
        ) {
            return
        }

        setSlide({
            ...slide,
            length: {
                x: slideX,
                y: slideY,
            },
        })
    }

    const handleTouchEnd = () => {
        if (!slide.length
            || (current === count - 1 && !slide.length)
            || (current === 0 && !slide.length)) {
            return
        }

        let newCurrent = current

        if (Date.now() < slide.start!.time! + 300) {
            if (slide.length!.x > 50) {
                newCurrent -= 1
            }
            if (slide.length!.x < -50) {
                newCurrent += 1
            }
        } else {
            newCurrent -= Math.round(slide.length!.x / window.innerWidth)
        }

        setSlide({
            start: null,
            length: null,
        })

        if (props.onChange) {
            props.onChange(newCurrent)
        }

        setCurrent(newCurrent)
    }

    const getOffset = (i: number) => {
        let offset = i - current

        if ((!props.mobileView)
            && count % 2 === 0
        ) {
            offset += .5
        }

        if (slide.start?.x && slide.length) {
            offset = offset + ((slide.length.x) / window.innerWidth)
        }
        return offset
    }

    const wrapperClass = cx(
        'wrapper',
        props.columnClassName,
    )

    const COLUMNS = props.columns.map((column, i) => (
        <li
            className={styles.column}
            key={i}
            style={{
                '--count': `${count}`,
                '--offset': `${getOffset(i)}`,
            } as React.CSSProperties}
        >
            <div className={wrapperClass}>
                {column.component}
            </div>
        </li>
    ))

    const columnsClass = cx(
        'columns',
        props.className,
    )

    return (
        <ul
            className={columnsClass}
            ref={columnsRef}
            style={{
                '--count': `${props.columns.length}`,
            } as React.CSSProperties}
        >
            {COLUMNS}
        </ul>
    )
}

export default Columns