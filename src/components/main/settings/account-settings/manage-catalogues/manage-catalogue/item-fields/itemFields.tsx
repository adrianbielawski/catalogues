import React from 'react'
//Types
import { Field } from 'components/global-components/editable-list/editableList'
//Custom components
import EditableList from 'components/global-components/editable-list/editableList'

const ItemFields = () => {
    const handleNameChange = () => {

    }

    const FIELDS: Field[] = [
        {
            title: "Field name",
            content: ['Id'],
        },
        {
            title: "Field name",
            content: ['Name'],
            inputProps: { minLength: 2 },
            onConfirm: handleNameChange,
        },
    ]

    return (
        <EditableList fields={FIELDS} />
    )
}

export default ItemFields