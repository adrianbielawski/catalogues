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

interface NavView {
    active: boolean,
    showList: boolean,
    listIndex: number | null,
}

interface Props {
    content: NavItemType[],
    goBack?: { title: string, url: string, location: string },
    extraItems?: ExtraItem[],
    className?: string,
}

interface HeightData { top: number, position: number }

const cx = classNames.bind(styles)

const Nav = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const buildUrl = useUrlBuilder()
    const navRef = useRef<HTMLDivElement>(null)
    const [navView, setNavView] = useState<NavView>({ active: false, showList: false, listIndex: null })
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
    }, [navView.active])

    useEffect(() => {
        if (navView.showList || navView.active) {
            document.body.addEventListener('click', cloceNav)
        } else {
            document.body.removeEventListener('click', cloceNav)
        }
        return () => {
            document.body.removeEventListener('click', cloceNav)
        }
    }, [navView])

    const inspectHeight = () => {
        setHeightData({
            top: navRef.current!.getBoundingClientRect().height,
            position: navRef.current!.getBoundingClientRect().top,
        })
    }

    const cloceNav = () => {
        setNavView({
            active: false,
            showList: false,
            listIndex: null,
        })
    }

    const toggleActive = () => {
        setNavView({
            active: !navView.active,
            showList: false,
            listIndex: null,
        })
    }

    const handleListClick = (listIndex: number) => {
        if (!navView.showList) {
            setNavView({
                active: navView.active,
                showList: true,
                listIndex,
            })
        } else {
            setNavView({
                active: navView.active,
                showList: false,
                listIndex: null,
            })
        }
    }

    const handleLinkClick = () => {
        if (screenWidth <= 640) {
            setNavView({
                active: !navView.active,
                showList: false,
                listIndex: null,
            })
        } else {
            setNavView({
                active: navView.active,
                showList: false,
                listIndex: null,
            })
        }
    }

    const handleListHover = (listIndex: number) => {
        if (navView.showList) {
            setNavView({
                active: navView.active,
                showList: true,
                listIndex,
            })
        }
    }

    const handleLinkHover = () => {
        if (navView.showList) {
            setNavView({
                active: navView.active,
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
            active: navView.active,
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
                <div className={styles.background} onClick={toggleActive}></div>
            </nav>
        </div>
    )
}

export default Nav