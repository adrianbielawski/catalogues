import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './editableField.scss'
//Types
import { Id } from '../editableList'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

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

    const cx = classNames.bind(styles)

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
            <div className={styles.content}>
                {getField()}
            </div>
        </div>
    )
}

export default EditableField