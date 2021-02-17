import React, { useState, useEffect } from 'react'
import styles from './editableField.scss'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props {
    id: number | string,
    title: string,
    content: string[],
    isEditing: boolean,
    isSubmitting: boolean,
    hiddenContent?: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    onEditClick: (id: number | string) => void,
    onConfirm: (input: string[]) => void,
}

const EditableField = (props: Props) => {
    const delayCompleated = useDelay(props.isSubmitting)
    const [inputCount, setInputCount] = useState(0)
    const [userInput, setUserInput] = useState<string[]>([])

    useEffect(() => {
        if (!props.isEditing) {
            setUserInput([])
            setInputCount(0)
        }
    }, [props.isEditing])

    const handleEdit = () => {
        props.onEditClick(props.id)
    }

    const handleConfirm = (input: string) => {
        if (props.content.length - 1 > inputCount) {
            setUserInput([...userInput, input])
            setInputCount(inputCount + 1)
        } else {
            props.onConfirm!([...userInput, input])
        }
    }

    const getField = () => {
        if (props.isEditing && props.onConfirm !== undefined) {
            const value = !props.hiddenContent ? props.content[inputCount] : ''
            return (
                <InputWithConfirmButton
                    defaultValue={value}
                    loading={delayCompleated}
                    {...props.inputProps}
                    autoFocus
                    onConfirm={handleConfirm}
                    key={inputCount}
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