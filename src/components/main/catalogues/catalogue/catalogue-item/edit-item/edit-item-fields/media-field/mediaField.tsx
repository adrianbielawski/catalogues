import React, { useState } from 'react'
import styles from './mediaField.scss'
//Types
import { DeserializedField, DeserializedItemField, DeserializedMediaFieldValue } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue?: DeserializedItemField<DeserializedMediaFieldValue>,
}

const MediaField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleConfirm = (input: string) => {
        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: input.length > 0 ? {
                url: input,
                type: '',
                service: '',
                id: '',
                title: '',
                thumbnailUrl: '',
            } : null,
        }))
        setIsEditing(false)
    }

    const inputProps = {
        defaultValue: props.fieldValue?.value.url || ''
    }

    const content = isEditing ? (
        <InputWithConfirmButton
            type="url"
            className={styles.input}
            inputProps={inputProps}
            onConfirm={handleConfirm}
        />
    ) : props.fieldValue?.value.url

    return (
        <EditableField
            title={props.field.name}
            isEditing={isEditing}
            onEditClick={handleEdit}
            content={content}
        />
    )
}

export default MediaField