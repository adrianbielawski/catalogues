import React, { useState } from 'react'
import styles from './textField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import Field from '../field/field'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue?: DeserializedItemField,
}

const TextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleConfirm = (input: string) => {
        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: input,
        }))
        setIsEditing(false)
    }

    const inputProps = {
        defaultValue: props.fieldValue?.value as string || ''
    }

    return (
        <Field
            className={styles.textField}
            fieldName={props.field.name}
            fieldValue={props.fieldValue?.value}
            isEditing={isEditing}
            editComponent={
                <InputWithConfirmButton
                    className={styles.input}
                    inputProps={inputProps}
                    onConfirm={handleConfirm}
                />
            }
            onEditClick={handleEdit}
        />
    )
}

export default TextField