import React, { useEffect } from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import { DeserializedCatalogue, DeserializedChoiceField, DeserializedTextField } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import TextField from '../catalogue-fields/text-field/textField'
import ChoiceField from '../catalogue-fields/choice-field/choiceField'
import AddField from '../add-field/addField'
import CatalogueSettingsCategory from '../catalogueSettingsCategory/catalogueSettingsCategory'

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueFields = (props: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(props.catalogue.id))
    }, [])

    const fields = props.catalogue.fields.map(field => {
        switch (field.type) {
            case 'short_text':
            case 'long_text':
                return (
                    <TextField
                        field={field as DeserializedTextField}
                        key={field.id}
                    />
                )
            case 'single_choice':
            case 'multiple_choice':
                return (
                    <ChoiceField
                        field={field as DeserializedChoiceField}
                        key={field.id}
                    />
                )
        }
    })

    if (props.catalogue.fetchingFieldsChoices || !props.catalogue.isInitialized) {
        return null
    }

    return (
        <CatalogueSettingsCategory
            title={'Catalogue fields'}
            icon={faListAlt}
        >
            <>
                {fields}
                <AddField catalogueId={props.catalogue.id} />
            </>
        </CatalogueSettingsCategory>
    )
}

export default CatalogueFields