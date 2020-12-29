import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableFieldTitle from 'components/global-components/editable-list/editable-field/editable-field-title/editableFieldTitle'


export interface TextFieldInterface {
    id: string,
    name: string,
    type: string,
    content: string,
    choices?: never,
}

interface Props {
    field: TextFieldInterface,
    onEditConfirm: (id: string, input: string) => void
}

const cx = classNames.bind(styles)

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
        <div className={styles.textField}>
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
                            placeholder={props.field.content}
                            loading={confirmed}
                            autoFocus
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.field.content
                }
            </div>
        </div>
    )
}

export default TextField