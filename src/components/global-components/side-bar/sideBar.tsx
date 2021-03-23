import React from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'

type Props = {
    children: React.ReactNode,
    active: boolean,
    className?: string,
    onBackgroundClick?: () => void,
}
const cx = classNames.bind(styles)

const SideBar = (props: Props) => {
    const is640OrLess = useTypedSelector(state => state.app.screenWidth.is640OrLess)

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        if (is640OrLess) {
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
            {is640OrLess &&
                <div
                    className={styles.background}
                    onClick={props.onBackgroundClick}>
                </div>
            }
        </div>
    )
}

export default SideBar