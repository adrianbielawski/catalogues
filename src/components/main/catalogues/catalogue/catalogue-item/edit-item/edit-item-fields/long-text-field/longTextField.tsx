import { useState } from 'react'
import styles from './longTextField.module.scss'
// Types
import {
  type DeserializedField,
  type DeserializedItemField,
} from 'src/globalTypes'
// Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
// Components
import TextareaWithConfirmButton from 'components/global-components/textarea-with-confirm-button/textareaWithConfirmButton'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  itemId: number
  field: DeserializedField
  fieldValue?: DeserializedItemField<string>
}

const LongTextField = (props: Props) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleConfirm = (input: string) => {
    dispatch(
      CHANGE_ITEM_FIELD_VALUE({
        itemId: props.itemId,
        fieldId: props.field.id,
        value: input.length > 0 ? input : null,
      }),
    )
    setIsEditing(false)
  }

  const content = isEditing ? (
    <TextareaWithConfirmButton
      className={styles.textarea}
      defaultValue={props.fieldValue?.value as string}
      rows={4}
      onConfirm={handleConfirm}
    />
  ) : (
    props.fieldValue?.value
  )

  return (
    <EditableField
      title={props.field.name}
      isEditing={isEditing}
      onEditClick={handleEdit}
      content={content}
    />
  )
}

export default LongTextField
