import React, { useEffect } from 'react'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue, DeserializedChoiceField, DeserializedTextField } from 'src/globalTypes'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import TextField from './catalogue-fields/text-field/textField'
import ChoiceField from './catalogue-fields/choice-field/choiceField'
import AddField from './add-field/addField'
import Loader from 'components/global-components/loader/loader'

type Props = {
    catalogue: DeserializedCatalogue,
}

const ManageCatalogue = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogue.id))

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(props.catalogue.id))
    }, [])

    const fields = catalogue.fields.map(field => {
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

    return (
        <div className={styles.manageCatalogue}>
            <CatalogueTitle
                id={props.catalogue.id}
                name={props.catalogue.name}
            />
            <div className={styles.manageItem}>
                {catalogue.fetchingFields
                    ? <Loader />
                    : fields
                }
                <AddField catalogueId={props.catalogue.id} />
            </div>
        </div>
    )
}
export default ManageCatalogue