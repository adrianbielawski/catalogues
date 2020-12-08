import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './catalogue.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components

type Params = {
    slug: string
}

const Catalogue = (props: RouteComponentProps<Params>) => {
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    
    const getActiveCatalogue = () => {
        return catalogues.find(catalogue => catalogue.slug === props.match.params.slug)
    }

    const [activeCatalogue, setActiveCatalogue] = useState(getActiveCatalogue())


    useEffect(() => {
        setActiveCatalogue(getActiveCatalogue())
    }, [props.match.params])
    
    return (
        <div className={styles.catalogue}>
        </div>
    )
}

export default Catalogue