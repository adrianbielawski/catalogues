import React from 'react'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
//Custom components

interface Choice {
    id: string,
    title: string,
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
                title={choice.title}
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