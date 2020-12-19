import React, { useContext } from 'react'
import { upperFirst, includes } from 'lodash'
import styles from './filterChoices.scss'
//Types
import { FilterWithChoices, SelectedFilter, CHANGE_FILTER } from '../../../filtersTypes'
//Context
import { FiltersContext } from '../../../filtersStore'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

type Props = {
    active: boolean,
    filter: FilterWithChoices
}

const FilterChoices = (props: Props) => {
    const { dispatch, ...state } = useContext(FiltersContext)
    const selectedChoices = state.selectedFilters![props.filter.id]

    const choices = props.filter.choices!.map(choice => {
        const handleChange = (choiceId: string, selected: boolean) => {
            let choices: SelectedFilter | null = {
                ...selectedChoices,
                [choiceId]: selected
            }

            if (!includes(choices!, true)) {
                choices = null
            }

            dispatch({
                type: CHANGE_FILTER,
                filterId: props.filter.id,
                value: choices,
            })
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