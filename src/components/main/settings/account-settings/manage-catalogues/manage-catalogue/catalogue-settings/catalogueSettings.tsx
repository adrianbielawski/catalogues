import { useState } from 'react'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueSettings.module.scss'
import { DeserializedCatalogue } from 'src/globalTypes'
import {
  CHANGE_DEFAULT_CATALOGUE,
  CHANGE_PUBLIC_CATALOGUE,
  DELETE_CATALOGUE,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import Button from 'components/global-components/button/button'
import ProtectedConfirmMessageModal, {
  ProtectedMessage,
} from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'

interface Props {
  catalogue: DeserializedCatalogue
}

const CatalogueSettings = ({ catalogue }: Props) => {
  const dispatch = useAppDispatch()
  const catalogueData = useTypedSelector(
    authUserCatalogueDataSelector(catalogue.id),
  )
  const [message, setMessage] = useState<ProtectedMessage | null>(null)

  const handleChangeDefault = () => {
    dispatch(
      CHANGE_DEFAULT_CATALOGUE({
        catalogueId: catalogue.id,
        default: !catalogue.default,
      }),
    )
  }

  const handlePublicDefault = () => {
    dispatch(
      CHANGE_PUBLIC_CATALOGUE({
        catalogueId: catalogue.id,
        public: !catalogue.public,
      }),
    )
  }

  const handleDeleteCatalogue = () => {
    setMessage({
      title: 'Delete catalogue',
      value: `Are you sure you want to delete "${catalogue.name}" catalogue`,
      expectedInput: catalogue.name,
    })
  }

  const deleteCatalogue = () => {
    setMessage(null)
    dispatch(DELETE_CATALOGUE(catalogue.id))
  }

  const clearMessage = () => {
    setMessage(null)
  }

  return (
    <div className={styles.catalogueSettings}>
      <IconWithTitle title={'Catalogue settings'} icon={faCogs}>
        <div className={styles.options}>
          <CheckBoxWithTitle
            id={'defaultCatalogue'}
            title={'Default catalogue'}
            selected={catalogue.default}
            onChange={handleChangeDefault}
          />
          <CheckBoxWithTitle
            id={'publicCatalogue'}
            title={'Public catalogue'}
            selected={catalogue.public}
            onChange={handlePublicDefault}
          />
        </div>
        <Button
          className={styles.deleteCatalogueButton}
          disabled={catalogueData.isDeletingCatalogue}
          onClick={handleDeleteCatalogue}
        >
          Delete catalogue
        </Button>
      </IconWithTitle>
      <ProtectedConfirmMessageModal
        show={message !== null}
        message={message}
        onConfirm={deleteCatalogue}
        onCancel={clearMessage}
      />
    </div>
  )
}

export default CatalogueSettings
