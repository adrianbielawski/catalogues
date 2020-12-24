import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './fieldForm.scss'
//Custom components
import EditableField from 'components/global-components/editable-list/editable-field/editableField'
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import Button from 'components/global-components/button/button'

type Props = {
    active: boolean,
    onConfirm: () => void,
    onCancel: () => void,
}

const cx = classNames.bind(styles)

const FieldForm = (props: Props) => {
    const [isNameEditing, setIsNameEditing] = useState(false)
    const [fieldType, setFieldType] = useState<string | null>(null)
    const [fieldName, setFieldName] = useState('')

    const handleEditName = () => {
        setIsNameEditing(!isNameEditing)
    }

    const handleNameChange = (input: string[]) => {
        setIsNameEditing(false)
        setFieldName(input[0])
    }

    const handleTypeChange = (id: string) => {
        setFieldType(id)
    }

    const handleConfirm = () => {
        console.log(fieldName, fieldType)
        props.onConfirm()
    }

    const handleCancel = () => {
        setFieldName('')
        setFieldType(null)
        props.onCancel()
    }

    const TYPES = [
        {
            id: '1',
            title: 'Short text',
        },
        {
            id: '2',
            title: 'Long text',
        },
        {
            id: '3',
            title: 'Single choice',
        },
        {
            id: '4',
            title: 'Multiple choice',
        },
    ]

    const formClass = cx(
        'fieldForm',
        {
            active: props.active,
        },
    )

    return (
        <div className={formClass}>
            <p className={styles.title}>New field form</p>
            <div className={styles.wrapper}>
                <EditableField
                    id={`addField`}
                    title="New field name"
                    content={[`${fieldName || 'Field name'}`]}
                    isEditing={isNameEditing}
                    inputProps={{ minLength: 2 }}
                    onEditClick={handleEditName}
                    onConfirm={handleNameChange}
                />
                <p className={styles.type}>Type:</p>
                <SingleChoiceList
                    className={styles.typeList}
                    choices={TYPES}
                    selected={fieldType}
                    onChange={handleTypeChange}
                />
                <div className={styles.buttons}>
                    <Button onClick={handleConfirm}>
                        Add field
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FieldForm