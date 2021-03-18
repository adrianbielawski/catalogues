import React, { useState } from 'react'
import styles from './editTextField.scss'
//Redux
import { CHANGE_FIELD_NAME, CHANGE_FIELD_PUBLIC, DELETE_CATALOGUE_FIELD } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldsSelector } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom hooks
import { useDebouncedDispatch } from 'src/customHooks'
//Custom components
import Input from 'components/global-components/input/input'
import Button from 'components/global-components/button/button'
import ConfirmMessageModal from 'components/global-components/confirm-message-modal/confirmMessageModal'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

type Props = {
    field: DeserializedTextField,
}

const EditTextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const fields = useTypedSelector(fieldsSelector(props.field.catalogueId))
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedTextField
    const [inputError, setInputError] = useState('')
    const [message, setMessage] = useState({ title: '', value: '' })

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

    const handleDeleteField = () => {
        setMessage({
            title: 'Confirm delete',
            value: `Are you sure you want to delete field ${field.name}?`,
        })
    }

    const handlePublicChange = () => {
        dispatch(CHANGE_FIELD_PUBLIC({
            catalogueId: field.catalogueId,
            fieldId: field.id,
            public: !field.public,
        }))
    }

    const deleteField = () => {
        dispatch(DELETE_CATALOGUE_FIELD(catalogueAndFieldId))
    }

    const clearMessage = () => {
        setMessage({
            title: '',
            value: ``,
        })
    }

    return (
        <div className={styles.wrapper}>
            <Input
                defaultValue={props.field.name}
                className={styles.nameInput}
                minLength={1}
                invalidInputMessage={inputError}
                ref={nameInputRef}
            />
            <div className={styles.checkboxes}>
                <CheckBoxWithTitle
                    id="public"
                    title="Public"
                    selected={field.public}
                    onChange={handlePublicChange}
                />
            </div>
            <Button
                className={styles.deleteButton}
                disabled={field.isDeleting}
                onClick={handleDeleteField}
            >
                Delete field
            </Button>
            <ConfirmMessageModal
                show={message.value.length !== 0}
                title={message.title}
                message={message.value}
                onConfirm={deleteField}
                onCancel={clearMessage}
            />
        </div>
    )
}

export default EditTextField