import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteItems.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Filters bar context
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
import { filtersBarInitialState } from './filter-bar/utils/contextInitialValues'
//Custom components
import Header from 'components/global-components/header/header'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import Items from './items/items'
import FiltersBar from './filter-bar/filtersBar'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

const cx = classNames.bind(styles)

const FavouriteItems = () => {
    const favouriteItemsRef = useRef<HTMLDivElement>(null)
    const screenHeight = useTypedSelector(state => state.modules.app.screenHeight)
    const smallViewport = useTypedSelector(state => state.modules.app.screenWidth.smallViewport)
    const [minHeight, setMinHeight] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        if (favouriteItemsRef.current === null) {
            return
        }

        getMinHeight()
    }, [favouriteItemsRef.current, screenHeight])

    const getMinHeight = () => {
        const top = favouriteItemsRef.current!.getBoundingClientRect().top
        const minHeight = screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    const toggleFiltersBar = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowFilters(!showFilters)
    }

    const filtersButtonClass = cx(
        'filtersButton',
        {
            active: location.search,
        }
    )

    return (
        <FiltersBarBulkContextProvider
            values={filtersBarInitialState}
        >
            <div
                className={styles.favouriteItems}
                style={{ minHeight: `${minHeight}px` }}
                ref={favouriteItemsRef}
            >
                <Header />
                <ComponentHeader
                    className={styles.favouriteItemsHeader}
                >
                    <div></div>
                    <p className={styles.title}>
                        Favourite items
                    </p>
                    <div className={styles.actions}>
                        {smallViewport &&
                            <TransparentButton
                                className={filtersButtonClass}
                                onClick={toggleFiltersBar}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                            </TransparentButton>
                        }
                    </div>
                </ComponentHeader>
                <div className={styles.content}>
                    <FiltersBar
                        show={showFilters}
                        toggleShow={toggleFiltersBar}
                    />
                    <Items />
                </div>
            </div>
        </FiltersBarBulkContextProvider>
    )
}

export default FavouriteItems