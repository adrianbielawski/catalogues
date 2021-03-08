import React, { useContext } from 'react'
import styles from './filterChoices.scss'
//Types
import { Choice, FilterWithChoices, SelectedChoiceFilterValue } from '../../filtersTypes'
//Context
import { FiltersContext } from '../../filtersStore'
//Custom components
import MultipleChoiceList from 'components/global-components/multiple-choice-list/multipleChoiceList'

type Props = {
    active: boolean,
    filter: FilterWithChoices
}

const FilterChoices = (props: Props) => {
    const {
        selectedFilters,
        changeSelectedFilters,
    } = useContext(FiltersContext)

    const selectedChoices = selectedFilters![props.filter.id] as SelectedChoiceFilterValue[]

    const handleChange = (selected: Choice[]) => {
        const selectedValues = selected.map(c => c.value)
        changeSelectedFilters(props.filter!.id, selectedValues)
    }

    return (
        <div className={styles.wrapper}>
            <MultipleChoiceList
                choices={props.filter.choices}
                defaultSortDir="asc"
                defaultSearchValue=""
                selected={selectedChoices || []}
                onChange={handleChange}
            />
        </div>
    )
}

export default FilterChoices