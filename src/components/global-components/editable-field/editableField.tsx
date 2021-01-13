import React, { useState, useEffect, useRef } from 'react'
import styles from './editableField.scss'
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
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const [inputCount, setInputCount] = useState(0)
    const [userInput, setUserInput] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!props.isEditing) {
            setUserInput([])
            setInputCount(0)
        }
    }, [props.isEditing])

    useEffect(() => {
        if (props.isSubmitting) {
            timeout.current = setTimeout(() => {
                setIsSubmitting(true)
            }, 200)
        } else if (!props.isSubmitting && timeout.current) {
            clearTimeout(timeout.current)
            setIsSubmitting(false)
        }
    }, [props.isSubmitting])

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
            return (
                <InputWithConfirmButton
                    placeholder={props.content[inputCount]}
                    loading={isSubmitting}
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