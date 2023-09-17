import { useState } from 'react'
import styles from './FieldNameInput.module.scss'
import { DeserializedField } from 'src/globalTypes'
import { CHANGE_FIELD_NAME } from 'store/modules/auth-user-catalogues/slice'
import { useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import Input from 'components/global-components/input/input'
import { useEntitiesSelector } from 'store/entities/hooks'

interface Props {
  field: DeserializedField
}

const FieldNameInput = ({ field }: Props) => {
  const fields = useEntitiesSelector('fields')
  const fieldsData = useTypedSelector(
    authUserFieldsDataSelector(field.catalogueId),
  )

  const [inputError, setInputError] = useState('')

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
        fieldId: field.id,
        catalogueId: field.catalogueId,
        name,
      }),
    500,
    validateInput,
  )

  return (
    <Input
      defaultValue={field.name}
      className={styles.nameInput}
      minLength={1}
      invalidInputMessage={inputError}
      ref={nameInputRef}
    />
  )
}

export default FieldNameInput
