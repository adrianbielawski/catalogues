import React, { useState } from 'react'
import { orderBy } from 'lodash'
import classNames from 'classnames/bind'
import styles from './singleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Custom components
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import SearchBar from 'components/global-components/search-bar/searchBar'
import AddChoice from 'components/global-components/add-choice/addChoice'

interface Props {
    itemId: number | string,
    field: DeserializedChoiceField,
    fieldValue: DeserializedItemField,
}

const cx = classNames.bind(styles)

const SingleChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [choicesSortDir, setChoicesSortDir] = useState<'asc' | 'desc'>('asc')
    const [searchChoiceValue, setSearchChoiceValue] = useState('')
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (choice: DeserializedChoice) => {
        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: choice.value,
        }))
    }

    const handleSort = () => {
        let sort: 'asc' | 'desc' = 'asc'

        if (choicesSortDir === 'asc') {
            sort = 'desc'
        } else {
            sort = 'asc'
        }
        setChoicesSortDir(sort)
    }

    const handleSearch = (input: string) => {
        setSearchChoiceValue(input)
    }

    const filteredChoices = props.field.choices.filter(choice =>
        choice.value.toLowerCase().includes(searchChoiceValue.toLowerCase())
    )

    const sortedChoices = orderBy(
        filteredChoices,
        (c) => c.value.toLowerCase(),
        choicesSortDir
    )

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
                            <>
                                <SearchBar
                                    sortDir={choicesSortDir}
                                    onSort={handleSort}
                                    onSearch={handleSearch}
                                />
                                <SingleChoiceList
                                    choices={sortedChoices}
                                    selected={selected?.id}
                                    onChange={handleChange}
                                />
                                <AddChoice
                                    field={props.field}
                                />
                            </>
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