import React, { useState } from 'react'
//Custom components
import EditableField from 'components/global-components/editable-list/editable-field/editableField'

export interface Field {
    title: string,
    content: string[],
    hiddenContent?: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    onConfirm?: OnConfirm,
}

type FIELDS_TYPE = Field[]

type OnConfirm = (input: string[]) => void
export type Id = number | string | null

type Props = {
    className?: string,
    fields: FIELDS_TYPE,
}

const EditableList = (props: Props) => {
    const [editableFieldId, setEditableFieldId] = useState<Id>(null)

    const handleEditFieldClick = (id: Id) => {
        if (editableFieldId === id) {
            setEditableFieldId(null)
        } else {
            setEditableFieldId(id)
        }
    }

    const getFields = () => {
        return props.fields.map((field, i) => {
            const handleConfirm: OnConfirm = (input) => {
                return Promise.resolve(
                    field.onConfirm!(input)
                )
                    .then(() => {
                        setEditableFieldId(null)
                    })
            }
            return (
                <li key={i}>
                    <EditableField
                        id={i}
                        isEditing={editableFieldId === i}
                        title={field.title}
                        content={field.content}
                        inputProps={field.inputProps}
                        hiddenContent={field.hiddenContent || false}
                        onEditClick={handleEditFieldClick}
                        onConfirm={field.onConfirm && handleConfirm}
                    />
                </li>
            )
        })
    }

    return (
        <ul className={props.className}>
            {getFields()}
        </ul>
    )
}

export default EditableList