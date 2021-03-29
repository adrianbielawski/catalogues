import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './componentHeader.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'

type Props = {
    children: ReactNode,
    className?: string,
}

const cx = classNames.bind(styles)

const ComponentHeader = (props: Props) => {
    const smallViewport = useTypedSelector(state => state.app.screenWidth.smallViewport)
    const [yOffset, setYOffset] = useState(0)
    const [scrolledUp, setScrolledUp] = useState(true)
    const [touchStart, setTouchStart] = useState(0)

    useEffect(() => {
        if (smallViewport) {
            window.addEventListener('scroll', handleScroll)
        }
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [yOffset, scrolledUp])

    useEffect(() => {
        if (smallViewport && !scrolledUp) {
            window.addEventListener('touchstart', handleTouchStart)
        }
        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
        }
    }, [scrolledUp])

    const handleTouchStart = () => {
        setTouchStart(window.pageYOffset)
    }

    const handleScroll = () => {
        const offset = window.pageYOffset
        let up = scrolledUp

        if (offset >= yOffset) {
            up = false
        }
        if (offset < yOffset && touchStart - 30 > offset) {
            up = true
        }

        setYOffset(offset)
        setScrolledUp(up)
    }

    const headerClass = cx(
        'componentHeader',
        props.className,
        {
            hideable: smallViewport,
            show: smallViewport && scrolledUp,
        }
    )

    return (
        <div className={headerClass}>
            {props.children}
        </div>
    )
}

export default ComponentHeader