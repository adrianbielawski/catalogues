import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { fetchFieldsChoices } from 'store/actions/cataloguesActions'
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
    const [isEditing, setIsEditing] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [selectedId, setSelectedId] = useState<string>('222')
    const selectedIndex = props.field.choices.findIndex(choice => choice.id === selectedId)

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (id: string) => {
        setSelectedId(id)
    }

    const handleConfirm = () => {
        setConfirmed(true)
        Promise.resolve(
            props.onEditConfirm(props.field.id, selectedId)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
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