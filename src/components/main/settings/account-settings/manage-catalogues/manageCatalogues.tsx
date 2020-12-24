import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './manageCatalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers'
import { getCatalogues } from 'store/actions/cataloguesActions'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'

const ManageCatalogues = () => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.app.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)

    useEffect(() => {
        dispatch(getCatalogues(user!.id))
    }, [])

    const handleAddcatalogueClick = () => {

    }

    const items = catalogues.map(catalogue => (
        <ManageCatalogue catalogue={catalogue} key={catalogue.id} />
    ))

    return (
        <div className={styles.manageCatalogues}>
            <AddButton
                text="Add new catalogue"
                className={styles.addButton}
                onClick={handleAddcatalogueClick}
            />
            {items}
        </div>
    )
}

export default ManageCatalogues