import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './catalogue.scss'
//Redux
import { addItemToState, fetchCatalogueFields } from 'store/actions/cataloguesActions'
import { useTypedSelector } from 'store/reducers'
import { catalogueSelectorBySlug } from 'store/selectors'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import Loader from 'components/global-components/loader/loader'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelectorBySlug(props.match.params.slug))

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
            {catalogue.fetchingFields
                ? <Loader className={styles.loader} />
                : (
                    <div id="catalogueMainContent" className={styles.mainContent}>
                        {getAddItemButton()}
                        <CatalogueItems catalogueId={catalogue.id} />
                    </div>
                )
            }
        </div>
    )
}

export default Catalogue