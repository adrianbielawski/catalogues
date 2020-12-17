import React from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.scss'

type Props = {
    children: JSX.Element,
    className?: string,
}
const cx = classNames.bind(styles)

const SideBar = (props: Props) => {
    const SideBarClass = cx(
        'sideBar',
        props.className,
    )

    return (
        <div className={SideBarClass}>
            {props.children}
        </div>
    )
}

export default SideBar