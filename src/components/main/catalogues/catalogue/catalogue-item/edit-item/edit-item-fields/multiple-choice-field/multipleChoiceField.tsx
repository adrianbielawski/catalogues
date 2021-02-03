import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { changeItemFieldValue, fetchFieldsChoices } from 'store/actions/cataloguesActions'
import { fieldSelector } from 'store/selectors'
import { useTypedSelector } from 'store/reducers'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import MultipleChoiceList from 'components/global-components/multiple-choice-list/multipleChoiceList'
import Loader from 'components/global-components/loader/loader'

interface Props {
    itemId: number | string,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (selected: DeserializedChoice[]) => {
        const selectedChoices = selected.map(s => s.value)

        dispatch(changeItemFieldValue(
            props.field.catalogueId,
            props.itemId,
            props.field.id,
            selectedChoices,
        ))
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
            : null
    )
}

export default SingleChoiceField