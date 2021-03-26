import React, { PropsWithChildren, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.scss'

type SlideDirection = 'right' | 'left'

interface Props extends PropsWithChildren<any> {
    active: boolean,
    mobile: boolean,
    slideDirection?: SlideDirection,
    className?: string,
    childrenWrapperClassName?: string,
    onBackgroundClick: (e: React.MouseEvent) => void,
}


const defaultProps: Props = {
    active: false,
    mobile: false,
    slideDirection: 'left',
    className: '',
    childrenWrapperClassName: '',
    onBackgroundClick: () => null,
}

const cx = classNames.bind(styles)

const SideBar = (props: Props) => {
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        if (props.active) {
            body.style.overflow = 'hidden'
        } else {
            body.style.overflow = ''
        }
    }, [props.active])

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.mobile) {
            e.stopPropagation()
        }
    }

    const onBackgroundClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        props.onBackgroundClick(e)
    }

    const sideBarClass = cx(
        'sideBar',
        props.className,
        {
            active: props.active,
            rightSlide: props.slideDirection === 'right',
            leftSlide: props.slideDirection === 'left',
        }
    )

    const childrenWrapperClass = cx(
        'childrenWrapper',
        props.childrenWrapperClassName,
    )

    return (
        <div
            className={sideBarClass}
        >
            <div className={childrenWrapperClass} onClick={stopPropagation}>
                {props.children}
            </div>
            {props.mobile &&
                <div
                    className={styles.background}
                    onClick={onBackgroundClick}
                ></div>
            }
        </div>
    )
}

SideBar.defaultProps = defaultProps

export default SideBar