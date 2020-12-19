import React, { useReducer } from 'react'
import classNames from 'classnames/bind'
import styles from './filters.scss'
//Contexts
import { FiltersContext, reducer, initialState } from './filtersStore'
//Custom components
import Filter from './filter/filter'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Filters = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const context = {
        ...state,
        dispatch,
    }

    const getFilters = () => {
        return state.filters.map(filter => (
            <Filter
                filter={filter}
                key={filter.id}
            />
        ))
    }

    const filtersClass = cx(
        'filters',
        props.className,
    )

    return (
        <FiltersContext.Provider value={context}>
            <div className={filtersClass}>
                <div className={styles.title}>Filters</div>
                <ul>
                    {getFilters()}
                </ul>
            </div>
        </FiltersContext.Provider>
    )
}

export default Filters