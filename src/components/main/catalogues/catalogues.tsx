import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './catalogues.scss'
//Context
import FiltersBarBulkContextProvider from './catalogue/filters-bar/filtersBarBulkContextProvider'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { getCatalogues } from 'store/actions/cataloguesActions'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'
import { ItemType } from 'components/nav/nav'
import Catalogue from './catalogue/catalogue'
import FiltersBar from './catalogue/filters-bar/filtersBar'

const filtersValue = {
    filters: [
        {
            id: '1',
            title: 'id',
            type: 'number',
            minVal: '1',
            maxVal: '3',
        },
        {
            id: '2',
            title: 'category',
            type: 'multiple_choice',
            choices: [
                {
                    id: '21',
                    title: 'flowers',
                },
                {
                    id: '22',
                    title: 'animals',
                },
                {
                    id: '23',
                    title: 'flowers',
                },
                {
                    id: '24',
                    title: 'animals',
                },
                {
                    id: '25',
                    title: 'flowers',
                },
            ]
        },
        {
            id: '3',
            title: 'date',
            type: 'date',
            minVal: '2020-09-01',
            maxVal: '2020-12-18',
        },
    ],
    selectedFilters: {
        '2': { '22': true }
    }
}
const sortValue = {
    sortOptions: [
        {
            id: '1',
            title: 'id',
            type: 'number',
        },
        {
            id: '2',
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
            {fetchingCatalogues ? <Loader className={styles.loader} /> :
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
                        <p className={styles.noContent}>
                            You have no catalogues yet,
                            <span className={styles.anchor}>
                                click here to create your first catalogue
                            </span>
                        </p>
                    }
                </div>
            }
        </FiltersBarBulkContextProvider>
    )
}

export default Catalogues