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

const SideBar = (props: Props) => {
    const screenWidth = window.innerWidth

    const SideBarWrapperClass = cx(
        'sideBarWrapper',
        {
            active: props.active,
        }
    )

    const SideBarClass = cx(
        'sideBar',
        props.className,
    )

    return (
        <div className={SideBarWrapperClass}>
            <div className={SideBarClass}>
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