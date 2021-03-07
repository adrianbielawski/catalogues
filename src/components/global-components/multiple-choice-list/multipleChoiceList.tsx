import React from 'react'
import { upperFirst } from 'lodash'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

interface BasicChoice {
    id: number | string | null,
    value: string,
}

type Props<ChoiceType> = {
    choices: ChoiceType[],
    filteredChoices: ChoiceType[],
    selected: (number | string | null)[],
    className?: string,
    onChange: (choices: ChoiceType[]) => void,
}

const MultipleChoiceList = <ChoiceType extends BasicChoice>(props: Props<ChoiceType>) => {
    const choices = props.filteredChoices.map(choice => {
        if (choice.id === null) {
            return
        }

        const handleChange = (choiceId: number | string, isSelected: boolean) => {
            let selectedIds = [...props.selected]
            if (isSelected) {
                selectedIds.push(choiceId)
            } else {
                selectedIds = selectedIds.filter(id => id !== choiceId)
            }

            const selectedChoices = props.choices.filter(obj => {
                if (selectedIds?.includes(obj.id)) {
                    return obj
                }
            })

            props.onChange(selectedChoices)
        }

        const isSelected = props.selected?.includes(choice.id)

        return (
            <li key={choice.id}>
                <CheckBoxWithTitle
                    id={choice.id}
                    title={upperFirst(choice.value)}
                    selected={isSelected}
                    onChange={handleChange}
                />
            </li>
        )
    })

    return (
        <ul className={props.className}>
            {choices}
        </ul>
    )
}

export default MultipleChoiceList