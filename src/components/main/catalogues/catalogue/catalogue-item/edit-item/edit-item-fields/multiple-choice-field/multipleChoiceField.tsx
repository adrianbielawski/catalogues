import React, { useState } from 'react'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { fieldChoicesSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import ChoiceList from 'components/global-components/choice-list/choiceList'
import AddChoice from 'components/global-components/add-choice/addChoice'
import Field from '../field/field'

interface Props {
    itemId: number,
    field: DeserializedField,
    fieldValue: DeserializedItemField,
}

const MultipleChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const fieldChoices = useTypedSelector(fieldChoicesSelector(props.field.id))

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
            fieldChoices.find(c => c.id === id)?.value
        )
        return values.join(', ')
    }

    return (
        <Field
            className={styles.multipleChoiceField}
            fieldName={props.field.name}
            fieldValue={getChoices()}
            isEditing={isEditing}
            editComponent={
                <>
                    <ChoiceList
                        className={styles.choiceList}
                        choices={fieldChoices}
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
            }
            onEditClick={handleEdit}
        />
    )
}

export default MultipleChoiceField