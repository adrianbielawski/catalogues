import React from 'react'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

export interface BasicChoice {
    id: number | string | null,
    value: string,
}

type Props<ChoiceType> = {
    choices: ChoiceType[],
    selected: number | string | null,
    className?: string,
    onChange: (choice: ChoiceType) => void,
}

const SingleChoiceList = <ChoiceType extends BasicChoice>(props: Props<ChoiceType>) => {
    const choices = props.choices.map(choice => {
        if (choice.id === null) {
            return
        }
        const onChange = () => {
            props.onChange(choice)
        }
        return (
            <li key={choice.id}>
                <CheckBoxWithTitle
                    id={choice.id}
                    title={choice.value}
                    selected={props.selected === choice.id}
                    onChange={onChange}
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

export default SingleChoiceList