import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom'
import styles from './catalogues.scss'
//Types
import { LocationState } from 'src/globalTypes'
import { NavItemType } from 'components/nav/nav'
//Context
import FiltersBarBulkContextProvider from './catalogue/filters-bar/filtersBarBulkContextProvider'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { FETCH_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Router
import { RouteWithContext } from 'src/router'
//Custom hooks
import { useFirstRender } from 'src/customHooks'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'
import Catalogue from './catalogue/catalogue'
import FiltersBar from './catalogue/filters-bar/filtersBar'

const filtersValue = {
    filters: [],
    selectedFilters: {}
}
const sortValue = {
    sortOptions: [
        {
            id: 'id',
            title: 'id',
            type: 'number',
        },
        {
            id: 'date',
            title: 'date',
            type: 'date',
        },
    ],
    selected: {},
}
const searchValue = {
    search: '',
}

const filtersBarValue = {
    show: false,
}

const Catalogues = () => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const dispatch = useAppDispatch()
    const cataloguesRef = useRef<HTMLDivElement>(null)
    const firstRender = useFirstRender()
    const screenHeight = useTypedSelector(state => state.app.screenHeight)
    const user = useTypedSelector(state => state.auth.user)
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const fetchingCatalogues = useTypedSelector(state => state.catalogues.fetchingCatalogues)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        dispatch(FETCH_CATALOGUES())
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

    const handleRedirectToSettings = () => {
        history.push(`/${user!.id}/settings/account/manage-catalogues`)
    }

    const getNoCatalogueMessage = () => {
        return (
            <div className={styles.noContent}>
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

    const NAV_CONTENT: NavItemType[] = [
        {
            title: 'Catalogues',
            location: `/${user!.id}/catalogues`,
            children: catalogues.map(catalogue => {
                return {
                    id: catalogue.id.toString(),
                    title: catalogue.name,
                    url: `/${user!.id}/catalogues/${catalogue.slug}`,
                }
            }),
        },
        {
            id: 'Settings',
            title: 'Settings',
            url: `/${user!.id}/settings`,
        }
    ]

    const extraNavItems = [
        {
            component: <Logout className={styles.logout} />,
            inNavBarOnMobile: false,
        },
        {
            component: <FiltersBar.FiltersBarButton className={styles.filterButton} />,
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
        >
            {fetchingCatalogues || firstRender ? <Loader className={styles.loader} /> :
                <div
                    className={styles.catalogues}
                    style={{ minHeight: `${minHeight}px` }}
                    ref={cataloguesRef}
                >
                    <Nav
                        content={NAV_CONTENT}
                        extraItems={extraNavItems}
                        className={styles.nav}
                    />
                    {catalogues.length === 0
                        ? getNoCatalogueMessage()
                        : (
                            <Suspense fallback={<Loader />}>
                                <Switch>
                                    <Redirect
                                        exact
                                        from="/:userId/catalogues"
                                        to={{
                                            pathname: `/:userId/catalogues/${catalogues[0].slug}`,
                                            state: location.state,
                                        }}
                                    />
                                    <RouteWithContext
                                        path="/:userId/catalogues/:slug"
                                        component={Catalogue}
                                    />
                                </Switch>
                            </Suspense>
                        )
                    }
                </div>
            }
        </FiltersBarBulkContextProvider>
    )
}

export default Catalogues