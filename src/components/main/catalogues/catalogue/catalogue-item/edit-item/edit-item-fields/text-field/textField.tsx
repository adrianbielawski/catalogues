import { useCallback, useMemo, useState } from 'react'
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedItemField<string>
  onChange: (value: string | null) => void
}

const TextField = ({ field, fieldValue, onChange }: Props) => {
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
        <InputWithConfirmButton
          defaultValue={fieldValue?.value ?? ''}
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

export default TextField
