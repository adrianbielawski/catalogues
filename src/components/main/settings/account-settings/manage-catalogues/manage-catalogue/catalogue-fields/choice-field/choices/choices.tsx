import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddButton from 'components/global-components/add-button/addButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import { DeserializedChoice } from 'src/globalTypes'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    choices: DeserializedChoice[],
    className: string,
    onRemove: (id: number | string) => void,
    onAdd: (name: string) => void,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const [isAddChoiceActive, setIsAddChoiceActive] = useState(false)
    const [inputError, setInputError] = useState('')

    const handleAddButtonClick = () => {
        setIsAddChoiceActive(true)
    }

    const validateInput = (name: string) => {
        let error = null

        if (props.choices.find((choice) => choice.value.toLowerCase() === name.toLowerCase())) {
            error = `Choice with name "${name}" already exists`
        }

        return {
            valid: error === null,
            error,
        }
    }
    
    const clearInputError = () => {
        setInputError('')
    }

    const handleConfirm = (name: string) => {
        const { valid, error } = validateInput(name)
        if (!valid) {
            setInputError(error!)
            return
        }
        props.onAdd(name)
    }

    const choices = (
        props.choices.map(choice => {
            const handleRemove = () => {
                props.onRemove(choice.id!)
            }

            return (
                <li className={styles.choice} key={choice.value}>
                    <TransparentButton className={styles.removeButton} onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choice.value}</span>
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
                        inputProps={{placeholder: "New choice name"}}
                        loading={false}
                        clearOnConfirm={true}
                        onConfirm={handleConfirm}
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
            <MessageModal
                show={inputError.length !== 0}
                title={'Choice name error'}
                message={inputError}
                onConfirm={clearInputError}
            />
        </div>
    )
}

export default Choices