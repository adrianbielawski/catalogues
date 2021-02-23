import React from 'react'
import classNames from 'classnames/bind'
import styles from './sortWrapper.scss'

type Props = {
    active: boolean,
    children: JSX.Element,
    maxHeight: number | undefined,
}

const cx = classNames.bind(styles)

const SortWrapper = (props: Props) => {
    const wrapperClass = cx(
        'sortWrapper',
        {
            active: props.active,
        }
    )

    return (
        <div className={wrapperClass} style={{ maxHeight: props.active ? props.maxHeight : '' }}>
            {props.children}
        </div>
    )
}

export default SortWrapper