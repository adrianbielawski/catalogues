import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom'
import { upperFirst } from 'lodash'
import styles from './catalogues.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Context
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
//Redux
import { FETCH_CURRENT_USER_CATALOGUES } from 'store/modules/current-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Router
import { RouteWithContext } from 'src/router'
//Hooks
import { useFirstRender } from 'src/hooks/useFirstRender'
//Filters bar utils
import { filtersBarInitialState } from './catalogue/filter-bar-utils/contextInitialValues'
//Components
import Loader from 'components/global-components/loader/loader'
import Catalogue from './catalogue/catalogue'
import Header from 'components/global-components/header/header'

const Catalogues = () => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const dispatch = useAppDispatch()
    const cataloguesRef = useRef<HTMLDivElement>(null)
    const firstRender = useFirstRender()
    const user = useTypedSelector(state => state.auth.user)
    const currentUser = useTypedSelector(state => state.currentUser.user)
    const currentUserCatalogues = useTypedSelector(state => state.modules.currentUserCatalogues)
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const app = useTypedSelector(state => state.app)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        if (currentUser) {
            dispatch(FETCH_CURRENT_USER_CATALOGUES())
        }
    }, [currentUser])

    useEffect(() => {
        if (cataloguesRef.current === null) {
            return
        }

        getMinHeight()
    }, [cataloguesRef.current, app.screenHeight])


    const getMinHeight = () => {
        const top = cataloguesRef.current!.getBoundingClientRect().top
        const minHeight = app.screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    const handleRedirectToSettings = () => {
        history.push(`/${currentUser!.username}/settings/account/manage-catalogues`)
    }

    const getNoCatalogueMessage = () => {
        if (user?.username !== currentUser?.username) {
            return (
                <p className={styles.noPublicCatalogues}>
                    {`${upperFirst(currentUser?.username)} has no public catalogues`}
                </p>
            )
        } else {
            return (
                <div className={styles.noCatalogues}>
                    <p>You have no catalogues yet,</p>
                    <p
                        className={styles.anchor}
                        onClick={handleRedirectToSettings}
                    >
                        click here to create your first catalogue
                    </p>
                </div>
            )
        }
    }

    if (currentUserCatalogues.isFetchingCatalogues || firstRender) {
        return <Loader className={styles.loader} />
    }

    const defaultCatalogueSlug = catalogues[currentUserCatalogues.defaultCatalogueId!]!.slug

    return (
        <FiltersBarBulkContextProvider
            values={filtersBarInitialState}
        >
            <div
                className={styles.catalogues}
                style={{ minHeight: `${minHeight}px` }}
                ref={cataloguesRef}
            >
                <Header />
                {currentUserCatalogues.cataloguesData.length === 0
                    ? getNoCatalogueMessage()
                    : (
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                <Redirect
                                    exact
                                    from="/:username/catalogues"
                                    to={{
                                        pathname: `/:username/catalogues/${defaultCatalogueSlug}`,
                                        state: location.state,
                                    }}
                                />
                                <RouteWithContext
                                    path="/:username/catalogues/:slug"
                                    component={Catalogue}
                                    canonical={true}
                                />
                            </Switch>
                        </Suspense>
                    )
                }
            </div>
        </FiltersBarBulkContextProvider>
    )
}

export default Catalogues