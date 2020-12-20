import React, { useReducer } from 'react'
import classNames from 'classnames/bind'
import styles from './sort.scss'
//Contexts
import { SortContext, reducer, initialState } from './sortStore'
//Custom components
import SortOption from './sort-option/sortOption'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Sort = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const context = {
        ...state,
        dispatch,
    }

    const sortOptions = state.sortOptions.map(option => (
        <SortOption option={option} key={option.id}/>
    ))

    const sortClass = cx(
        'sort',
        props.className,
    )

    return (
        <SortContext.Provider value={context}>
            <div className={sortClass}>
                <div className={styles.title}>Sort</div>
                <ul>
                    {sortOptions}
                </ul>
            </div>
        </SortContext.Provider>
    )
}

export default Sort