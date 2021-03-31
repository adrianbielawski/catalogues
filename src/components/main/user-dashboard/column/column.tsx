import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './column.scss'

type Props = {
    title: string,
    children: ReactNode,
    className: string,
}

const cx = classNames.bind(styles)

const Column = (props: Props) => {
    const columnClass = cx(
        'column',
        props.className,
    )

    return (
        <div className={columnClass}>
            <p className={styles.header}>
                {props.title}
            </p>
            {props.children}
        </div>
    )
}

export default Column