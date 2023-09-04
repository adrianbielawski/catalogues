import { useEffect } from 'react'
import styles from './favouriteItems.module.scss'
import { FETCH_FAVOURITE_ITEMS_DATA } from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
import { filtersBarInitialState } from './filter-bar/utils/contextInitialValues'
import Header from 'components/global-components/header/header'
import FavouriteItemsContent from './favourite-items-content/favouriteItemsContent'
import useMinContentHeight from 'src/hooks/useMinContentHeight'
import useRefCallback from 'src/hooks/useRefCallback'

const FavouriteItems = () => {
  const dispatch = useAppDispatch()

  const { authUser } = useTypedSelector((state) => state.modules)
  const isFetchingFavItemsData = useTypedSelector(
    (state) => state.modules.favouriteItems.isFetchingFavItemsData,
  )

  const [rect, ref] = useRefCallback<HTMLDivElement>()
  const minHeight = useMinContentHeight(rect)

  useEffect(() => {
    dispatch(FETCH_FAVOURITE_ITEMS_DATA())
  }, [authUser.id])

  return (
    <FiltersBarBulkContextProvider values={filtersBarInitialState}>
      <div
        className={styles.favouriteItems}
        style={{ minHeight: `${minHeight}px` }}
        ref={ref}
      >
        <Header />
        {!isFetchingFavItemsData && <FavouriteItemsContent />}
      </div>
    </FiltersBarBulkContextProvider>
  )
}

export default FavouriteItems
