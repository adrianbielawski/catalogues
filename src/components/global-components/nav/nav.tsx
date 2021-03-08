import React, { useState, useRef, useEffect, useCallback } from 'react'
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

interface NavView {
    showList: boolean,
    listIndex: number | null,
}

interface Props {
    content: NavItemType[],
    show: boolean,
    goBack?: { title: string, url: string, location: string },
    extraItems?: ExtraItem[],
    className?: string,
    onToggleNav: (e: React.MouseEvent) => void,
}

interface HeightData { top: number, position: number }

const cx = classNames.bind(styles)

const Nav = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const buildUrl = useUrlBuilder()
    const navRef = useRef<HTMLDivElement>(null)
    const [navView, setNavView] = useState<NavView>({ showList: false, listIndex: null })
    const [heightData, setHeightData] = useState<HeightData>({ top: 0, position: 0 })
    const screenWidth = window.innerWidth

    useEffect(() => {
        window.addEventListener('scroll', inspectHeight)
        window.addEventListener('resize', inspectHeight)

        return () => {
            window.removeEventListener('scroll', inspectHeight)
            window.removeEventListener('resize', inspectHeight)
        }
    }, [])

    useEffect(() => {
        inspectHeight()
    }, [props.show])

    const close = useCallback(() => {
        setNavView({
            showList: false,
            listIndex: null,
        })
    }, [])

    useEffect(() => {
        if (navView.showList || props.show) {
            document.body.addEventListener('click', close)
        }

        return () => {
            document.body.removeEventListener('click', close)
        }
    }, [navView, close])

    const inspectHeight = () => {
        setHeightData({
            top: navRef.current!.getBoundingClientRect().height,
            position: navRef.current!.getBoundingClientRect().top,
        })
    }

    const handleListClick = (listIndex: number) => {
        if (!navView.showList) {
            setNavView({
                showList: true,
                listIndex,
            })
        } else {
            setNavView({
                showList: false,
                listIndex: null,
            })
        }
    }

    const handleLinkClick = (e: React.MouseEvent) => {
        if (screenWidth <= 640) {
            props.onToggleNav(e)
            setNavView({
                showList: false,
                listIndex: null,
            })
        } else {
            setNavView({
                showList: false,
                listIndex: null,
            })
        }
    }

    const handleListHover = (listIndex: number) => {
        if (navView.showList) {
            setNavView({
                showList: true,
                listIndex,
            })
        }
    }

    const handleLinkHover = () => {
        if (navView.showList) {
            setNavView({
                showList: true,
                listIndex: null,
            })
        }
    }

    const getItems = (): React.ReactNode => {
        let items = props.content.map((item, index) => {
            if (item.url !== undefined) {
                return (
                    <NavLink
                        item={item}
                        onHover={handleLinkHover}
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
                        show={navView.showList === true && navView.listIndex === index}
                        onClick={handleListClick}
                        onHover={handleListHover}
                        onLinkClick={handleLinkClick}
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

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        if (screenWidth <= 640) {
            e.stopPropagation()
        }
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
            active: props.show,
        }
    )

    return (
        <div className={styles.navWrapper} ref={navRef}>
            {screenWidth <= 640 && (
                <MobileNavBar
                    extraItems={props.extraItems}
                    goBackButton={props.goBack !== undefined ? getGoBackButton() : undefined}
                    onToggleNav={props.onToggleNav}
                    handleGoBack={handleGoBack}
                />
            )}
            <nav
                className={navClass}
                style={{
                    '--top': `${heightData.top}px`,
                    '--position': `${heightData.position}px`
                } as React.CSSProperties}
            >
                <div className={styles.contentWrapper} onClick={stopPropagation}>
                    <ul className={styles.navContent}>
                        {getItems()}
                    </ul>
                    {props.extraItems !== undefined && (
                        <ul className={styles.navContent}>
                            {extraItems}
                        </ul>
                    )}
                </div>
                <div className={styles.background}></div>
            </nav>
        </div>
    )
}

export default Nav