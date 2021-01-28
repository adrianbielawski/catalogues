import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { changeItemFieldValue, fetchFieldsChoices } from 'store/actions/cataloguesActions'
//Custom components
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'

interface Props {
    itemId: number | string,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (choice: DeserializedChoice) => {
        dispatch(changeItemFieldValue(
            props.field.catalogueId,
            props.itemId,
            props.field.id,
            choice.value,
        ))
    }

    const fieldClass = cx(
        'singleChoiceField',
        {
            active: isEditing
        },
    )

    const contentClass = cx(
        'content',
        {
            active: isEditing
        },
    )

    const selected = props.field.choices.filter(f => f.value === props.fieldValue?.value)[0]

    return (
        <li className={fieldClass}>
            <EditableFieldTitle
                title={props.field.name}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            <div className={contentClass}>
                {isEditing
                    ? (
                        <SingleChoiceList
                            choices={props.field.choices}
                            selected={selected?.id}
                            onChange={handleChange}
                        />
                    )
                    : props.fieldValue?.value || ''
                }
            </div>
        </li>
    )
}

export default SingleChoiceField