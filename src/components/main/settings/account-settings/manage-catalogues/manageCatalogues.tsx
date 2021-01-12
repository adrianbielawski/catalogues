import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './manageCatalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers'
import { createCatalogue, fetchCatalogues } from 'store/actions/cataloguesActions'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'
import Loader from 'components/global-components/loader/loader'

const ManageCatalogues = () => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.app.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)
    const creatingNewCatalogue = useTypedSelector(state => state.catalogues.creatingNewCatalogue)

    useEffect(() => {
        if (catalogues.length === 0) {
            dispatch(fetchCatalogues())
        }
    }, [])

    const handleAddCatalogueClick = () => {
        dispatch(createCatalogue())
    }

    const items = catalogues.map(catalogue => (
        <ManageCatalogue catalogue={catalogue} key={catalogue.id} />
    ))

    return (
        <div className={styles.manageCatalogues}>
            <AddButton
                text="Add new catalogue"
                loading={creatingNewCatalogue}
                className={styles.addButton}
                onClick={handleAddCatalogueClick}
            />
            {fetchingCatalogues &&
                <Loader size={50} className={styles.loader} />
            }
            {items}
        </div>
    )
}

export default ManageCatalogues