import React, { useContext } from 'react'
import styles from './filterChoices.scss'
//Types
import { FilterWithChoices, SelectedChoiceFilterValue } from '../../filtersTypes'
//Context
import { FiltersContext } from '../../filtersStore'
//Custom components
import ChoiceList from 'components/global-components/choice-list/choiceList'

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

    const handleChange = (selected: (number | string)[]) => {
        changeSelectedFilters(props.filter!.id, selected as string[])
    }

    return (
        <div className={styles.wrapper}>
            <ChoiceList
                choices={props.filter.choices}
                defaultSortDir="asc"
                defaultSearchValue=""
                selected={selectedChoices || []}
                multiple={true}
                onChange={handleChange}
            />
        </div>
    )
}

export default FilterChoices