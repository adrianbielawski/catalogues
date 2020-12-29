import React from 'react'
import { upperFirst, includes } from 'lodash'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'


export interface SelectedChoice {
    [filterId: string]: boolean,
}

export interface Choice {
    id: string,
    name: string,
}

type Props = {
    id: string | number,
    choices: Choice[],
    selected: SelectedChoice,
    className?: string,
    onChange: (choices: SelectedChoice) => void,
}

const MultipleChoiceList = (props: Props) => {
    const choices = props.choices!.map(choice => {
        const handleChange = (choiceId: string, selected: boolean) => {
            let choices: SelectedChoice = {
                ...props.selected,
                [choiceId]: selected
            }

            if (!includes(choices!, true)) {
                choices = {}
            }

            props.onChange(choices)
        }

        const isSelected = props.selected?.[choice.id] === true

        return (
            <li key={choice.id}>
                <CheckBoxWithTitle
                    id={choice.id}
                    title={upperFirst(choice.name)}
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