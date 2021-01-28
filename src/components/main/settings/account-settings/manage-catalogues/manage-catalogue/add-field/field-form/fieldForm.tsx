import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './fieldForm.scss'
//Redux
import { catalogueSelector, fieldsSelector } from 'store/selectors'
import { useTypedSelector } from 'store/reducers'
import { createCatalogueField, toggleAddField } from 'store/actions/settingsActions'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import Button from 'components/global-components/button/button'

interface FieldType {
    id: string,
    value: string,
}

const FIELD_TYPES = [
    {
        id: 'short_text',
        value: 'Short text',
    },
    {
        id: 'long_text',
        value: 'Long text',
    },
    {
        id: 'single_choice',
        value: 'Single choice',
    },
    {
        id: 'multiple_choice',
        value: 'Multiple choice',
    },
]

type Props = {
    active: boolean,
    catalogueId: number,
}

const cx = classNames.bind(styles)

const FieldForm = (props: Props) => {
    const dispatch = useDispatch()
    const fields = useTypedSelector(fieldsSelector(props.catalogueId))
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const [isNameEditing, setIsNameEditing] = useState(true)
    const [fieldType, setFieldType] = useState<string>('')
    const [fieldName, setFieldName] = useState('')
    const delayCompleated = useDelay(catalogue.isSubmittingNewField)

    const handleEditName = () => {
        setIsNameEditing(!isNameEditing)
    }

    const handleNameChange = (input: string[]) => {
        setIsNameEditing(false)
        setFieldName(input[0])
    }

    const handleTypeChange = (choice: FieldType) => {
        setFieldType(choice.id)
    }

    const handleConfirm = () => {
        dispatch(createCatalogueField(props.catalogueId, fieldName, fieldType, fields.length))
    }

    const handleCancel = () => {
        dispatch(toggleAddField(catalogue.id))
    }

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
                    content={[fieldName]}
                    isEditing={isNameEditing}
                    isSubmitting={false}
                    inputProps={{ minLength: 1, autoFocus: true }}
                    onEditClick={handleEditName}
                    onConfirm={handleNameChange}
                />
                <p className={styles.type}>Type:</p>
                <SingleChoiceList
                    className={styles.typeList}
                    choices={FIELD_TYPES}
                    selected={fieldType}
                    onChange={handleTypeChange}
                />
                <div className={styles.buttons}>
                    <Button
                        loading={delayCompleated}
                        disabled={catalogue.isSubmittingNewField}
                        onClick={handleConfirm}
                    >
                        Add field
                    </Button>
                    <Button
                        disabled={catalogue.isSubmittingNewField}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FieldForm