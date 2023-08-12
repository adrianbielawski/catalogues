import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './catalogueFields.module.scss'
// Types
import { type AuthUserFieldData } from 'src/globalTypes'
// Redux
import { REORDER_CATALOGUE_FIELDS } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
// Components
import AddField from './add-field/addField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import Field from './field/field'
import OrderableList, {
  type OnDropParams,
} from '@adrianbielawski/orderable-list'

interface Props {
  catalogueId: number
}

const CatalogueFields = (props: Props) => {
  const dispatch = useAppDispatch()
  const fieldsData = useTypedSelector(
    authUserFieldsDataSelector(props.catalogueId),
  )

  const handleDrop = (params: OnDropParams<AuthUserFieldData>) => {
    dispatch(
      REORDER_CATALOGUE_FIELDS({
        catalogueId: props.catalogueId,
        fieldId: params.item.id,
        newPosition: params.newPosition,
        fieldsData: params.newItems,
      }),
    )
  }

  return (
    <IconWithTitle title={'Catalogue fields'} icon={faListAlt}>
      <OrderableList
        className={styles.fields}
        items={fieldsData}
        itemComponent={Field}
        onDrop={handleDrop}
        scrollTopAt={80}
      />
      <AddField catalogueId={props.catalogueId} />
    </IconWithTitle>
  )
}

export default CatalogueFields
