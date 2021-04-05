import React, { useState } from 'react'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { fieldSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom components
import ChoiceList from 'components/global-components/choice-list/choiceList'
import AddChoice from 'components/global-components/add-choice/addChoice'
import Field from '../field/field'

interface Props {
    itemId: number,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

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

    if (field.fetchingChoices) {
        return null
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
            }
            onEditClick={handleEdit}
        />
    )
}

export default MultipleChoiceField