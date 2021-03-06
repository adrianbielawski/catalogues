import React, { useState } from 'react'
import styles from './longTextField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'

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
        <li className={styles.longTextField}>
            <EditableFieldTitle
                title={props.field.name}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            <div className={styles.content}>
                {isEditing
                    ? (
                        <TextareaWithConfirmButton
                            defaultValue={props.fieldValue?.value as string}
                            rows={4}
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.fieldValue?.value
                }
            </div>
        </li>
    )
}

export default LongTextField