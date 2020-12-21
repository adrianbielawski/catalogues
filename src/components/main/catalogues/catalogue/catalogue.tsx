import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
//Redux
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    return (
        <div className={styles.catalogue}>
            <FiltersBar />
            <div id="catalogueMainContent" className={styles.mainContent}>
                <CatalogueItems slug={props.match.params.slug} />
            </div>
        </div>
    )
}

export default Catalogue