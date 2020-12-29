import React from 'react'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

export interface Choice {
    id: string,
    name: string,
}

type Props = {
    choices: Choice[],
    selected: string | null,
    className?: string,
    onChange: (id: string) => void,
}

const SingleChoiceList = (props: Props) => {
    const choices = props.choices.map(choice => (
        <li key={choice.id}>
            <CheckBoxWithTitle
                id={choice.id}
                title={choice.name}
                selected={props.selected === choice.id}
                onChange={props.onChange}
            />
        </li>
    ))

    return (
        <ul className={props.className}>
            {choices}
        </ul>
    )
}

export default SingleChoiceList