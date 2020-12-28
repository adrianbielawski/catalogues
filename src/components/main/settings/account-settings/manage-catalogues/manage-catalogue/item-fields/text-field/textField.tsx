import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Types
import { TextFieldInterface } from '../itemFields'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

type Props = {
    field: TextFieldInterface,
    onEditConfirm: (input: string) => void,
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
            props.onEditConfirm(input)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    const fieldClass = cx(
        'field',
    )

    const buttonClass = cx(
        'button',
        {
            active: isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
                {isEditing
                    ? (
                        <InputWithConfirmButton
                            placeholder={props.field.name}
                            loading={confirmed}
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.field.name
                }
        </div>
    )
}

export default TextField