import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { FETCH_FIELDS_CHOICES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
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
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

    useEffect(() => {
        dispatch(FETCH_FIELDS_CHOICES({
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
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
        !field.fetchingChoices ? (
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
            : null
    )
}

export default SingleChoiceField