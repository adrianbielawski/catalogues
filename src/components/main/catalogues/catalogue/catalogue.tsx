import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
import { useDispatch } from 'react-redux'
//Redux
import { fetchCatalogueFields } from 'store/actions/cataloguesActions'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import { useTypedSelector } from 'store/reducers'
import { catalogueSelectorBySlug } from 'store/selectors'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelectorBySlug(props.match.params.slug))
    const screenWidth = window.innerWidth

    useEffect(() => {
        dispatch(fetchCatalogueFields(catalogue.id))
    }, [])

    const handleAddItem = () => {

    }

    return (
        <div className={styles.catalogue}>
            <FiltersBar />
            <div id="catalogueMainContent" className={styles.mainContent}>
                {screenWidth > 640
                    ? (
                        <AddButton
                            text="Add new item"
                            className={styles.addItemButton}
                            onClick={handleAddItem}
                        />
                    )
                    : (
                        <FixedAddButton onClick={handleAddItem} />
                    )
                }
                <CatalogueItems catalogueId={catalogue.id} />
            </div>
        </div>
    )
}

export default Catalogue