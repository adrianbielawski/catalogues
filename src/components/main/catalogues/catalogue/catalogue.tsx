import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
//Redux
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {

    return (
        <div className={styles.catalogue}>
            <div id="catalogueMainContent" className={styles.mainContent}>
                <CatalogueItems slug={props.match.params.slug} />
            </div>
        </div>
    )
}

export default Catalogue