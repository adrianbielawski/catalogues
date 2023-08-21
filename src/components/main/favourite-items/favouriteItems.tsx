import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './favouriteItems.module.scss'
import { FETCH_FAVOURITE_ITEMS_DATA } from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
import { filtersBarInitialState } from './filter-bar/utils/contextInitialValues'
import Header from 'components/global-components/header/header'
import FavouriteItemsContent from './favourite-items-content/favouriteItemsContent'

const FavouriteItems = () => {
  const dispatch = useAppDispatch()

  const screenHeight = useTypedSelector(
    (state) => state.modules.app.screenHeight,
  )
  const isFetchingFavItemsData = useTypedSelector(
    (state) => state.modules.favouriteItems.isFetchingFavItemsData,
  )

  const favouriteItemsRef = useRef<HTMLDivElement>(null)

  const [minHeight, setMinHeight] = useState(0)

  const getMinHeight = useCallback(() => {
    const top = favouriteItemsRef.current!.getBoundingClientRect().top
    const minHeight = screenHeight - top - window.scrollY
    setMinHeight(minHeight)
  }, [screenHeight])

  useEffect(() => {
    dispatch(FETCH_FAVOURITE_ITEMS_DATA())
  }, [])

  useEffect(() => {
    if (favouriteItemsRef.current === null) {
      return
    }

    getMinHeight()
  }, [screenHeight, getMinHeight])

  return (
    <FiltersBarBulkContextProvider values={filtersBarInitialState}>
      <div
        className={styles.favouriteItems}
        style={{ minHeight: `${minHeight}px` }}
        ref={favouriteItemsRef}
      >
        <Header />
        {!isFetchingFavItemsData && <FavouriteItemsContent />}
      </div>
    </FiltersBarBulkContextProvider>
  )
}

export default FavouriteItems
