import React from 'react'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import CatalogueFields from './catalogue-fields/catalogueFields'
import CatalogueSettings from './catalogue-settings/catalogueSettings'
import CatalogueImage from './catalogue-image/catalogueImage'

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
            <CatalogueImage
                url={props.catalogue.imageThumbnail}
                catalogue={props.catalogue}
            />
            <CatalogueFields catalogue={props.catalogue} />
            <CatalogueSettings catalogue={props.catalogue} />
        </div>
    </div>
)

export default ManageCatalogue