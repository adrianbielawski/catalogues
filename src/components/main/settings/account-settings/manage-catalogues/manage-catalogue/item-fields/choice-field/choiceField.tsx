import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { cloneDeep } from 'lodash'
import classNames from 'classnames/bind'
import styles from './ChoiceField.scss'
//Types
import { ChoiceFieldInterface } from '../itemFields'
import { Choice } from './choices/choices'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'
import Loader from 'components/global-components/loader/loader'

type Props = {
    field: ChoiceFieldInterface,
    onEditConfirm: (input: string, choices: Choice[]) => void,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [choices, setChoices] = useState(props.field.choices)

    const handleEdit = () => {
        setIsEditing(!isEditing)
        setChoices(props.field.choices)
    }

    const handleRemoveChoice = (id: string) => {
        let newChoices = cloneDeep(choices)
        const choiceIndex = newChoices.findIndex(choice => choice.id === id)        
        newChoices.splice(choiceIndex, 1)
        setChoices(newChoices)
    }

    const handleAddChoice = (name: string) => {
        let newChoices = cloneDeep(choices)
        newChoices.push({
            id: Date.now().toString(),
            name,
        })
        setChoices(newChoices)
    }

    const handleConfirm = () => {
        setConfirmed(true)
        const name = nameInputRef.current?.value || props.field.name

        Promise.resolve(
            props.onEditConfirm(name, choices)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    const handleCancel = () => {
        setIsEditing(false)
        setChoices(props.field.choices)
    }

    const fieldClass = cx(
        'field',
        {
            active: isEditing,
        }
    )

    const buttonClass = cx(
        'editButton',
        {
            active: isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {isEditing
                ? (
                    <div>
                        <Input
                            placeholder={props.field.name}
                            className={styles.nameInput}
                            minLength={2}
                            ref={nameInputRef}
                        />
                        <Choices
                            className={styles.choices}
                            choices={choices}
                            onRemove={handleRemoveChoice}
                            onAdd={handleAddChoice}
                        />
                        <div className={styles.buttons}>
                            <Button className={styles.button} onClick={handleConfirm}>
                                {confirmed
                                    ? <Loader size={25} />
                                    : 'Save'
                                }
                            </Button>
                            <Button className={styles.button} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
                : props.field.name
            }
        </div>
    )
}

export default ChoiceField