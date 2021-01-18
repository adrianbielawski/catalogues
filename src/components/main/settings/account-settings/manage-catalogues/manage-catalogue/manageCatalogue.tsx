import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './manageCatalogue.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
import { catalogueSelector } from 'store/selectors'
import { fetchItemsFields } from 'store/actions/cataloguesActions'
//Custom components
import CatalogueTitle from './catalogue-title/catalogueTitle'
import ItemFields from './item-fields/itemFields'
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

    return (
        <div className={styles.manageCatalogue}>
            <CatalogueTitle
                id={props.catalogue.id}
                name={props.catalogue.name}
            />
            <div className={styles.manageItem}>
                <ItemFields fields={props.catalogue.fields} />
                <AddField />
            </div>
        </div>
    )
}
export default ManageCatalogue