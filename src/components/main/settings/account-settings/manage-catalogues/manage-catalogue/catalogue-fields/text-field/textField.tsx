import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Redux
import {
    CHANGE_FIELD_NAME, CLEAR_CHANGE_FIELD_NAME_ERROR, TOGGLE_FIELD_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldsSelector } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom hooks
import { useDebouncedDispatch } from 'src/customHooks'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Input from 'components/global-components/input/input'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    field: DeserializedTextField,
}

const cx = classNames.bind(styles)

const TextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const fields = useTypedSelector(fieldsSelector(props.field.catalogueId))
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedTextField
    const [inputError, setInputError] = useState('')

    const catalogueAndFieldId = {
        fieldId: props.field.id,
        catalogueId: props.field.catalogueId
    }

    const validateInput = (input: string) => {
        let message = ''

        if (input.length < 2) {
            message = 'Minimum 2 characters'
        }
        if (fields.find(f => f.name.toLowerCase() === input.toLowerCase() && f.id !== field.id)) {
            console.log(field.name)
            message = `Field with name "${input}" already exists`
        }

        setInputError(message)
        return message.length === 0
    }

    const nameInputRef = useDebouncedDispatch(
        name => CHANGE_FIELD_NAME({
            ...catalogueAndFieldId,
            name,
        }),
        500,
        validateInput,
    )

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_CHANGE_FIELD_NAME_ERROR(catalogueAndFieldId))
    }

    const error = field.changeNameError

    const fieldClass = cx(
        'field',
    )

    const buttonClass = cx(
        'button',
        {
            active: field.isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? (
                    <Input
                        defaultValue={props.field.name}
                        className={styles.nameInput}
                        minLength={2}
                        invalidInputMessage={inputError}
                        ref={nameInputRef}
                    />
                )
                : props.field.name
            }
            <MessageModal
                show={error.message.length !== 0}
                title={error.title}
                message={error.message}
                onConfirm={clearError}
            />
        </div>
    )
}

export default TextField