import React, { useContext } from 'react'
import { upperFirst, includes } from 'lodash'
import styles from './filterChoices.scss'
//Types
import { FilterWithChoices, SelectedChoiceFilterValue, SelectedFilterValue } from '../../filtersTypes'
//Context
import { FiltersContext } from '../../filtersStore'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

type Props = {
    active: boolean,
    filter: FilterWithChoices
}

const FilterChoices = (props: Props) => {
    const { selectedFilters, changeSelectedFilters } = useContext(FiltersContext)
    const selectedChoices = selectedFilters![props.filter.id] as SelectedChoiceFilterValue

    const choices = props.filter.choices!.map(choice => {
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
        <ul className={styles.filterChoices}>
            {choices}
        </ul>
    )
}

export default FilterChoices