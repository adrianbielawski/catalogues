import { useState, ChangeEvent, useCallback, useMemo } from 'react'
import styles from './dateField.module.scss'
import { DeserializedField, DeserializedItemField } from 'src/globalTypes'
import EditableField from 'components/global-components/editable-field/editableField'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedItemField<string>
  onChange: (value: string | null) => void
}

const DateField = ({ field, fieldValue, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const changeFieldValue = useCallback(
    (value?: string) => {
      onChange(value ?? null)
      setIsEditing(false)
    },
    [onChange],
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changeFieldValue(e.target.value)
    },
    [changeFieldValue],
  )

  const handleClearValue = useCallback(() => {
    changeFieldValue()
  }, [changeFieldValue])

  const content = useMemo(
    () =>
      isEditing ? (
        <div className={styles.inputWrapper}>
          <input
            type="date"
            value={fieldValue?.value?.toString()}
            className={styles.input}
            onChange={handleInputChange}
          />
          <TransparentButton
            className={styles.button}
            onClick={handleClearValue}
          >
            <FontAwesomeIcon icon={faTimes} />
          </TransparentButton>
        </div>
      ) : (
        fieldValue?.value
      ),
    [isEditing, fieldValue?.value, handleInputChange, handleClearValue],
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

export default DateField
