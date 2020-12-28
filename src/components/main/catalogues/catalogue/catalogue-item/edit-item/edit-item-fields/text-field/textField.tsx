import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'


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

    const editButtonClass = cx(
        'editButton',
        {
            active: isEditing,
        },
    )

    const getInput = () => {
        if (props.field.type === 'short text') {
            return (
                <InputWithConfirmButton
                    placeholder={props.field.content}
                    loading={confirmed}
                    autoFocus
                    type="text"
                    onConfirm={handleConfirm}
                />
            )
        } else {
            return <></>
        }
    }

    return (
        <div className={styles.textField}>
            <TransparentButton className={editButtonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            <p className={styles.name}>
                {props.field.name}:
            </p>
            <div className={styles.content}>
                {isEditing
                    ? getInput()
                    : props.field.content
                }
            </div>
        </div>
    )
}

export default TextField