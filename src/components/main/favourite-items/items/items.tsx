import { useCallback, useEffect, useMemo } from 'react'
import { size } from 'lodash'
import styles from './items.module.scss'
import {
  CLEAR_FAVOURITE_ITEMS_ERROR,
  CLEAR_FAVOURITE_ITEMS_DATA,
  FETCH_FAVOURITE_ITEMS,
  FETCH_FAVOURITE_ITEM_COMMENTS,
  POST_FAVOURITE_ITEM_COMMENT,
} from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { scrollTop } from 'src/utils'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import queryBuilder from 'components/global-components/filters-bar/builders/queryBuilder'
import filtersBarValuesBuilder from 'components/global-components/filters-bar/builders/filtersBarValuesBuilder'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { useLocation, useNavigate } from 'react-router-dom'

const FavouriteItems = () => {
  const dispatch = useAppDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const filtersBarContext = useFiltersBarContext()

  const screenWidth = useTypedSelector((state) => state.modules.app.screenWidth)
  const { itemsData, isFetchingItems, error } = useTypedSelector(
    (state) => state.modules.favouriteItems,
  )

  useEffect(() => {
    const parsedQuery = filtersBarValuesBuilder(
      filtersBarContext,
      location.search,
    )

    if (parsedQuery.searchValue) {
      filtersBarContext.searchContext.setSearchValue(parsedQuery.searchValue)
    }

    if (parsedQuery.orderingValue) {
      filtersBarContext.sortContext.setSortValue(parsedQuery.orderingValue)
    }

    if (size(parsedQuery.filtersValue)) {
      filtersBarContext.filtersContext.setSelectedFilters(
        parsedQuery.filtersValue,
      )
    }

    filtersBarContext.filtersBar.initialize()
  }, [])

  useEffect(() => {
    if (!filtersBarContext.filtersBar.isInitialized) {
      return
    }

    fetchItems(1)
    scrollTop()
  }, [
    filtersBarContext.searchContext.search,
    filtersBarContext.sortContext.selected,
    filtersBarContext.filtersContext.selectedFilters,
    filtersBarContext.filtersBar.isInitialized,
  ])

  useEffect(() => {
    return () => {
      dispatch(CLEAR_FAVOURITE_ITEMS_DATA())
    }
  }, [])

  const fetchItems = useCallback(
    (pageNum?: number) => {
      const query = queryBuilder(filtersBarContext)

      navigate({ search: query.query })

      dispatch(
        FETCH_FAVOURITE_ITEMS({
          page: pageNum ?? itemsData?.next ?? 1,
          search: query.search,
          sort: query.sort,
          filters: query.filters,
        }),
      )
    },
    [filtersBarContext, itemsData],
  )

  const itemsComponents = useMemo(
    () =>
      itemsData?.results.map((item, i) => {
        const handleAddComment = (text: string, parentId?: number) => {
          dispatch(
            POST_FAVOURITE_ITEM_COMMENT({
              itemId: item.id,
              text,
              parentId,
            }),
          )
        }

        const handleFetchComments = (page: number | null) => {
          dispatch(
            FETCH_FAVOURITE_ITEM_COMMENTS({
              itemId: item.id,
              page,
            }),
          )
        }

        return (
          <CatalogueItem
            className={styles.item}
            itemData={item}
            isNarrow={!screenWidth.largeViewport}
            editable={false}
            key={item.id}
            onAddComment={handleAddComment}
            onFetchComments={handleFetchComments}
          />
        )
      }),
    [itemsData, screenWidth.largeViewport],
  )

  const clearError = useCallback(() => {
    dispatch(CLEAR_FAVOURITE_ITEMS_ERROR())
    fetchItems(itemsData?.current ?? 1)
  }, [itemsData?.current, fetchItems])

  const itemsQty = itemsData?.results.length

  if (!itemsData || (isFetchingItems && !itemsQty)) {
    return <Loader className={styles.loader} />
  }

  return (
    <div className={styles.items}>
      {itemsQty === 0 && (
        <p className={styles.noItemsFound}>
          {location.search.length === 0
            ? 'You have no favourite items'
            : 'No items found'}
        </p>
      )}
      <PaginatedList
        className={styles.list}
        next={itemsData.next}
        buttonChild="See more"
        isFetching={isFetchingItems}
        fetchOnButtonClick="once"
        intersectingElement={3}
        onLoadMore={fetchItems}
      >
        {itemsComponents}
      </PaginatedList>
      <MessageModal
        show={error !== null}
        title={error?.title}
        message={error?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default FavouriteItems
