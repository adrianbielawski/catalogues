import { useState } from 'react'
import styles from './editTextField.module.scss'
// Redux
import {
  CHANGE_FIELD_NAME,
  CHANGE_FIELD_PUBLIC,
  DELETE_CATALOGUE_FIELD,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
// Types
import {
  type AuthUserTextFieldData,
  type DeserializedField,
} from 'src/globalTypes'
// Hooks
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
// Components
import Input from 'components/global-components/input/input'
import Button from 'components/global-components/button/button'
import ConfirmMessageModal from 'components/global-components/confirm-message-modal/confirmMessageModal'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

interface Props {
  field: DeserializedField
  fieldData: AuthUserTextFieldData
}

const EditTextField = (props: Props) => {
  const dispatch = useAppDispatch()
  const fields = useTypedSelector((state) => state.entities.fields.entities)
  const fieldsData = useTypedSelector(
    authUserFieldsDataSelector(props.field.catalogueId),
  )
  const [inputError, setInputError] = useState('')
  const [message, setMessage] = useState({ title: '', value: '' })

  const catalogueAndFieldId = {
    fieldId: props.field.id,
    catalogueId: props.field.catalogueId,
  }

  const validateInput = (name: string) => {
    let message = ''

    if (name.length < 1) {
      message = 'Minimum 1 characters'
    }

    fieldsData.forEach((f) => {
      if (fields[f.id]?.name.toLowerCase() === name.toLowerCase()) {
        message = `Field with name "${name}" already exists`
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
      value: `Are you sure you want to delete field ${props.field.name}?`,
    })
  }

  const handlePublicChange = () => {
    dispatch(
      CHANGE_FIELD_PUBLIC({
        catalogueId: props.field.catalogueId,
        fieldId: props.field.id,
        public: !props.field.public,
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
        defaultValue={props.field.name}
        className={styles.nameInput}
        minLength={1}
        invalidInputMessage={inputError}
        ref={nameInputRef}
      />
      <div className={styles.checkboxes}>
        <CheckBoxWithTitle
          id="public"
          title="Public"
          selected={props.field.public}
          onChange={handlePublicChange}
        />
      </div>
      <Button
        className={styles.deleteButton}
        disabled={props.fieldData.isDeleting}
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

export default EditTextField
