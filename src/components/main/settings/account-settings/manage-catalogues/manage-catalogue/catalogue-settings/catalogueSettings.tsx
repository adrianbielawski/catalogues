import React from 'react'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Custom components
import CatalogueSettingsCategory from '../catalogueSettingsCategory/catalogueSettingsCategory'

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueSettings = (props: Props) => {

    return (
        <CatalogueSettingsCategory
            title={'Catalogue settings'}
            icon={faCogs}
        >
            <>
            </>
        </CatalogueSettingsCategory>
    )
}

export default CatalogueSettings