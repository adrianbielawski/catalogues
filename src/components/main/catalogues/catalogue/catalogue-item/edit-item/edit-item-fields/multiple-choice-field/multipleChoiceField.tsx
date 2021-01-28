import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { fetchFieldsChoices } from 'store/actions/cataloguesActions'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import MultipleChoiceList from 'components/global-components/multiple-choice-list/multipleChoiceList'

interface Props {
    itemId: number | string,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        setIsEditing(!isEditing)
        if (isEditing) {
            setSelected(props.selected)
        }
    }

    const getSelectedIds = () => {
        const selectedValues = props.fieldValue?.value as string[] || []

        return props.field.choices.filter(ch =>
            selectedValues.includes(ch.value)
        ).map(s => s.id)
    }

    const getChoices = () => {
        if (props.fieldValue?.value.length) {
            return (props.fieldValue?.value as string[]).join(', ')
        } else {
            return ''
        }
    }

    const fieldClass = cx(
        'multipleChoiceField',
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
                        <MultipleChoiceList
                            choices={props.field.choices}
                            selected={getSelectedIds()}
                            onChange={handleChange}
                        />
                    )
                    : getChoices()
                }
            </div>
        </li>
    )
}

export default SingleChoiceField