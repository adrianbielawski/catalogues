import React, { Suspense, useEffect, useRef, useState } from 'react'
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
    const cataloguesRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const screenHeight = useTypedSelector(state => state.app.screenHeight)
    const user = useTypedSelector(state => state.app.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        dispatch(getCatalogues(user!.id))
    }, [])

    useEffect(() => {
        if (cataloguesRef.current === null) {
            return
        }
        window.addEventListener('resize', getMinHeight)
        getMinHeight()

        return () => {
            window.removeEventListener('resize', getMinHeight)
        }
    }, [cataloguesRef.current, screenHeight])

    const getMinHeight = () => {
        const top = cataloguesRef.current?.getBoundingClientRect().top
        const minHeight = screenHeight - top!
        setMinHeight(minHeight)
    }

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
            <div className={styles.catalogues} style={{minHeight: `${minHeight}px`}} ref={cataloguesRef}>
                <Nav
                    content={NAV_CONTENT}
                    extraItems={[<Logout className={styles.logout} />]}
                    className={styles.nav}
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