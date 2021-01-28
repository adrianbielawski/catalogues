import React, { useState } from 'react'
import styles from './textField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'

interface Props {
    itemId: number | string,
    field: DeserializedField,
    fieldValue?: DeserializedItemField,
}

const TextField = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleConfirm = (input: string) => {
        setConfirmed(true)
        Promise.resolve(
            props.onEditConfirm(props.field.id, input)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    return (
        <li className={styles.textField}>
            <EditableFieldTitle
                title={props.field.name}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            <div className={styles.content}>
                {isEditing
                    ? (
                        <InputWithConfirmButton
                            className={styles.input}
                            defaultValue={props.fieldValue?.value || ''}
                            autoFocus
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.fieldValue?.value
                }
            </div>
        </li>
    )
}

export default TextField