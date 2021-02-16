import React, { useEffect } from 'react'
import styles from './manageCatalogues.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CREATE_CATALOGUE, FETCH_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom hooks
import { useDelay, useFirstRender } from 'src/customHooks'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'
import Loader from 'components/global-components/loader/loader'

const ManageCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.catalogues)
    const delayCompleated = useDelay(catalogues.creatingNewCatalogue)
    const firstRender = useFirstRender()

    useEffect(() => {
        dispatch(FETCH_CATALOGUES())
    }, [])

    const handleAddCatalogueClick = () => {
        dispatch(CREATE_CATALOGUE())
    }

    const items = catalogues.catalogues.map(catalogue => (
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
            {catalogues.fetchingCatalogues || firstRender
                ? <Loader size={50} className={styles.loader} />
                : items
            }
        </div>
    )
}

export default ManageCatalogues