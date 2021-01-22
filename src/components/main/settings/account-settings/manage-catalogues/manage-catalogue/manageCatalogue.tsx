import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue, DeserializedChoiceField, DeserializedTextField } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
import { catalogueSelector } from 'store/selectors'
import { fetchItemsFields } from 'store/actions/cataloguesActions'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import TextField from './catalogue-fields/text-field/textField'
import ChoiceField from './catalogue-fields/choice-field/choiceField'
import AddField from './add-field/addField'

type Props = {
    catalogue: DeserializedCatalogue,
}

const ManageCatalogue = (props: Props) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogue.id))

    useEffect(() => {
        if (catalogue.fields.length !== 0) {
            return
        }
        dispatch(fetchItemsFields(props.catalogue.id))
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
                {fields}
                <AddField />
            </div>
        </div>
    )
}
export default ManageCatalogue