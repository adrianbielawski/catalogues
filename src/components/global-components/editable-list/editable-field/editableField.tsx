import React, { useState } from 'react'
import styles from './editableField.scss'
//Types
import { Id } from '../editableList'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props {
    id: Id,
    title: string,
    content: string[],
    hiddenContent?: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    isEditing: boolean,
    onEditClick: (id: Id) => void,
    onConfirm?: (input: string[]) => void
}

const EditableField = (props: Props) => {
    const [inputCount, setInputCount] = useState(0)
    const [userInput, setUserInput] = useState<string[]>([])
    const [confirmed, setConfirmed] = useState(false)

    const handleEdit = () => {
        props.onEditClick(props.id)
    }

    const handleConfirm = (input: string) => {
        if (props.content.length - 1 > inputCount) {
            setUserInput([...userInput, input])
            setInputCount(inputCount + 1)
        } else {
            setConfirmed(true)
            Promise.resolve(
                props.onConfirm!([...userInput, input])
            )
                .then(() => {
                    setConfirmed(false)
                    setUserInput([])
                    setInputCount(0)
                })
                .catch(() => setConfirmed(false))
        }
    }

    const getField = () => {
        if (props.isEditing && props.onConfirm !== undefined) {
            return (
                <InputWithConfirmButton
                    placeholder={props.content[inputCount]}
                    loading={confirmed}
                    {...props.inputProps}
                    autoFocus
                    onConfirm={handleConfirm}
                />
            )
        } else {
            return props.hiddenContent ? '****' : props.content[0]
        }
    }

    return (
        <div className={styles.editableField}>
            {props.onConfirm !== undefined
                ? (
                    <EditableFieldTitle
                        title={props.title}
                        isEditing={props.isEditing}
                        onEdit={handleEdit}
                    />
                )
                : (
                <p className={styles.title}>{props.title}:</p>
                )
            }
            < div className={styles.content}>
                {getField()}
            </div>
        </div >
    )
}

export default EditableField