import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './paginatedList.scss'
//Hooks
import { useElementInView } from 'src/hooks/useElementInView'
//Components
import Button from 'components/global-components/button/button'
import Loader from 'components/global-components/loader/loader'

type PropsWithAutoFetch = {
    children: ReactNode[],
    next: number | null,
    fetchOnButtonClick?: false,
    buttonChild?: never,
    isFetching: boolean,
    intersectingElement: number,
    className?: string,
    onLoadMore: () => void,
}

type PropsWithFetchOnceOnClick = {
    children: ReactNode[],
    next: number | null,
    fetchOnButtonClick: 'once',
    buttonChild: ReactNode,
    isFetching: boolean,
    intersectingElement: number,
    className?: string,
    onLoadMore: () => void,
}

type PropsWithFetchOnClick = {
    children: ReactNode[],
    next: number | null,
    fetchOnButtonClick: true,
    buttonChild: ReactNode,
    isFetching: boolean,
    intersectingElement?: never,
    className?: string,
    onLoadMore: () => void,
}

type Props = PropsWithAutoFetch | PropsWithFetchOnceOnClick | PropsWithFetchOnClick

const cx = classNames.bind(styles)

const PaginatedList = (props: Props) => {
    let fetchOnClick = false

    if ((props.fetchOnButtonClick === 'once' && props.next === 2)
        || props.fetchOnButtonClick === true
    ) {
        fetchOnClick = true
    }
    
    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && props.next && !fetchOnClick) {
            props.onLoadMore()
        }
    }

    const intersectingElement = useElementInView(handleIntersecting)

    const handleButtonClick = () => {
        props.onLoadMore()
    }

    const getItems = () => props.children.map((child, i) => {
        const ref = (!fetchOnClick && i === props.children.length - props.intersectingElement! - 1)
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

export default PaginatedList