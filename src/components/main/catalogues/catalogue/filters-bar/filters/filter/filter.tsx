import React, { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './filter.scss'
//Context
import { FiltersContext } from '../filtersStore'
//Types
import { FilterType } from '../filtersTypes'
//Maps
import { filterComponentMap } from '../filtersMaps'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import FilterWrapper from './filter-wrapper/filterWrapper'

type Props = {
    filter: FilterType,
    className?: string,
}

const cx = classNames.bind(styles)

const Filter = (props: Props) => {
    const { selectedFilters, changeSelectedFilters } = useContext(FiltersContext)
    const isActive = selectedFilters![props.filter.id] !== undefined

    const handleChange = () => {
        const value = isActive ? undefined : null
        changeSelectedFilters(props.filter.id, value)
    }

    const filterClass = cx(
        'filter',
        props.className,
    )

    const FilterComponent = filterComponentMap[props.filter.type]

    return (
        <li className={filterClass}>
            <CheckBoxWithTitle
                id={props.filter.id}
                title={`By ${props.filter.title}`}
                selected={isActive}
                onChange={handleChange}
            />
            <FilterWrapper active={isActive}>
                <FilterComponent filter={props.filter} active={isActive} />
            </FilterWrapper>
        </li>
    )
}

export default Filter