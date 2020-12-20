import React, { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './sort.scss'
//Contexts
import { SortContext } from './sortStore'
//Custom components
import SortOption from './sort-option/sortOption'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Sort = (props: Props) => {
    const { dispatch, ...state } = useContext(SortContext)

    const sortOptions = state.sortOptions.map(option => (
        <SortOption option={option} key={option.id} />
    ))

    const sortClass = cx(
        'sort',
        props.className,
    )

    return (
        <div className={sortClass}>
            <div className={styles.title}>Sort</div>
            <ul>
                {sortOptions}
            </ul>
        </div>
    )
}

export default Sort