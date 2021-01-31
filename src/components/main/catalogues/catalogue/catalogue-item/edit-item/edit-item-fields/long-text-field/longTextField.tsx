import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './longTextField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { changeItemFieldValue } from 'store/actions/cataloguesActions'
//Custom components
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'

interface Props {
    itemId: number | string,
    field: DeserializedField,
    fieldValue?: DeserializedItemField,
}

const LongTextField = (props: Props) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleConfirm = (input: string) => {
        dispatch(changeItemFieldValue(
            props.field.catalogueId,
            props.itemId,
            props.field.id,
            input
        ))
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
                            defaultValue={props.fieldValue?.value}
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