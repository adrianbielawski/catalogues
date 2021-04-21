import React, { useState } from 'react'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldChoicesSelector } from 'store/selectors'
//Components
import AddChoice from 'components/global-components/add-choice/addChoice'
import ChoiceList from 'components/global-components/choice-list/choiceList'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue: DeserializedItemField,
}

const SingleChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const fieldChoices = useTypedSelector(fieldChoicesSelector(props.field.id))

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (choiceId: number | string) => {
        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: choiceId as number,
        }))
    }

    const selected = fieldChoices.filter(f => f.id === props.fieldValue?.value)[0]
    
    const content = isEditing ? (
        <>
            <ChoiceList
                className={styles.choiceList}
                choices={fieldChoices}
                defaultSortDir="asc"
                defaultSearchValue=""
                selected={props.fieldValue?.value as number}
                onChange={handleChange}
            />
            <AddChoice
                field={props.field}
            />
        </>
    ) : selected?.value

    return (
        <EditableField
            title={props.field.name}
            isEditing={isEditing}
            onEditClick={handleEdit}
            content={content}
        />
    )
}

export default SingleChoiceField