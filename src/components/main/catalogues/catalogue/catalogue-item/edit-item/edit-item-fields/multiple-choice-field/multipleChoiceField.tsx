import React, { useState } from 'react'
import { orderBy } from 'lodash'
import classNames from 'classnames/bind'
import styles from './multipleChoiceField.scss'
//Types
import { DeserializedChoice, DeserializedChoiceField, DeserializedItemField } from 'src/globalTypes'
//Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { fieldSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import MultipleChoiceList from 'components/global-components/multiple-choice-list/multipleChoiceList'
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

    const handleChange = (selected: DeserializedChoice[]) => {
        const selectedChoices = selected.map(s => s.value)

        dispatch(CHANGE_ITEM_FIELD_VALUE({
            itemId: props.itemId,
            fieldId: props.field.id,
            value: selectedChoices,
        }))
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
                            <>
                                <SearchBar
                                    sortDir={choicesSortDir}
                                    onSort={handleSort}
                                    onSearch={handleSearch}
                                />
                                <MultipleChoiceList
                                    choices={sortedChoices}
                                    selected={getSelectedIds()}
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
            : null
    )
}

export default SingleChoiceField