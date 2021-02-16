import React, { useEffect } from 'react'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Utils
import { scrollTop } from 'src/utils'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const catalogue = props.match.params.catalogue!

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(catalogue.id))
    }, [catalogue.id])

    const handleAddItem = () => {
        scrollTop()
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