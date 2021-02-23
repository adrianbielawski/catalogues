import React from 'react'
import classNames from 'classnames/bind'
import styles from './filterWrapper.scss'

type Props = {
    active: boolean,
    children: JSX.Element,
}

const cx = classNames.bind(styles)

const FilterWrapper = (props: Props) => {
    const optionsClass = cx(
        'filterWrapper',
        {
            active: props.active,
        }
    )

    return (
        <div className={optionsClass}>
            {props.children}
        </div>
    )
}

export default FilterWrapper