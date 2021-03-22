import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom'
import { clamp, upperFirst } from 'lodash'
import styles from './catalogues.scss'
//Types
import { LocationState } from 'src/globalTypes'
import { NavItemType } from 'components/global-components/nav/deprecated-nav/nav'
//Context
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filtersBarBulkContextProvider'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { FETCH_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Router
import { RouteWithContext } from 'src/router'
//Custom hooks
import { useFirstRender } from 'src/customHooks'
//Filter bar utils
import { searchValue, sortValue, filtersValue, filtersBarValue } from './filter-bar-utils/contextInitialValues'
//Custom components
import DeprecatedNav from 'components/global-components/nav/deprecated-nav/nav'
import AuthButton from 'components/auth/auth-button/authButton'
import Loader from 'components/global-components/loader/loader'
import Catalogue from './catalogue/catalogue'
import FiltersBar from 'components/global-components/filters-bar/filtersBar'

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

    const toggleFiltersBar = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowFilters(!showFilters)
        setShowNav(false)
    }

    const toggleNav = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowNav(!showNav)
        setShowFilters(false)
    }


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

    const NAV_CONTENT: NavItemType[] = [
        {
            title: 'Catalogues',
            location: `/${currentUser!.username}/catalogues`,
            children: catalogues.map(catalogue => {
                return {
                    id: catalogue.id.toString(),
                    title: catalogue.name,
                    url: `/${currentUser!.username}/catalogues/${catalogue.slug}`,
                }
            }),
        },
    ]

    if (user) {
        NAV_CONTENT.push(
            {
                id: 'Settings',
                title: 'Settings',
                url: `/${user!.username}/settings`,
            }
        )
    }

    const extraNavItems = [
        {
            component: <AuthButton className={styles.authButton} />,
            inNavBarOnMobile: false,
        },
        {
            component: (
                <FiltersBar.FiltersBarButton
                    onToggleFiltersBar={toggleFiltersBar}
                    className={styles.filterButton}
                />
            ),
            inNavBarOnMobile: true,
        }
    ]

    return (
        <FiltersBarBulkContextProvider
            searchValue={searchValue}
            sortValue={sortValue}
            filtersValue={filtersValue}
            filtersBarValue={filtersBarValue}
            onChange={() => { }}
            showFilters={showFilters}
        >
            {fetchingCatalogues || firstRender || defaultCatalogue === null
                ? <Loader className={styles.loader} />
                : (
                    <div
                        className={styles.catalogues}
                        style={{ minHeight: `${minHeight}px` }}
                        ref={cataloguesRef}
                    >
                        {app.switches.find(s => s === 'NAVIGATION_REDESIGN') ? null : (
                            <DeprecatedNav
                                content={NAV_CONTENT}
                                extraItems={extraNavItems}
                                className={styles.nav}
                                show={showNav}
                                onToggleNav={toggleNav}
                            />
                        )}
                        {catalogues.length === 0
                            ? getNoCatalogueMessage()
                            : (
                                <Suspense fallback={<Loader />}>
                                    <Switch>
                                        <Redirect
                                            exact
                                            from="/:username/catalogues"
                                            to={{
                                                pathname: `/:username/catalogues/${catalogues[defaultCatalogue].slug}`,
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
                )
            }
        </FiltersBarBulkContextProvider>
    )
}

export default Catalogues