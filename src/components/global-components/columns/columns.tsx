import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './columns.scss'
import { useSwipe } from 'src/hooks/useSwipe'

export interface ColumnInterface {
    component: ReactNode,
}

interface Coords {
    x: number,
    y: number,
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
    const [current, setCurrent] = useState(props.current || 0)
    const [swipe, setSwipe] = useState<Coords | null>(null)

    useEffect(() => {
        if (props.current !== undefined) {
            setCurrent(props.current)
        }
    }, [props.current])

    useEffect(() => {
        if (!props.mobileView) {
            const diff = Math.floor(count / 2)
            changeCurrent(diff)
        }
    }, [props.mobileView])

    const validateSwipe = useCallback(
        (x: number, y: number) => {
            if ((current === count - 1 && x < 0)
                || (current === 0 && x > 0)
                || (Math.abs(x) < Math.abs(y))
            ) {
                return false
            }
            return true
        },
        [current, count]
    )

    const handleSwipe = useCallback(
        (x: number, y: number) => {
            const isValid = validateSwipe(x, y)

            if (!isValid) {
                return
            }
            setSwipe({ x, y })
        },
        [validateSwipe, setSwipe]
    )

    const changeCurrent = useCallback(
        diff => {
            setCurrent(current + diff)

            if (props.onChange) {
                props.onChange(current + diff)
            }
        },
        [current, props.onChange]
    )

    const handleSwipeEnd = useCallback(
        (x: number, y: number, isQuick: boolean) => {
            const isValid = validateSwipe(x, y)

            if (!isValid) {
                setSwipe(null)
                return
            }

            let diff

            if (isQuick) {
                if (x > 50) {
                    diff = -1
                }
                if (x < -50) {
                    diff = 1
                }
            } else {
                diff = -Math.round(x / window.innerWidth)
            }

            setSwipe(null)

            changeCurrent(diff)
        },
        [validateSwipe, setSwipe, changeCurrent]
    )

    let columnsRef = useSwipe(handleSwipe, handleSwipeEnd)

    const getOffset = (i: number) => {
        let offset = i - current

        if (!props.mobileView && count % 2 === 0) {
            offset += .5
        }

        if (swipe?.x) {
            offset = offset + (swipe.x / window.innerWidth)
        }
        return offset
    }

    const wrapperClass = cx(
        'wrapper',
        props.columnClassName,
    )

    const columnsClass = cx(
        'columns',
        props.className,
    )

    const COLUMNS = props.columns.map((column, i) => (
        <li
            className={styles.column}
            key={i}
        >
            <div className={wrapperClass}
            style={{
                '--offset': `${getOffset(i)}`,
            } as React.CSSProperties}>
                {column.component}
            </div>
        </li>
    ))

    return (
        <ul
            className={columnsClass}
            ref={count > 1 ? columnsRef : null}
        >
            {COLUMNS}
        </ul>
    )
}

export default Columns