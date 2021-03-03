import React, { useContext } from 'react'
import { upperFirst, includes, orderBy } from 'lodash'
import styles from './filterChoices.scss'
//Types
import { FilterWithChoices, SelectedChoiceFilterValue, SelectedFilterValue } from '../../filtersTypes'
//Context
import { FiltersContext } from '../../filtersStore'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SearchBar from 'components/global-components/search-bar/searchBar'

type Props = {
    active: boolean,
    filter: FilterWithChoices
}

const FilterChoices = (props: Props) => {
    const {
        selectedFilters,
        changeSelectedFilters,
        changeChoicesSort,
        changeSearchValue
    } = useContext(FiltersContext)

    const selectedChoices = selectedFilters![props.filter.id] as SelectedChoiceFilterValue

    const handleSort = () => {
        changeChoicesSort(props.filter.id)
    }

    const handleSearch = (input: string) => {
        changeSearchValue(props.filter.id, input)
    }

    const filteredChoices = props.filter.choices.filter(choice =>
        choice.title.toLowerCase().includes(props.filter.searchValue.toLowerCase())
    )

    const sortedChoices = orderBy(
        filteredChoices,
        (c) => c.title.toLowerCase(),
        props.filter.choicesSortDir
    )

    const choices = () => sortedChoices.map(choice => {
        const handleChange = (choiceId: number | string, selected: boolean) => {
            let choices: SelectedFilterValue | null = {
                ...selectedChoices,
            } as SelectedChoiceFilterValue
            if (selected) {
                choices![choiceId] = true
            } else {
                delete choices![choiceId]
            }

            if (!includes(choices!, true)) {
                choices = null
            }

            changeSelectedFilters(props.filter.id, choices)
        }

        const isSelected = selectedChoices?.[choice.id] === true

        return (
            <li key={choice.id}>
                <CheckBoxWithTitle
                    id={choice.id}
                    title={upperFirst(choice.title)}
                    selected={isSelected}
                    onChange={handleChange}
                />
            </li>
        )
    })

    return (
        <div className={styles.wrapper}>
            <SearchBar
                sortDir={props.filter.choicesSortDir}
                defaultSearchValue={props.filter.searchValue}
                onSort={handleSort}
                onSearch={handleSearch}
            />
            <ul className={styles.filterChoices}>
                {choices()}
            </ul>
        </div>
    )
}

export default FilterChoices