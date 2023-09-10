import { FC } from 'react'
import styles from './addField.module.scss'
import { TOGGLE_ADD_FIELD } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'
import AnimateHeight from 'react-animate-height'

interface Props {
  catalogueId: number
}

const AddField: FC<Props> = ({ catalogueId }) => {
  const dispatch = useAppDispatch()
  const catalogue = useTypedSelector(authUserCatalogueDataSelector(catalogueId))

  const handleAddClick = () => {
    dispatch(TOGGLE_ADD_FIELD(catalogue.id))
  }

  return (
    <AnimateHeight height={catalogue.isAddFieldFormActive ? 'auto' : 46}>
      {!catalogue.isAddFieldFormActive ? (
        <AddButton
          className={styles.addButton}
          text="Add new field"
          onClick={handleAddClick}
        />
      ) : (
        <FieldForm
          catalogueId={catalogueId}
          active={catalogue.isAddFieldFormActive}
        />
      )}
    </AnimateHeight>
  )
}

export default AddField
