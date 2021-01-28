import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
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

const cx = classNames.bind(styles)

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

    const fieldClass = cx(
        'longTextField',
        {
            active: isEditing
        },
    )

    const getValue = () => {
        if (props.fieldValue === undefined) {
            return
        } else if (props.fieldValue.value.length > 40) {
            return `${props.fieldValue.value.slice(0, 40)}...`
        } else {
            return props.fieldValue.value
        }
    }

    return (
        <li className={fieldClass}>
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
                    : getValue()
                }
            </div>
        </li>
    )
}

export default LongTextField