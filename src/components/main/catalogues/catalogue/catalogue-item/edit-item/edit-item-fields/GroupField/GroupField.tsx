import { useCallback, useMemo, useState } from 'react'
import {
  DeserializedItem,
  AuthUserGroupFieldData,
  DeserializedField,
  DeserializedItemField,
  AuthUserFieldData,
  DeserializedGroupFieldValue,
} from 'src/globalTypes'
import EditableField from 'components/global-components/editable-field/editableField'
import EditItemFields from '../editItemFields'
import AddButton from 'components/global-components/add-button/addButton'
import styles from './GroupField.module.scss'
import pluralize from 'pluralize'

export type OnAddValue = (
  value: Array<DeserializedItemField<undefined>>,
) => void

interface GroupFieldProps {
  item: DeserializedItem
  field: DeserializedField
  fieldValue: DeserializedItemField<DeserializedGroupFieldValue>
  fieldData: AuthUserGroupFieldData
  fieldsData: AuthUserFieldData[]
  onAddValue: OnAddValue
}

const GroupField = ({
  item,
  field,
  fieldValue,
  fieldData,
  fieldsData,
  onAddValue,
}: GroupFieldProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleAddButtonClick = useCallback(() => {
    const value = fieldData.children.map((id) => ({
      itemId: item.id,
      fieldId: id,
      value: undefined,
    }))

    onAddValue(value)
  }, [fieldData.children, item.id, onAddValue])

  const editContent = useMemo(
    () => (
      <ul className={styles.groupField}>
        {fieldValue?.value.map((_, i) => (
          <li key={i} className={styles.row}>
            <EditItemFields
              item={item}
              parentFieldId={field.id}
              fieldsData={fieldsData}
              childIndex={i}
            />
          </li>
        ))}
        <AddButton
          text={`Add to ${field.name}`}
          className={styles.addValueButton}
          onClick={handleAddButtonClick}
        />
      </ul>
    ),
    [fieldValue?.value, item, field, fieldsData, handleAddButtonClick],
  )

  const countText = useMemo(
    () =>
      `${fieldValue?.value.length ?? 0} ${pluralize(
        'item',
        fieldValue?.value.length,
      )}`,
    [fieldValue?.value.length],
  )

  const content = isEditing ? editContent : countText

  return (
    <EditableField
      title={field.name}
      isEditing={isEditing}
      onEditClick={toggleEdit}
      content={content}
    />
  )
}

export default GroupField
