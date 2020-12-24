import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './editableField.scss'
//Types
import { Id } from '../editableList'
//Custom components
import Loader from 'components/global-components/loader/loader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

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
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputCount, setInputCount] = useState(0)
    const [userInput, setUserInput] = useState<string[]>([])
    const [confirmed, setConfirmed] = useState(false)

    const handleEdit = () => {
        props.onEditClick(props.id)
    }

    const handleConfirm = () => {
        if (props.content.length - 1 > inputCount) {
            setUserInput([...userInput, inputRef.current!.value])
            setInputCount(inputCount + 1)
            inputRef.current!.value = ''
        } else {
            setConfirmed(true)
            Promise.resolve(
                props.onConfirm!([...userInput, inputRef.current!.value])
            )
                .then(() => {
                    setConfirmed(false)
                    setUserInput([])
                    setInputCount(0)
                })
                .catch(() => setConfirmed(false))
        }
    }

    const cx = classNames.bind(styles)

    const getField = () => {
        if (props.isEditing && props.onConfirm !== undefined) {
            return (
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.content}
                        placeholder={props.content[inputCount]}
                        ref={inputRef}
                        {...props.inputProps}
                        autoFocus
                    />
                    {!confirmed
                        ? (
                            <TransparentButton
                                className={styles.confirmButton}
                                onClick={handleConfirm}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </TransparentButton>
                        )
                        : <Loader className={styles.loader} size={25} />
                    }
                </div>
            )
        } else {
            return (
                <p className={styles.content}>
                    {props.hiddenContent ? '****' : props.content[0]}
                </p>
            )
        }
    }

    const editButtonClass = cx(
        'editButton',
        {
            active: props.isEditing,
        },
    )

    return (
        <div className={styles.editableField}>
            {props.onConfirm !== undefined
                ? (
                    <TransparentButton className={editButtonClass} onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </TransparentButton>
                )
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