import { useState } from 'react'
import styles from './editChoiceField.module.scss'
import {
  type AuthUserChoiceFieldData,
  type DeserializedField,
} from 'src/globalTypes'
import {
  CHANGE_FIELD_NAME,
  CHANGE_FIELD_PUBLIC,
  DELETE_CATALOGUE_FIELD,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'
import Button from 'components/global-components/button/button'
import ConfirmMessageModal from 'components/global-components/confirm-message-modal/confirmMessageModal'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import { useEntitiesSelector } from 'store/entities/hooks'

interface Props {
  field: DeserializedField
  fieldData: AuthUserChoiceFieldData
}

const EditChoiceField = ({ field, fieldData }: Props) => {
  const dispatch = useAppDispatch()

  const fields = useEntitiesSelector('fields')
  const fieldsData = useTypedSelector(
    authUserFieldsDataSelector(field.catalogueId),
  )

  const [inputError, setInputError] = useState('')
  const [message, setMessage] = useState({ title: '', value: '' })

  const catalogueAndFieldId = {
    fieldId: field.id,
    catalogueId: field.catalogueId,
    parentFieldId: field.parentId,
  }

  const validateInput = (name: string) => {
    let message = ''

    if (name.length < 1) {
      message = 'Minimum 1 characters'
    }

    fieldsData.forEach((f) => {
      if (fields[f.id]?.name.toLowerCase() === name.toLowerCase()) {
        message = `Catalogue with name "${name}" already exists`
      }
    })

    setInputError(message)
    return message.length === 0
  }

  const nameInputRef = useDebouncedDispatch(
    (name) =>
      CHANGE_FIELD_NAME({
        ...catalogueAndFieldId,
        name,
      }),
    500,
    validateInput,
  )

  const handleDeleteField = () => {
    setMessage({
      title: 'Confirm delete',
      value: `Are you sure you want to delete ${field.name} field?`,
    })
  }

  const handlePublicChange = () => {
    dispatch(
      CHANGE_FIELD_PUBLIC({
        ...catalogueAndFieldId,
        public: !field.public,
      }),
    )
  }

  const deleteField = () => {
    dispatch(DELETE_CATALOGUE_FIELD(catalogueAndFieldId))
  }

  const clearMessage = () => {
    setMessage({
      title: '',
      value: '',
    })
  }

  return (
    <div className={styles.wrapper}>
      <Input
        defaultValue={field.name}
        className={styles.nameInput}
        minLength={1}
        invalidInputMessage={inputError}
        ref={nameInputRef}
      />
      <div className={styles.checkboxes}>
        <CheckBoxWithTitle
          id="public"
          title="Public"
          selected={field.public}
          onChange={handlePublicChange}
        />
      </div>
      <Choices
        field={field}
        choices={fieldData.choices}
        className={styles.choices}
        fieldData={fieldData}
      />
      <Button
        className={styles.deleteButton}
        disabled={fieldData.isDeleting}
        onClick={handleDeleteField}
      >
        Delete field
      </Button>
      <ConfirmMessageModal
        show={message.value.length !== 0}
        title={message.title}
        message={message.value}
        onConfirm={deleteField}
        onCancel={clearMessage}
      />
    </div>
  )
}

export default EditChoiceField
