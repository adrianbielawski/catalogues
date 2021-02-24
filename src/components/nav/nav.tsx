import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './nav.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Router
import { useUrlBuilder } from 'src/router'
//Custom components
import NavLink from './navLink/navLink'
import NavList from './navList/navList'
import MobileNavBar from './mobile-nav-bar/mobileNavBar'
import GoBackButton from './go-back-button/goBackButton'

export type NavItemWithUrl = {
    id: string,
    title: string,
    url: string,
    children?: never,
}

type ItemWithChildren = {
    title: string,
    location: string
    url?: never,
    children: NavItemWithUrl[],
}

export type NavItemType = NavItemWithUrl | ItemWithChildren

export type ExtraItem = {
    component: JSX.Element,
    inNavBarOnMobile: boolean,
}

interface ShowList {
    show: boolean,
    index: number | null,
}

interface Props {
    content: NavItemType[],
    goBack?: { title: string, url: string, location: string },
    extraItems?: ExtraItem[],
    className?: string,
}

interface HeightData { bodyHeight: number, top: number }

const cx = classNames.bind(styles)

const Nav = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const buildUrl = useUrlBuilder()
    const navRef = useRef<HTMLDivElement>(null)
    const [showList, setShowList] = useState<ShowList>({ show: false, index: null })
    const [active, setActive] = useState(false)
    const [heightData, setHeightData] = useState<HeightData>({ bodyHeight: 0, top: 0 })
    const screenWidth = window.innerWidth

    useEffect(() => {
        window.addEventListener('resize', inspectHeight)

        return () => {
            window.removeEventListener('resize', inspectHeight)
        }
    }, [])

    useEffect(() => {
        if (showList.show === true) {
            window.addEventListener('click', toggleActive)
        } else {
            window.removeEventListener('click', toggleActive)
        }
        return () => {
            window.removeEventListener('click', toggleActive)
        }
    }, [showList.show])

    useEffect(() => {
        inspectHeight()
    }, [active])

    const inspectHeight = () => {
        setHeightData({
            bodyHeight: document.body.getBoundingClientRect().height,
            top: navRef.current!.getBoundingClientRect().height
        })
    }

    const toggleActive = () => {
        if (showList.show) {
            setShowList({ show: false, index: null })
        }
        setActive(!active)
    }

    const handleListClick = (index: number) => {
        if (showList.show === false) {
            setShowList({ show: true, index })
        } else {
            setShowList({ show: false, index: null })
        }
    }

    const handleListHover = (index: number) => {
        if (showList.show === false) {
            return
        } else {
            setShowList({ show: true, index })
        }
    }

    const handleLinkHover = () => {
        if (showList.show === false) {
            return
        } else {
            setShowList({ show: true, index: null })
        }
    }

    const getItems = (): React.ReactNode => {
        let items = props.content.map((item, index) => {
            if (item.url !== undefined) {
                return (
                    <NavLink
                        item={item}
                        onHover={handleLinkHover}
                        onClick={toggleActive}
                        key={index}
                    />
                )
            } else {
                return (
                    <NavList
                        title={item.title}
                        location={item.location}
                        children={item.children}
                        index={index}
                        show={showList.show === true && showList.index === index}
                        onClick={handleListClick}
                        onLinkClick={toggleActive}
                        onHover={handleListHover}
                        key={index}
                    />
                )
            }
        })

        if (props.goBack !== undefined && screenWidth > 640) {
            items.unshift(getGoBackButton())
        }

        return items
    }

    const getPrevLocation = () => {
        let prevLocation = props.goBack?.url

        if (location.state !== undefined && props.goBack !== undefined) {
            const referrer = buildUrl(location.state.referrer)
            if (referrer.startsWith(props.goBack!.location)) {
                prevLocation = props.goBack!.url
            } else {
                prevLocation = referrer
            }
        }
        return prevLocation
    }

    const handleGoBack = () => {
        const prevLocation = getPrevLocation()
        history.push(prevLocation!)
    }

    const getGoBackButton = () => {
        const prevLocation = getPrevLocation()
        let title = 'Go back'
        if (props.goBack !== undefined) {
            if (prevLocation === '' || prevLocation === props.goBack.url) {
                title = props.goBack?.title
            }
        }

        return (
            <GoBackButton
                className={styles.navItem}
                arrowClass={styles.leftArrow}
                title={title}
                onClick={handleGoBack}
                key={'goBack'}
            />
        )
    }

    const extraItems = props.extraItems!.map((item, index) => {
        if (!item.inNavBarOnMobile) {
            return <li key={`extraItem${index}`}>{item.component}</li>
        }
    })

    const navClass = cx(
        'nav',
        props.className,
        {
            active,
        }
    )

    return (
        <div className={styles.navWrapper} ref={navRef}>
            {screenWidth <= 640 && (
                <MobileNavBar
                    extraItems={props.extraItems}
                    goBackButton={props.goBack !== undefined ? getGoBackButton() : undefined}
                    toggleActive={toggleActive}
                    handleGoBack={handleGoBack}
                />
            )}
            <nav
                className={navClass}
                style={{
                    '--bodyHeight': `${heightData.bodyHeight}px`,
                    '--top': `${heightData.top}px`,
                } as React.CSSProperties}
            >
                <div className={styles.contentWrapper}>
                    <ul className={styles.navContent}>
                        {getItems()}
                    </ul>
                    {props.extraItems !== undefined && (
                        <ul className={styles.navContent}>
                            {extraItems}
                        </ul>
                    )}
                </div>
                <div className={styles.background} onClick={toggleActive}></div>
            </nav>
        </div>
    )
}

export default Nav