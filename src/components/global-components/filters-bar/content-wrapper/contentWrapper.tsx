import React from 'react'
import classNames from 'classnames/bind'
import styles from './contentWrapper.module.scss'
//components
import AnimateHeight from 'react-animate-height'

type Props = {
    active: boolean,
    children: JSX.Element,
}

const cx = classNames.bind(styles)

const ContentWrapper = (props: Props) => {
    const contentClass = cx(
        'content',
        {
            active: props.active,
        }
    )

    return (
        <AnimateHeight
            className={contentClass}
            height={props.active ? 'auto' : 0}
        >
            {props.children}
        </AnimateHeight>
    )
}

export default ContentWrapper