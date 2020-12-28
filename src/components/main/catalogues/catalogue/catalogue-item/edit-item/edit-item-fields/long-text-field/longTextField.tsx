import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './longTextField.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'


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
    const screenWidth = window.innerWidth

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
            <div className={styles.nameWrapper}>
                <TransparentButton className={editButtonClass} onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                </TransparentButton>
                <p className={styles.name}>
                    {props.field.name}:
                </p>
            </div>
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