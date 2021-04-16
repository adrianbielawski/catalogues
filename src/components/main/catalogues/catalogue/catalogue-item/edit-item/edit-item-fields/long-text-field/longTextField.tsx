import React, { useState } from 'react'
import styles from './longTextField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
import Field from '../field/field'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue?: DeserializedItemField,
}

const LongTextField = (props: Props) => {
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

    return (
        <Field
            className={styles.longTextField}
            fieldName={props.field.name}
            fieldValue={props.fieldValue?.value}
            isEditing={isEditing}
            editComponent={
                <TextareaWithConfirmButton
                    defaultValue={props.fieldValue?.value as string}
                    rows={4}
                    onConfirm={handleConfirm}
                />
            }
            onEditClick={handleEdit}
        />
    )
}

export default LongTextField