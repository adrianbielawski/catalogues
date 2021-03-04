import React from 'react'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CHANGE_DEFAULT_CATALOGUE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import CatalogueSettingsCategory from '../catalogueSettingsCategory/catalogueSettingsCategory'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueSettings = (props: Props) => {
    const dispatch = useAppDispatch()
    const handleChangeDefault = () => {
        dispatch(CHANGE_DEFAULT_CATALOGUE({
            catalogueId: props.catalogue.id,
            default: !props.catalogue.default,
        }))
    }

    return (
        <CatalogueSettingsCategory
            title={'Catalogue settings'}
            icon={faCogs}
        >
            <>
                <CheckBoxWithTitle
                    id={'defaultCatalogue'}
                    title={`Default catalogue`}
                    selected={props.catalogue.default}
                    onChange={handleChangeDefault}
                />
            </>
        </CatalogueSettingsCategory>
    )
}

export default CatalogueSettings