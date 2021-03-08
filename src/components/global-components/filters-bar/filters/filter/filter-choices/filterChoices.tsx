import React, { useContext, useEffect, useState } from 'react'
import { upperFirst, includes, orderBy, size } from 'lodash'
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
    const [allChoicesSelected, setAllChoicesSelected] = useState(false)
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

    useEffect(() => {
        if (size(selectedChoices) === sortedChoices.length) {
            setAllChoicesSelected(true)
            return
        }
        setAllChoicesSelected(false)
    }, [selectedChoices])

    const handleSelectAllChange = () => {
        if (allChoicesSelected) {
            changeSelectedFilters(props.filter.id, {})
        } else {
            const allChoices: SelectedFilterValue = {}
            sortedChoices.map(choice => {
                allChoices[choice.id] = true
            })
            changeSelectedFilters(props.filter.id, allChoices)
        }
    }

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
            <CheckBoxWithTitle
                id={'selectAll'}
                title={'Select all'}
                selected={allChoicesSelected}
                className={styles.selectAll}
                onChange={handleSelectAllChange}
            />
            <ul className={styles.filterChoices}>
                {choices()}
            </ul>
        </div>
    )
}

export default FilterChoices