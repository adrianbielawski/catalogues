import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './catalogueFields.module.scss'
import { type AuthUserFieldData } from 'src/globalTypes'
import { REORDER_CATALOGUE_FIELDS } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
import AddField from './add-field/addField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import Field from './field/field'
import OrderableList, {
  type OnDropParams,
} from '@adrianbielawski/orderable-list'

interface Props {
  catalogueId: number
}

const CatalogueFields = ({ catalogueId }: Props) => {
  const dispatch = useAppDispatch()
  const fieldsData = useTypedSelector(authUserFieldsDataSelector(catalogueId))
  const noChildrenFields = fieldsData.filter((f) => !f.parentId)

  const handleDrop = (params: OnDropParams<AuthUserFieldData>) => {
    const newFieldsData = [
      ...fieldsData.filter((f) => !!f.parentId),
      ...params.newItems,
    ]
    dispatch(
      REORDER_CATALOGUE_FIELDS({
        catalogueId,
        fieldId: params.item.id,
        newPosition: params.newPosition,
        fieldsData: newFieldsData,
      }),
    )
  }

  return (
    <IconWithTitle title={'Catalogue fields'} icon={faListAlt}>
      <OrderableList
        className={styles.fields}
        items={noChildrenFields}
        itemComponent={Field}
        onDrop={handleDrop}
        scrollTopAt={80}
      />
      <AddField
        catalogueId={catalogueId}
        parentId={null}
        className={styles.addField}
      />
    </IconWithTitle>
  )
}

export default CatalogueFields
