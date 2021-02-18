import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './fieldForm.scss'
//Redux
import { catalogueSelector, fieldsSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CREATE_CATALOGUE_FIELD, TOGGLE_ADD_FIELD } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'
import SingleChoiceList from 'components/global-components/single-choice-list/singleChoiceList'
import Button from 'components/global-components/button/button'
import MessageModal from 'components/global-components/message-modal/messageModal'

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
    const dispatch = useAppDispatch()
    const fields = useTypedSelector(fieldsSelector(props.catalogueId))
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const [isNameEditing, setIsNameEditing] = useState(true)
    const [fieldType, setFieldType] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [formError, setFormError] = useState('')
    const delayCompleated = useDelay(catalogue.isSubmittingNewField)

    const handleEditName = () => {
        setIsNameEditing(!isNameEditing)
    }

    const validateName = (name: string) => {
        let error = null
        
        if(fields.find(field => field.name === name)) {
            error = `Field ${name} already exist`
        }

        if(!name.length) {
            error = `Please add field name`
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleNameChange = (input: string[]) => {
        const { valid, error } = validateName(input[0])
        if (!valid) {
            setFormError(error!)
            return
        }
        setIsNameEditing(false)
        setFieldName(input[0])
    }

    const handleTypeChange = (choice: FieldType) => {
        setFieldType(choice.id)
    }

    const validateInput = () => {
        let error = null
        if (isNameEditing) {
            error = 'Please confirm field name'
        }

        if (fieldName.length === 0) {
            error = 'Please add field name'
        }

        if(fieldType.length === 0) {
            error = "Please select field type"
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleConfirm = () => {
        const { valid, error } = validateInput()
        if (!valid) {
            setFormError(error!)
            return
        }
        dispatch(CREATE_CATALOGUE_FIELD({
            catalogueId: props.catalogueId,
            name: fieldName,
            type: fieldType,
            position: fields.length
        }))
    }
    
    const clearFormError = () => {
        setFormError('')
    }

    const handleCancel = () => {
        dispatch(TOGGLE_ADD_FIELD(catalogue.id))
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
            <MessageModal
                show={formError.length !== 0}
                title={'Form error'}
                message={formError}
                onConfirm={clearFormError}
            />
        </div>
    )
}

export default FieldForm