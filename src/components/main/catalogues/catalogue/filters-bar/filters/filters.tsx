import React, { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './filters.scss'
//Contexts
import { FiltersContext } from './filtersStore'
//Custom components
import Filter from './filter/filter'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Filters = (props: Props) => {
    const { dispatch, ...state } = useContext(FiltersContext)

    const filters = state.filters.map(filter => (
        <Filter
            filter={filter}
            key={filter.id}
        />
    ))

    const filtersClass = cx(
        'filters',
        props.className,
    )

    return (
        <div className={filtersClass}>
            <div className={styles.title} onClick={() => console.log(state.selectedFilters)}>Filters</div>
            <ul>
                {filters}
            </ul>
        </div>
    )
}

export default Filters