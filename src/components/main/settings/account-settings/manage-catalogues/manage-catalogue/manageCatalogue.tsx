import React from 'react'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import ItemFields from './item-fields/itemFields'
import AddField from './add-field/addField'

type Props = {
    catalogue: DeserializedCatalogue,
}

const ManageCatalogue = (props: Props) => (
    <div className={styles.manageCatalogue}>
        <CatalogueTitle
            id={props.catalogue.id}
            name={props.catalogue.name}
        />
        <div className={styles.manageItem}>
            <ItemFields />
            <AddField />
        </div>
    </div>
)

export default ManageCatalogue