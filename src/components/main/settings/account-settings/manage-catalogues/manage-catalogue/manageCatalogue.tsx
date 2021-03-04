import React from 'react'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import CatalogueFields from './catalogue-fields/catalogueFields'
import CatalogueSettings from './catalogue-settings/catalogueSettings'

type Props = {
    catalogue: DeserializedCatalogue,
}

const ManageCatalogue = (props: Props) => (
    <div className={styles.manageCatalogue}>
        <CatalogueTitle
            id={props.catalogue.id}
            name={props.catalogue.name}
        />
        <div className={styles.content}>
            <CatalogueSettings catalogue={props.catalogue} />
            <CatalogueFields catalogue={props.catalogue} />
        </div>
    </div>
)

export default ManageCatalogue