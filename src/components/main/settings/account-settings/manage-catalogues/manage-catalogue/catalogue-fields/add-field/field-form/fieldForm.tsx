import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './fieldForm.scss'
//Redux
import { CREATE_CATALOGUE_FIELD, TOGGLE_ADD_FIELD } from 'store/modules/auth-user-catalogues/slice'
import { authUserFieldsDataSelector, authUserCatalogueDataSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Hooks
import { useDelay } from 'src/hooks/useDelay'
//Components
import Input from 'components/global-components/input/input'
import ChoiceList, { SingleChoiceOnChange } from 'components/global-components/choice-list/choiceList'
import Button from 'components/global-components/button/button'
import MessageModal from 'components/global-components/message-modal/messageModal'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

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
        id: 'date',
        value: 'Date',
    },
    {
        id: 'media',
        value: 'URL',
    },
    {
        id: 'geo_point',
        value: 'Location',
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
    const fields = useTypedSelector(state => state.entities.fields.entities)
    const fieldsData = useTypedSelector(authUserFieldsDataSelector(props.catalogueId))
    const catalogueData = useTypedSelector(authUserCatalogueDataSelector(props.catalogueId))
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [fieldType, setFieldType] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [formError, setFormError] = useState('')
    const [nameError, setNameError] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const delayCompleated = useDelay(catalogueData.isSubmittingNewField)

    const handlePublicChange = () => {
        setIsPublic(!isPublic)
    }

    const validateName = (name: string) => {
        let error = null

        fieldsData.forEach(f => {
            if (fields[f.id]?.name.toLowerCase() === name.toLowerCase()) {
                error = `Field with name "${name}" already exists`
            }
        })

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

    const handleTypeChange = (choiceId: SingleChoiceOnChange) => {
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

        fieldsData.forEach(f => {
            if (fields[f.id]?.name.toLowerCase() === fieldName.toLowerCase()) {
                    error = `Field with name "${fieldName}" already exists`
            }
        })

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
            position: fieldsData.length,
            public: isPublic,
        }))
    }

    const clearFormError = () => {
        setFormError('')
    }

    const handleCancel = () => {
        dispatch(TOGGLE_ADD_FIELD(catalogueData.id))
    }

    const disabled = catalogueData.isSubmittingNewField
        || nameError.length > 0
        || fieldName.length === 0
        || fieldType.length === 0

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
                <Input
                    placeholder="field name"
                    minLength={1}
                    invalidInputMessage={nameError}
                    autoFocus
                    ref={nameInputRef}
                    onChange={handleNameChange}
                />
                <div className={styles.checkboxes}>
                    <CheckBoxWithTitle
                        id="public"
                        title="Public"
                        selected={isPublic}
                        onChange={handlePublicChange}
                    />
                </div>
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
                        disabled={disabled}
                        onClick={handleConfirm}
                    >
                        Add field
                    </Button>
                    <Button
                        disabled={catalogueData.isSubmittingNewField}
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