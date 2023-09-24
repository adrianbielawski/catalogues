import { useCallback, useMemo, useState } from 'react'
import styles from './longTextField.module.scss'
import {
  type DeserializedField,
  type DeserializedItemField,
} from 'src/globalTypes'
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedItemField<string>
  onChange: (value: string | null) => void
}

const LongTextField = ({ field, fieldValue, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleConfirm = useCallback(
    (input: string) => {
      onChange(input.length ? input : null)
      setIsEditing(false)
    },
    [onChange],
  )

  const content = useMemo(
    () =>
      isEditing ? (
        <TextareaWithConfirmButton
          className={styles.textarea}
          defaultValue={fieldValue?.value}
          rows={4}
          onConfirm={handleConfirm}
        />
      ) : (
        fieldValue?.value
      ),
    [isEditing, fieldValue?.value, handleConfirm],
  )

  return (
    <EditableField
      title={field.name}
      isEditing={isEditing}
      onEditClick={handleEdit}
      content={content}
    />
  )
}

export default LongTextField
