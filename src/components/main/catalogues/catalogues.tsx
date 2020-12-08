import React, { Suspense, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './catalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { getCatalogues } from 'store/actions/cataloguesActions'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'
import { ItemType } from 'components/nav/nav'
import Catalogue from './catalogue/catalogue'

const Catalogues = () => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.app.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)

    useEffect(() => {
        dispatch(getCatalogues(user!.id))
    }, [])

    const NAV_CONTENT: ItemType[] = [
        {
            title: 'Catalogues',
            location: `/${user!.id}/catalogues`,
            children: catalogues.map(catalogue => {
                return {
                    title: catalogue.name,
                    url: `/${user!.id}/catalogues/${catalogue.slug}`
                }
            }),
        },
        {
            title: 'Settings',
            url: `/${user!.id}/settings`,
        }
    ]

    return (
        fetchingCatalogues ? <Loader className={styles.loader} /> :
            <div className={styles.catalogues}>
                <Nav
                    content={NAV_CONTENT}
                    extraItems={[<Logout className={styles.logout} />]}
                />
                <Suspense fallback={<Loader />}>
                    <Switch>
                        {catalogues.length > 0 &&
                            <Redirect
                                exact
                                from="/:userId/catalogues"
                                to={`/:userId/catalogues/${catalogues[0].slug}`}
                            />
                        }
                        <Route
                            path="/:userId/catalogues/:slug"
                            component={Catalogue}
                        />
                    </Switch>
                </Suspense>
                {catalogues.length === 0 &&
                    <p className={styles.noContent}>You have no catalogues yet,
                        <span className={styles.anchor}> click here to create your first catalogue</span>
                    </p>
                }
            </div>
    )
}

export default Catalogues