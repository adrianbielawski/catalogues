import React, { useState } from 'react'
import styles from './editChoiceField.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { CHANGE_FIELD_NAME } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldsSelector } from 'store/selectors'
//Custom hooks
import { useDebouncedDispatch } from 'src/customHooks'
//Custom components
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'

type Props = {
    field: DeserializedChoiceField,
}

const EditChoiceField = (props: Props) => {
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

    return (
        <div className={styles.wrapper}>
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
}

export default EditChoiceField
