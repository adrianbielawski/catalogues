import React, { useState } from 'react'
import styles from './dateField.module.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import EditableField from 'components/global-components/editable-field/editableField'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue?: DeserializedItemField<string>,
}

const DateField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeFieldValue(e.target.value)
    }

    const handleClearValue = () => {
        changeFieldValue()
    }

    const changeFieldValue = (value?: string) => {
        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: value || null,
        }))
        setIsEditing(false)
    }

    const content = isEditing ? (
        <div className={styles.inputWrapper}>
            <input
                type="date"
                value={props.fieldValue?.value?.toString()}
                className={styles.input}
                onChange={handleInputChange}
            />
            <TransparentButton
                className={styles.button}
                onClick={handleClearValue}
            >
                <FontAwesomeIcon icon={faTimes} />
            </TransparentButton>
        </div>
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

export default DateField