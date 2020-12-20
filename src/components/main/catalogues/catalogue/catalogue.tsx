import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
//Redux
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
//Context
import FiltersBarContextProvider from './filters-bar/filtersBarContextProvider'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    return (
        <FiltersBarContextProvider>
            <div className={styles.catalogue}>
                <FiltersBar />
                <div id="catalogueMainContent" className={styles.mainContent}>
                    <CatalogueItems slug={props.match.params.slug} />
                </div>
            </div>
        </FiltersBarContextProvider>
    )
}

export default Catalogue