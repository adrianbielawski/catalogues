import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddButton from 'components/global-components/add-button/addButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

export interface Choice {
    id: string,
    name: string,
}

type Props = {
    choices: Choice[],
    className: string,
    onRemove: (id: string) => void,
    onAdd: (name: string) => void,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const [isAddChoiceActive, setIsAddChoiceActive] = useState(false)

    const handleAddButtonClick = () => {
        setIsAddChoiceActive(true)
    }

    const handleConfirm = (name: string) => {
        props.onAdd(name)
    }

    const choices = (
        props.choices.map(choice => {
            const handleRemove = () => {
                props.onRemove(choice.id)
            }

            return (
                <li className={styles.choice} key={choice.id}>
                    <TransparentButton className={styles.removeButton} onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choice.name}</span>
                </li>
            )

        })
    )

    const choicesClass = cx(
        'choicesList',
        props.className,
    )

    return (
        <div className={styles.choices}>
            <ul className={choicesClass}>
                {choices}
            </ul>
            {isAddChoiceActive
                ? (
                    <InputWithConfirmButton
                        placeholder="New choice name"
                        loading={false}
                        onConfirm={handleConfirm}
                        autoFocus
                    />
                )
                : (
                    <AddButton
                        text="Add choice"
                        className={styles.addChoiceButton}
                        onClick={handleAddButtonClick}
                    />
                )
            }
        </div>
    )
}

export default Choices