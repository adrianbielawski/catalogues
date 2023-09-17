import { ComponentType, FC } from 'react'
import styles from './editGroupField.module.scss'
import {
  AuthUserFieldData,
  AuthUserGroupFieldData,
  DeserializedField,
} from 'src/globalTypes'
import { REORDER_CATALOGUE_FIELDS } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import AddField from '../add-field/addField'
import OrderableList, {
  ItemComponentProps,
  OnDropParams,
} from '@adrianbielawski/orderable-list'
import DeleteFieldButton from '../components/DeleteFieldButton'
import PublicCheckBox from '../components/PublicCheckBox'
import FieldNameInput from '../components/FieldNameInput'
import { authUserFieldsDataSelector } from 'store/selectors'

interface Props {
  fieldComponent: ComponentType<ItemComponentProps<AuthUserFieldData>>
  field: DeserializedField
  fieldData: AuthUserGroupFieldData
}

const EditGroupField: FC<Props> = ({ fieldComponent, field, fieldData }) => {
  const dispatch = useAppDispatch()
  const fieldsData = useTypedSelector(
    authUserFieldsDataSelector(field.catalogueId, field.id),
  )

  const handleDrop = (params: OnDropParams<AuthUserFieldData>) => {
    dispatch(
      REORDER_CATALOGUE_FIELDS({
        catalogueId: field.catalogueId,
        parentFieldId: field.id,
        fieldId: params.item.id,
        newPosition: params.newPosition,
        fieldsData: params.newItems,
      }),
    )
  }

  return (
    <div className={styles.wrapper}>
      <FieldNameInput field={field} />
      <div className={styles.checkboxes}>
        <PublicCheckBox field={field} />
      </div>
      <OrderableList
        items={fieldsData}
        itemComponent={fieldComponent}
        onDrop={handleDrop}
        scrollTopAt={80}
      />
      <AddField
        catalogueId={field.catalogueId}
        parentId={field.id}
        formTitle={`New field in ${field.name}`}
        confirmButtonText={`Add to ${field.name}`}
      />
      <DeleteFieldButton field={field} isDeleting={fieldData.isDeleting} />
    </div>
  )
}

export default EditGroupField
