import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './multipleChoiceField.scss'
//Types
import { Choice } from 'components/global-components/multiple-choice-list/multipleChoiceList'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import ConfirmButton from 'components/global-components/confirm-button/confirmButton'
import MultipleChoiceList, { SelectedChoice } from 'components/global-components/multiple-choice-list/multipleChoiceList'

export interface ChoiceFieldInterface {
    id: string,
    name: string,
    type: string,
    choices: Choice[],
}

interface Props {
    field: ChoiceFieldInterface,
    selected: SelectedChoice,
    onEditConfirm: (id: string, selected: SelectedChoice) => void
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [selected, setSelected] = useState<SelectedChoice>(props.selected)

    const handleEdit = () => {
        setIsEditing(!isEditing)
        if (isEditing) {
            setSelected(props.selected)
        }
    }

    const handleChange = (selected: SelectedChoice) => {
        setSelected(selected)
    }

    const handleConfirm = () => {
        setConfirmed(true)
        Promise.resolve(
            props.onEditConfirm(props.field.id, selected)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    const fieldClass = cx(
        'multipleChoiceField',
        {
            active: isEditing
        },
    )

    const contentClass = cx(
        'content',
        {
            active: isEditing
        },
    )

    const content = props.field.choices.map(choice => {
        if (selected?.[choice.id] === true) {
            return choice.name
        }
    })

    return (
        <div className={fieldClass}>
            <EditableFieldTitle
                title={props.field.name}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            <div className={contentClass}>
                {isEditing
                    ? (
                        <>
                            <MultipleChoiceList
                                id={props.field.id}
                                choices={props.field.choices}
                                selected={selected}
                                onChange={handleChange}
                            />
                            <ConfirmButton
                                className={styles.confirmButton}
                                size={25}
                                loading={confirmed}
                                onClick={handleConfirm}
                            />
                        </>
                    )
                    : content
                }
            </div>
        </div>
    )
}

export default SingleChoiceField