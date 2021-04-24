import React, { ReactNode, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './paginatedList.scss'
//Hooks
import { useElementInView } from 'src/hooks/useElementInView'
//Components
import Button from 'components/global-components/button/button'
import Loader from 'components/global-components/loader/loader'

type BasicProps = {
    children: ReactNode[],
    next: number | null,
    isFetching: boolean,
    className?: string,
    onLoadMore: () => void,
}

type PropsWithAutoFetch = {
    fetchOnButtonClick?: 'never',
    buttonChild?: never,
    intersectingElement: number,
} & BasicProps

type PropsWithFetchOnceOnClick = {
    fetchOnButtonClick?: 'once',
    buttonChild: ReactNode,
    intersectingElement: number,
} & BasicProps

type PropsWithFetchOnClick = {
    fetchOnButtonClick?: 'allways',
    buttonChild: ReactNode,
    intersectingElement?: never,
} & BasicProps

type Props = PropsWithAutoFetch | PropsWithFetchOnceOnClick | PropsWithFetchOnClick

const cx = classNames.bind(styles)

const PaginatedList = (props: Props) => {
    let fetchOnClick = false

    if ((props.fetchOnButtonClick === 'once' && props.next === 2)
        || props.fetchOnButtonClick === 'allways'
    ) {
        fetchOnClick = true
    }

    const handleIntersecting = useCallback(
        (isIntersecting: boolean) => {
            if (isIntersecting && props.next && !fetchOnClick && !props.isFetching) {
                props.onLoadMore()
            }
        },
        [fetchOnClick, props.next, props.isFetching, props.onLoadMore]
    )

    const intersectingElement = useElementInView(handleIntersecting)

    const handleButtonClick = () => {
        props.onLoadMore()
    }

    const getItems = () => props.children.map((child, i) => {
        const withRef = !fetchOnClick
            && props.next
            && i === props.children.length - props.intersectingElement! - 1

        const ref = (withRef)
            ? intersectingElement
            : null

        return (
            <li
                key={i}
                ref={ref}
            >
                {child}
            </li>
        )
    })

    const paginatedListClass = cx(
        'paginatedList',
        props.className,
    )

    return (
        <div className={paginatedListClass}>
            <ul>
                {getItems()}
            </ul>
            {props.isFetching &&
                <Loader className={styles.loader} />
            }
            {(fetchOnClick && !props.isFetching) &&
                <Button
                    className={styles.button}
                    onClick={handleButtonClick}
                >
                    {props.buttonChild}
                </Button>
            }
        </div>
    )
}

PaginatedList.defaultProps = {
    children: <></>,
    next: null,
    isFetching: false,
    fetchOnButtonClick: 'allways',
    buttonChild: undefined,
    intersectingElement: 1,
    className: undefined,
    onLoadMore: () => { },

}

export default PaginatedList