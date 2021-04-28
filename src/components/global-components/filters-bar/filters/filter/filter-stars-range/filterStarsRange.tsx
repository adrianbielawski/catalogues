import React, { useContext } from 'react'
import styles from './filterStarsRange.scss'
//Types
import { FilterWithoutChoices, Range } from '../../filtersTypes'
//Context
import { FiltersContext } from '../../filtersStore'
//Custom components
import StarsRange from 'components/global-components/stars-range/starsRange'

type Props = {
    filter: FilterWithoutChoices,
    active: boolean,
}

const FilterRange = (props: Props) => {
    const { selectedFilters, changeSelectedFilters } = useContext(FiltersContext)
    const selectedRange = selectedFilters![props.filter.id] as Range || null
    const gte = selectedRange?.gte as number
    const lte = selectedRange?.lte as number
    const selected = (gte && lte) ? [gte, lte] : []

    const handleChange = (newSelected: number[]) => {
        let newRange: Range | null = newSelected.length > 0
            ? {
                gte: newSelected[0],
                lte: newSelected[1],
            }
            : null

        changeSelectedFilters(props.filter.id, newRange)
    }

    return (
        <div className={styles.filterStarsRange}>
            <StarsRange
                selected={selected}
                onChange={handleChange}
            />
        </div>
    )
}

export default FilterRange