import React, { useEffect } from 'react'
import styles from './manageCatalogue.module.scss'
//Redux
import { FETCH_AUTH_USER_CATALOGUE_FIELDS } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, authUserCatalogueDataSelector } from 'store/selectors'
//Components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import CatalogueFields from './catalogue-fields/catalogueFields'
import CatalogueSettings from './catalogue-settings/catalogueSettings'
import CatalogueImage from './catalogue-image/catalogueImage'

type Props = {
    catalogueId: number,
}

const ManageCatalogue = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const catalogueData = useTypedSelector(authUserCatalogueDataSelector(props.catalogueId))

    useEffect(() => {
        dispatch(FETCH_AUTH_USER_CATALOGUE_FIELDS(props.catalogueId))
    }, [])

    if (catalogueData.isFetchingFieldsChoices && !catalogueData.isInitialized) {
        return null
    }

    return (
        <div className={styles.manageCatalogue}>
            <CatalogueTitle
                id={catalogue.id}
                name={catalogue.name}
            />
            <div className={styles.content}>
                <CatalogueImage
                    url={catalogue.imageThumbnail}
                    catalogue={catalogue}
                />
                <CatalogueFields catalogueId={catalogue.id} />
                <CatalogueSettings catalogue={catalogue} />
            </div>
        </div>
    )
}

export default ManageCatalogue