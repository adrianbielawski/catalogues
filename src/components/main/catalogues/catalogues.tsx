import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom'
import { clamp, upperFirst } from 'lodash'
import styles from './catalogues.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Context
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { FETCH_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Router
import { RouteWithContext } from 'src/router'
//Custom hooks
import { useFirstRender } from 'src/customHooks'
//Filter bar utils
//Custom components
import Loader from 'components/global-components/loader/loader'
import Catalogue from './catalogue/catalogue'
import Header from 'components/global-components/header/header'
import { filtersBarInitialState } from './catalogue/filter-bar-utils/contextInitialValues'

const Catalogues = () => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const dispatch = useAppDispatch()
    const cataloguesRef = useRef<HTMLDivElement>(null)
    const firstRender = useFirstRender()
    const user = useTypedSelector(state => state.auth.user)
    const currentUser = useTypedSelector(state => state.currentUser.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)
    const app = useTypedSelector(state => state.app)
    const [minHeight, setMinHeight] = useState(0)
    const [defaultCatalogue, setDefaultCatalogue] = useState<number | null>(null)
    const [showNav, setShowNav] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        if (fetchingCatalogues || firstRender) {
            return
        }

        const defaultCatalogueIndex = catalogues.findIndex(c => c.default === true)

        setDefaultCatalogue(clamp(defaultCatalogueIndex, 0, catalogues.length - 1))
    }, [fetchingCatalogues])

    useEffect(() => {
        dispatch(FETCH_CATALOGUES())
    }, [currentUser?.username])

    useEffect(() => {
        if (cataloguesRef.current === null) {
            return
        }

        getMinHeight()
    }, [cataloguesRef.current, app.screenHeight])

    useEffect(() => {
        const close = () => {
            setShowNav(false)
            setShowFilters(false)
        }

        if (showNav || showFilters) {
            window.addEventListener('click', close)
        }
        return () => {
            window.removeEventListener('click', close)
        }
    }, [showNav])


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

    if (fetchingCatalogues || firstRender || defaultCatalogue === null) {
        return <Loader className={styles.loader} />
    }

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
                {catalogues.length === 0
                    ? getNoCatalogueMessage()
                    : (
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                <Redirect
                                    exact
                                    from="/:username/catalogues"
                                    to={{
                                        pathname: `/:username/catalogues/${catalogues[defaultCatalogue!].slug}`,
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