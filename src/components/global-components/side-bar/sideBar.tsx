import React from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.scss'

type Props = {
    children: React.ReactNode,
    active: boolean,
    className?: string,
    onBackgroundClick?: () => void,
}
const cx = classNames.bind(styles)

const SideBar = (props: Props) => {
    const screenWidth = window.innerWidth

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        if (screenWidth <= 640) {
            e.stopPropagation()
        }
    }

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

    return (
        <div className={sideBarWrapperClass}>
            <div className={sideBarClass} onClick={stopPropagation}>
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