import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './componentHeader.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'

interface ScrollData {
    scrollUpStartOffset: number | null,
    scrollDownStartOffset: number | null,
    offset: number,
}

const initialScrollData = {
    scrollUpStartOffset: null,
    scrollDownStartOffset: null,
    offset: 0,
}

type Props = {
    children: ReactNode,
    className?: string,
}

const cx = classNames.bind(styles)

const ComponentHeader = (props: Props) => {
    const MIN_SCROLL_VAL = 50
    const largeViewport = useTypedSelector(state => state.modules.app.screenWidth.largeViewport)
    const [show, setShow] = useState(true)
    const [scrollData, setScrollData] = useState<ScrollData>(initialScrollData)

    useEffect(() => {
        if (!largeViewport) {
            window.addEventListener('scroll', handleScroll)
        }
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [largeViewport, scrollData, show])

    const handleScroll = useCallback(() => {
        const offset = window.pageYOffset

        if (offset > scrollData.offset) {
            handleScrollDown(offset)
        }

        if (offset < scrollData.offset) {
            handleScrollUp(offset)
        }
    }, [scrollData, show])

    const handleScrollDown = (offset: number) => {
        let newShow = show
        let upStart = scrollData.scrollUpStartOffset
        let downStart = scrollData.scrollDownStartOffset

        if (!scrollData.scrollDownStartOffset) {
            upStart = null
            downStart = offset
        } else {
            if (offset > scrollData.scrollDownStartOffset + MIN_SCROLL_VAL) {
                newShow = false
            } else {
                newShow = show
            }
        }

        setScrollData({
            scrollUpStartOffset: upStart,
            scrollDownStartOffset: downStart,
            offset: offset,
        })
        setShow(newShow)
    }

    const handleScrollUp = (offset: number) => {
        let newShow = show
        let upStart = scrollData.scrollUpStartOffset
        let downStart = scrollData.scrollDownStartOffset

        if (!scrollData.scrollUpStartOffset) {
            upStart = offset
            downStart = null
        } else {
            if (offset < scrollData.scrollUpStartOffset - MIN_SCROLL_VAL) {
                newShow = true
            } else {
                newShow = show
            }
        }

        setScrollData({
            scrollUpStartOffset: upStart,
            scrollDownStartOffset: downStart,
            offset: offset,
        })
        setShow(newShow)
    } 

    const headerClass = cx(
        'componentHeader',
        props.className,
        {
            hideable: !largeViewport,
            show: !largeViewport && show,
        }
    )

    return (
        <div className={headerClass}>
            {props.children}
        </div>
    )
}

export default ComponentHeader