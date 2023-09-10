import { useEffect } from 'react'
import styles from './manageCatalogue.module.scss'
import { FETCH_AUTH_USER_CATALOGUE_FIELDS } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import {
  catalogueSelector,
  authUserCatalogueDataSelector,
} from 'store/selectors'
import CatalogueTitle from './catalogue-title/catalogueTitle'
import CatalogueFields from './catalogue-fields/catalogueFields'
import CatalogueSettings from './catalogue-settings/catalogueSettings'
import CatalogueImage from './catalogue-image/catalogueImage'

interface Props {
  catalogueId: number
}

const ManageCatalogue = ({ catalogueId }: Props) => {
  const dispatch = useAppDispatch()
  const catalogue = useTypedSelector(catalogueSelector(catalogueId))!
  const { isFetchingFieldsChoices, isInitialized } = useTypedSelector(
    authUserCatalogueDataSelector(catalogueId),
  )

  useEffect(() => {
    dispatch(FETCH_AUTH_USER_CATALOGUE_FIELDS(catalogueId))
  }, [])

  if (isFetchingFieldsChoices && !isInitialized) {
    return null
  }

  return (
    <div className={styles.manageCatalogue}>
      <CatalogueTitle catalogueId={catalogueId} name={catalogue.name} />
      <div className={styles.content}>
        <CatalogueImage
          url={catalogue.imageThumbnail}
          catalogueId={catalogueId}
        />
        <CatalogueFields catalogueId={catalogueId} />
        <CatalogueSettings catalogue={catalogue} />
      </div>
    </div>
  )
}

export default ManageCatalogue
