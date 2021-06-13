import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './columns.scss'
import useSwipe from '@adrianbielawski/use-swipe'

export interface ColumnInterface {
    component: ReactNode,
    title: string,
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
        [current, props.onChange, setCurrent]
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

    const columnsOffset = useMemo(
        () => {
            let offset = - current

            if (!props.mobileView && count % 2 === 0) {
                offset += .5
            }

            if (swipe?.x) {
                offset = offset + (swipe.x / window.innerWidth)
            }

            return offset
        },
        [current, count, swipe, props.mobileView]
    )

    const columnsClass = cx(
        'columns',
        props.className,
    )

    const columnClass = cx(
        'column',
        props.columnClassName,
    )

    const COLUMNS = props.columns.map((column, i) => (
        <li
            className={columnClass}
            key={i}
        >
            <div
                className={styles.wrapper}
                style={props.mobileView ? {
                    transform: `translate3d(${i * 100}%, 0, 0)`
                }: undefined}
            >
                <div className={styles.columnContentWrapper}>
                    <p className={styles.header}>
                        {column.title}
                    </p>
                    {column.component}
                </div>
            </div>
        </li>
    ))

    return (
        <div className={styles.columnsWrapper}>
            <ul
                className={columnsClass}
                ref={count > 1 ? columnsRef : null}
                style={props.mobileView ? {
                    transform: `translate3d(${columnsOffset * 100}%, 0, 0)`
                }: undefined}
            >
                {COLUMNS}
            </ul>
        </div>
    )
}

export default Columns