import React from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.scss'

type Props = {
    children: JSX.Element,
    active: boolean,
    className?: string,
    onBackgroundClick: () => void,
}
const cx = classNames.bind(styles)

const NAV_BAR_HEIGHT = 38

const SideBar = (props: Props) => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const sideBarWrapperClass = cx(
        'sideBarWrapper',
        {
            active: props.active,
        }
    )

    const sideBarClass = cx(
        'sideBar',
        props.className,
    )

    const sideBarConstants = {
        '--screenHeight': `${screenHeight}px`,
        '--top': `${NAV_BAR_HEIGHT}px`,
    } as React.CSSProperties

    return (
        <div className={sideBarWrapperClass}>
            <div className={sideBarClass} 
                style={sideBarConstants}>
                {props.children}
            </div>
            {screenWidth <= 640 &&
                <div
                    className={styles.background}
                    onClick={props.onBackgroundClick}>
                </div>
            }
        </div>
    )
}

export default SideBar