import { useCallback, useMemo, useState } from 'react'
import styles from './singleChoiceField.module.scss'
import {
  type AuthUserChoiceFieldData,
  type DeserializedField,
  type DeserializedItemField,
} from 'src/globalTypes'
import { useTypedSelector } from 'store/storeConfig'
import { fieldChoicesSelector } from 'store/selectors'
import AddChoice from 'components/global-components/add-choice/addChoice'
import ChoiceList, {
  type SingleChoiceOnChange,
} from 'components/global-components/choice-list/choiceList'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue: DeserializedItemField<SingleChoiceOnChange>
  fieldData: AuthUserChoiceFieldData
  onChange: (value: SingleChoiceOnChange) => void
}

const SingleChoiceField = ({
  field,
  fieldValue,
  fieldData,
  onChange,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const fieldChoices = useTypedSelector(fieldChoicesSelector(field.id))

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleChange = useCallback(
    (choiceId: SingleChoiceOnChange) => {
      onChange(choiceId)
    },
    [onChange],
  )

  const content = useMemo(
    () =>
      isEditing ? (
        <>
          <ChoiceList
            className={styles.choiceList}
            choices={fieldChoices}
            defaultSortDir="asc"
            defaultSearchValue=""
            selected={fieldValue?.value}
            onChange={handleChange}
          />
          <AddChoice field={field} fieldData={fieldData} />
        </>
      ) : (
        fieldChoices.filter((f) => f.id === fieldValue?.value)[0]?.value
      ),
    [
      isEditing,
      fieldChoices,
      fieldValue?.value,
      field,
      fieldData,
      handleChange,
    ],
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

export default SingleChoiceField
