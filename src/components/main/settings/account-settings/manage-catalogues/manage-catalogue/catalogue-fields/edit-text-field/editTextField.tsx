import { FC } from 'react'
import styles from './editTextField.module.scss'
import {
  type AuthUserTextFieldData,
  type DeserializedField,
} from 'src/globalTypes'
import DeleteFieldButton from '../components/DeleteFieldButton'
import PublicCheckBox from '../components/PublicCheckBox'
import FieldNameInput from '../components/FieldNameInput'

interface Props {
  field: DeserializedField
  fieldData: AuthUserTextFieldData
}

const EditTextField: FC<Props> = ({ field, fieldData }) => {
  return (
    <div className={styles.wrapper}>
      <FieldNameInput field={field} />
      <div className={styles.checkboxes}>
        <PublicCheckBox field={field} />
      </div>
      <DeleteFieldButton field={field} isDeleting={fieldData.isDeleting} />
    </div>
  )
}

export default EditTextField
