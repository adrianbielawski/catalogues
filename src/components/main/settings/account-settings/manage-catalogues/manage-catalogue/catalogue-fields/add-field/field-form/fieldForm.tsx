import { useRef, useState, ChangeEvent, FC } from 'react'
import classNames from 'classnames/bind'
import styles from './fieldForm.module.scss'
import {
  CREATE_CATALOGUE_FIELD,
  TOGGLE_ADD_FIELD,
} from 'store/modules/auth-user-catalogues/slice'
import {
  authUserFieldsDataSelector,
  authUserCatalogueDataSelector,
} from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { useDelay } from 'src/hooks/useDelay'
import Input from 'components/global-components/input/input'
import ChoiceList, {
  Choice,
  SingleChoiceOnChange,
} from 'components/global-components/choice-list/choiceList'
import Button from 'components/global-components/button/button'
import MessageModal from 'components/global-components/message-modal/messageModal'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import { useEntitiesSelector } from 'store/entities/hooks'

const FIELD_TYPES: Choice[] = [
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
  {
    id: 'group',
    value: 'Group field',
  },
]

interface Props {
  active: boolean
  catalogueId: number
}

const cx = classNames.bind(styles)

const FieldForm: FC<Props> = ({ active, catalogueId }) => {
  const dispatch = useAppDispatch()

  const fields = useEntitiesSelector('fields')
  const fieldsData = useTypedSelector(authUserFieldsDataSelector(catalogueId))
  const catalogueData = useTypedSelector(
    authUserCatalogueDataSelector(catalogueId),
  )
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [fieldType, setFieldType] = useState<string | null>(null)
  const [fieldName, setFieldName] = useState('')
  const [formError, setFormError] = useState('')
  const [nameError, setNameError] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const delayCompleted = useDelay(catalogueData.isSubmittingNewField)

  const handlePublicChange = () => {
    setIsPublic(!isPublic)
  }

  const validateName = (name: string) => {
    let error = null

    fieldsData.forEach((f) => {
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setFieldType(choiceId as string | null)
  }

  const validateForm = () => {
    let error = null

    if (fieldName.length < 1) {
      error = 'Please add field name'
    }

    if (!fieldType?.length) {
      error = 'Please select field type'
    }

    fieldsData.forEach((f) => {
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

    dispatch(
      CREATE_CATALOGUE_FIELD({
        catalogueId,
        name: fieldName,
        type: fieldType!,
        position: fieldsData.length,
        public: isPublic,
        parentId: null,
      }),
    )
  }

  const clearFormError = () => {
    setFormError('')
  }

  const handleCancel = () => {
    dispatch(TOGGLE_ADD_FIELD(catalogueData.id))
  }

  const disabled =
    catalogueData.isSubmittingNewField ||
    nameError.length > 0 ||
    fieldName.length === 0 ||
    !fieldType ||
    fieldType?.length === 0

  const formClass = cx('fieldForm', {
    active,
  })

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
            loading={delayCompleted}
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
