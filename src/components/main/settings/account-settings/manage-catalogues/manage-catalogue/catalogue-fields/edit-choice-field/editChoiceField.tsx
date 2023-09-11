import { FC } from 'react'
import styles from './editChoiceField.module.scss'
import {
  type AuthUserChoiceFieldData,
  type DeserializedField,
} from 'src/globalTypes'
import Choices from './choices/choices'
import DeleteFieldButton from '../components/DeleteFieldButton'
import PublicCheckBox from '../components/PublicCheckBox'
import FieldNameInput from '../components/FieldNameInput'

interface Props {
  field: DeserializedField
  fieldData: AuthUserChoiceFieldData
}

const EditChoiceField: FC<Props> = ({ field, fieldData }) => {
  return (
    <div className={styles.wrapper}>
      <FieldNameInput field={field} />
      <div className={styles.checkboxes}>
        <PublicCheckBox field={field} />
      </div>
      <Choices
        field={field}
        choices={fieldData.choices}
        className={styles.choices}
        fieldData={fieldData}
      />
      <DeleteFieldButton field={field} isDeleting={fieldData.isDeleting} />
    </div>
  )
}

export default EditChoiceField
