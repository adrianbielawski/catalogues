import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './singleChoiceField.scss'
//Types
import { Choice } from 'components/main/settings/account-settings/manage-catalogues/manage-catalogue/item-fields/choice-field/choices/choices'
//Custom components
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import ConfirmButton from 'components/global-components/confirm-button/confirmButton'

export interface ChoiceFieldInterface {
    id: string,
    name: string,
    type: string,
    choices: Choice[],
}

interface Props {
    field: ChoiceFieldInterface,
    onEditConfirm: (id: string, input: string) => void
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [selectedId, setSelectedId] = useState<string>('222')
    const selectedIndex = props.field.choices.findIndex(choice => choice.id === selectedId)

    const handleEdit = () => {
        setIsEditing(!isEditing)
        if (isEditing) {
            setSelectedId('222')
        }
    }

    const handleChange = (id: string) => {
        setSelectedId(id)
    }

    const handleConfirm = () => {
        setConfirmed(true)
        Promise.resolve(
            props.onEditConfirm(props.field.id, selectedId)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    const fieldClass = cx(
        'singleChoiceField',
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
                            <SingleChoiceList
                                choices={props.field.choices}
                                selected={selectedId}
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
                    : props.field.choices[selectedIndex].name
                }
            </div>
        </div>
    )
}

export default SingleChoiceField