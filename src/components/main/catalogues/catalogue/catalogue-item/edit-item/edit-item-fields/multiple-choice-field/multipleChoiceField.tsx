import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { fieldSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import ChoiceList from 'components/global-components/choice-list/choiceList'
import AddChoice from 'components/global-components/add-choice/addChoice'

interface Props {
    itemId: number,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const cx = classNames.bind(styles)

const MultipleChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (selected: (number | string)[]) => {
        const selectedChoices = selected.map(s => s as number)

        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: selectedChoices,
        }))
    }

    const getChoices = () => {
        if (!props.fieldValue?.value) {
            return
        }
        const values = (props.fieldValue.value as number[]).map(id =>
            props.field.choices.find(c => c.id === id)?.value
        )
        return values.join(', ')
    }

    const fieldClass = cx(
        'multipleChoiceField',
        {
            active: isEditing
        },
    )

    if (field.fetchingChoices) {
        return null
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
                        <>
                            <ChoiceList
                                choices={field.choices}
                                defaultSortDir="asc"
                                defaultSearchValue=""
                                selected={props.fieldValue?.value as number[] || []}
                                multiple={true}
                                onChange={handleChange}
                            />
                            <AddChoice
                                field={props.field}
                            />
                        </>
                    )
                    : getChoices()
                }
            </div>
        </li>
    )
}

export default MultipleChoiceField