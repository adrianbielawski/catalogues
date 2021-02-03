import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { addItemToState, fetchCatalogueFields } from 'store/actions/cataloguesActions'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import Loader from 'components/global-components/loader/loader'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useDispatch()
    const catalogue = props.match.params.catalogue!

    useEffect(() => {
        dispatch(fetchCatalogueFields(catalogue.id))
    }, [catalogue.id])

    const handleAddItem = () => {
        dispatch(addItemToState(catalogue.id))
    }

    const getAddItemButton = () => {
        if (window.innerWidth > 640) {
            return (
                <AddButton
                    text="Add new item"
                    className={styles.addItemButton}
                    onClick={handleAddItem}
                />
            )
        } else {
            return <FixedAddButton onClick={handleAddItem} />
        }
    }

    return (
        <div className={styles.catalogue}>
            <FiltersBar />
            <div id="catalogueMainContent" className={styles.mainContent}>
                {getAddItemButton()}
                <CatalogueItems catalogueId={catalogue.id} />
            </div>
        </div>
    )
}

export default Catalogue