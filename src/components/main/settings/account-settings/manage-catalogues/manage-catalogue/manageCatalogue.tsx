import React from 'react'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import CatalogueFields from './catalogue-fields/catalogueFields'
import CatalogueSettings from './catalogue-settings/catalogueSettings'

type Props = {
    catalogue: DeserializedCatalogue,
}

const ManageCatalogue = (props: Props) => {
    const catalogue = useTypedSelector(catalogueSelector(props.catalogue.id))

    return (
        <div className={styles.manageCatalogue}>
            <CatalogueTitle
                id={props.catalogue.id}
                name={props.catalogue.name}
            />
            <div className={styles.content}>
                <CatalogueSettings catalogue={catalogue} />
                <CatalogueFields catalogue={catalogue} />
            </div>
        </div>
    )
}

export default ManageCatalogue