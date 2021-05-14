import React, { useState } from 'react'
import styles from './textField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue?: DeserializedItemField<string>,
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
            value: input.length > 0 ? input : null,
        }))
        setIsEditing(false)
    }

    const inputProps = {
        defaultValue: props.fieldValue?.value as string || ''
    }
    
    const content = isEditing ? (
        <InputWithConfirmButton
            className={styles.input}
            inputProps={inputProps}
            onConfirm={handleConfirm}
        />
    ) : props.fieldValue?.value

    return (
        <EditableField
            title={props.field.name}
            isEditing={isEditing}
            onEditClick={handleEdit}
            content={content}
        />
    )
}

export default TextField