import React, { useState } from 'react'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Custom components
import AddChoice from 'components/global-components/add-choice/addChoice'
import ChoiceList from 'components/global-components/choice-list/choiceList'
import Field from '../field/field'

interface Props {
    itemId: number,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const SingleChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

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

    const selected = props.field.choices.filter(f => f.id === props.fieldValue?.value)[0]

    if (field.fetchingChoices) {
        return null
    }

    return (
        <Field
            className={styles.singleChoiceField}
            fieldName={props.field.name}
            fieldValue={selected?.value}
            isEditing={isEditing}
            editComponent={
                <>
                    <ChoiceList
                        className={styles.choiceList}
                        choices={field.choices}
                        defaultSortDir="asc"
                        defaultSearchValue=""
                        selected={props.fieldValue?.value as number}
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

export default SingleChoiceField