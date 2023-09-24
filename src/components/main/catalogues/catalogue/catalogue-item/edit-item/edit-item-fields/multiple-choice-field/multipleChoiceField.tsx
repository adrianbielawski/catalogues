import { useCallback, useMemo, useState } from 'react'
import styles from './multipleChoiceField.module.scss'
import {
  AuthUserChoiceFieldData,
  DeserializedField,
  DeserializedItemField,
} from 'src/globalTypes'
import { fieldChoicesSelector } from 'store/selectors'
import { useTypedSelector } from 'store/storeConfig'
import ChoiceList, {
  MultipleChoiceOnChange,
} from 'components/global-components/choice-list/choiceList'
import AddChoice from 'components/global-components/add-choice/addChoice'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedItemField<MultipleChoiceOnChange>
  fieldData: AuthUserChoiceFieldData
  onChange: (value: number[] | null) => void
}

const MultipleChoiceField = ({
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
    (selected: MultipleChoiceOnChange) => {
      onChange(selected as number[] | null)
    },
    [onChange],
  )

  const getValue = useCallback(() => {
    if (fieldValue?.value == null) {
      return
    }
    const values = fieldValue.value.map(
      (id) => fieldChoices.find((c) => c.id === id)?.value,
    )
    return values.join(', ')
  }, [fieldValue?.value, fieldChoices])

  const content = useMemo(
    () =>
      isEditing ? (
        <>
          <ChoiceList
            className={styles.choiceList}
            choices={fieldChoices}
            defaultSortDir="asc"
            defaultSearchValue=""
            selected={(fieldValue?.value as number[]) || []}
            multiple={true}
            onChange={handleChange}
          />
          <AddChoice field={field} fieldData={fieldData} />
        </>
      ) : (
        getValue()
      ),
    [
      isEditing,
      field,
      fieldData,
      fieldValue?.value,
      fieldChoices,
      handleChange,
      getValue,
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

export default MultipleChoiceField
