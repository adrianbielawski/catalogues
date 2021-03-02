import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import {
    CHANGE_FIELD_NAME, CLEAR_CHANGE_FIELD_NAME_ERROR, TOGGLE_FIELD_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldsSelector } from 'store/selectors'
//Custom hooks
import { useDebouncedDispatch } from 'src/customHooks'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    field: DeserializedChoiceField,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const fields = useTypedSelector(fieldsSelector(props.field.catalogueId))
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField
    const [inputError, setInputError] = useState('')

    const catalogueAndFieldId = {
        fieldId: props.field.id,
        catalogueId: props.field.catalogueId
    }

    const validateInput = (input: string) => {
        let message = ''

        if (input.length < 1) {
            message = 'Minimum 1 characters'
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

    const handleNameEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_CHANGE_FIELD_NAME_ERROR(catalogueAndFieldId))
    }

    const fieldClass = cx(
        'field',
        {
            active: field.isEditing,
        }
    )

    const buttonClass = cx(
        'editButton',
        {
            active: field.isEditing,
        }
    )

    const error = field.changeNameError

    if (field.fetchingChoices) {
        return null
    }

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleNameEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? (
                    <div>
                        <Input
                            defaultValue={props.field.name}
                            className={styles.nameInput}
                            minLength={1}
                            invalidInputMessage={inputError}
                            ref={nameInputRef}
                        />
                        <Choices
                            field={field}
                            className={styles.choices}
                        />
                    </div>
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

export default ChoiceField
