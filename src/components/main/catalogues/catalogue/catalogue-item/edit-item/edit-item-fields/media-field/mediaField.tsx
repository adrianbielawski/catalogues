import { useCallback, useMemo, useState } from 'react'
import {
  DeserializedField,
  DeserializedItemField,
  DeserializedMediaFieldValue,
} from 'src/globalTypes'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedItemField<DeserializedMediaFieldValue>
  onChange: (value: DeserializedMediaFieldValue | null) => void
}

const MediaField = ({ field, fieldValue, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleConfirm = useCallback(
    (input: string) => {
      onChange(input.length ? { url: input, type: 'link' } : null)
      setIsEditing(false)
    },
    [onChange],
  )

  const content = useMemo(
    () =>
      isEditing ? (
        <InputWithConfirmButton
          defaultValue={fieldValue?.value?.url ?? ''}
          type={'url'}
          onConfirm={handleConfirm}
        />
      ) : (
        fieldValue?.value?.url
      ),
    [isEditing, fieldValue?.value?.url, handleConfirm],
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

export default MediaField
