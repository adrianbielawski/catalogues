import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
//Redux
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    const screenWidth = window.innerWidth

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
                <CatalogueItems slug={props.match.params.slug} />
            </div>
        </div>
    )
}

export default Catalogue