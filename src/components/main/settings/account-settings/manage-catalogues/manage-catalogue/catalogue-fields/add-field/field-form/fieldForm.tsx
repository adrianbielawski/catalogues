import React, { useRef, useState } from 'react'
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
import ChoiceList from 'components/global-components/choice-list/choiceList'
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
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [isNameEditing, setIsNameEditing] = useState(true)
    const [fieldType, setFieldType] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [formError, setFormError] = useState('')
    const [nameError, setNameError] = useState('')
    const delayCompleated = useDelay(catalogue.isSubmittingNewField)

    const handleEditName = () => {
        setIsNameEditing(!isNameEditing)
    }

    const validateName = (name: string) => {
        let error = null

        if (fields.find(field => field.name === name)) {
            error = `Field with name "${name}" already exists`
        }

        if (name.length < 1) {
            error = 'Minimum 1 characters'
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const { valid, error } = validateName(input)
        if (!valid) {
            setNameError(error!)
        } else {
            setNameError('')
        }
        setFieldName(input)
    }

    const handleTypeChange = (choiceId: string | number) => {
        setFieldType(choiceId as string)
    }

    const validateForm = () => {
        let error = null

        if (fieldName.length < 1) {
            error = 'Please add field name'
        }

        if (fieldType.length === 0) {
            error = "Please select field type"
        }

        if (fields.find(f => f.name === fieldName)) {
            error = `Field with name "${fieldName}" already exists`
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleConfirm = () => {
        const { valid, error } = validateForm()
        if (!valid) {
            setFormError(error!)
            return
        }
        
        setFieldType('')
        setFieldName('')
        nameInputRef.current!.value = ''

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
                    title="Field name"
                    content={fieldName}
                    isEditing={isNameEditing}
                    invalidInputMessage={nameError}
                    minLength={1}
                    autoFocus
                    ref={nameInputRef}
                    onEditClick={handleEditName}
                    onChange={handleNameChange}
                />
                <p className={styles.type}>Type:</p>
                <ChoiceList
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