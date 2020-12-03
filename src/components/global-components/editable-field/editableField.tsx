import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './editableField.scss'
//Custom components
import EditButton from 'components/global-components/edit-button/editButton'
import ConfirmButton from 'components/global-components/confirm-button/confirmButton'

interface Props {
    id: number,
    title: string,
    content: string[],
    editMode: boolean,
    hidden?: boolean,
    onEditClick: (id: number | null) => void,
    onConfirm?: (input: string[]) => void
}

const EditableField = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputCount, setInputCount] = useState(0)
    const [userInput, setUserInput] = useState<string[]>([])

    const handleEdit = () => {
        props.onEditClick(props.id)
    }

    const handleConfirm = () => {
        if (props.content.length - 1 > inputCount) {
            setUserInput([...userInput, inputRef.current!.value])
            setInputCount(inputCount + 1)
            inputRef.current!.value = ''
        } else {
            setUserInput([])
            setInputCount(0)
            props.onConfirm!([...userInput, inputRef.current!.value])
        }
    }

    const cx = classNames.bind(styles)

    const getField = () => {
        if (props.editMode && props.onConfirm !== undefined) {
            return (
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.content}
                        placeholder={props.content[inputCount]}
                        ref={inputRef}
                        autoFocus
                    />
                    <ConfirmButton
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                    />
                </div>
            )
        } else {
            return (
                <p className={styles.content}>
                    {props.hidden ? '****' : props.content[0]}
                </p>
            )
        }
    }

    const editButtonClass = cx(
        'editButton',
        {
            active: props.editMode,
        },
    )

    return (
        <div className={styles.editableField}>
            {props.onConfirm !== undefined
                ? <EditButton className={editButtonClass} onClick={handleEdit} />
                : <div className={styles.placeholder}></div>
            }
            <p className={styles.title}>
                {props.title}:
            </p>
            <div className={styles.field}>
                {getField()}
            </div>
        </div>
    )
}

export default EditableField