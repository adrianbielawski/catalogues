import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './longTextField.scss'
//Custom components
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
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

const LongTextField = (props: Props) => {
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

    const fieldClass = cx(
        'longTextField',
        {
            active: isEditing
        },
    )

    const contentText = () => {
        if (props.field.content.length > 20) {
            return `${props.field.content.slice(0, 20)}...`
        } else {
            return props.field.content
        }
    }

    return (
        <div className={fieldClass}>
            <EditableFieldTitle
                title={props.field.name}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            <div className={styles.content}>
                {isEditing
                    ? (
                        <TextareaWithConfirmButton
                            defaultValue={props.field.content}
                            loading={confirmed}
                            rows={4}
                            onConfirm={handleConfirm}
                        />
                    )
                    : contentText()
                }
            </div>
        </div>
    )
}

export default LongTextField