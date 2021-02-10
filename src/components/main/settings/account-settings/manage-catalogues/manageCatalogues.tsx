import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './manageCatalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers'
import { fetchCatalogues } from 'store/actions/cataloguesActions'
import { createCatalogue } from 'store/actions/settingsActions'
//Custom hooks
import { useDelay, useFirstRender } from 'src/customHooks'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'
import Loader from 'components/global-components/loader/loader'

const ManageCatalogues = () => {
    const dispatch = useDispatch()
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)
    const creatingNewCatalogue = useTypedSelector(state => state.settings.manageCatalogues.creatingNewCatalogue)
    const delayCompleated = useDelay(creatingNewCatalogue)
    const firstRender = useFirstRender()

    useEffect(() => {
        dispatch(fetchCatalogues())
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
                loading={delayCompleated}
                className={styles.addButton}
                onClick={handleAddCatalogueClick}
            />
            {fetchingCatalogues || firstRender
                ? <Loader size={50} className={styles.loader} />
                : items
            }
        </div>
    )
}

export default ManageCatalogues