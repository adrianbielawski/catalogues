import { useEffect, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './topItems.module.scss'
import {
  CLEAR_TOP_ITEMS,
  FETCH_TOP_ITEMS,
  FETCH_TOP_ITEM_COMMENTS,
  POST_TOP_ITEM_COMMENT,
} from 'store/modules/auth-user-dashboard/top-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

const cx = classNames.bind(styles)

const TopItems = () => {
  const dispatch = useAppDispatch()

  const authUser = useTypedSelector((state) => state.modules.authUser)
  const isFetchingCataloguesData = useTypedSelector(
    (state) => state.modules.authUserCatalogues.isFetchingCataloguesData,
  )
  const { itemsData, isFetchingData, isFetchingItems, error } =
    useTypedSelector((state) => state.modules.authUserDashboard.topItems)

  useEffect(() => {
    fetchItems(1)

    return () => {
      dispatch(CLEAR_TOP_ITEMS())
    }
  }, [authUser.id])

  const fetchItems = (page?: number) => {
    dispatch(FETCH_TOP_ITEMS(page ?? itemsData?.next ?? 1))
  }

  const itemsComponents = useMemo(
    () =>
      itemsData?.results.map((item, i) => {
        const handleAddComment = (text: string, parentId?: number) => {
          dispatch(
            POST_TOP_ITEM_COMMENT({
              itemId: item.id,
              text,
              parentId,
            }),
          )
        }

        const handleFetchComments = (page: number | null) => {
          dispatch(
            FETCH_TOP_ITEM_COMMENTS({
              itemId: item.id,
              page,
            }),
          )
        }

        let renderQty = itemsData.results.length

        if (isFetchingItems && itemsData.current) {
          renderQty = itemsData.current * 10
        }
        if (isFetchingData && !isFetchingItems && itemsData.current) {
          renderQty = (itemsData.current - 1) * 10
        }

        if (i >= renderQty) {
          return undefined
        }

        const itemClass = cx('item', {
          last: i === itemsData.results.length - 1,
        })

        return (
          <CatalogueItem
            className={itemClass}
            itemData={item}
            isNarrow={true}
            editable={false}
            key={item.id}
            onAddComment={handleAddComment}
            onFetchComments={handleFetchComments}
          />
        )
      }),
    [itemsData, isFetchingData, isFetchingItems],
  )

  const hasItems = !!itemsData?.results.length
  const isInitialFetch = isFetchingData && !hasItems
  const isFetchingCatalogues = authUser.id && isFetchingCataloguesData

  if (error?.message) {
    return <p className={styles.noContent}>{error.message}</p>
  }

  if (!itemsData || isInitialFetch || isFetchingCatalogues) {
    return <Loader className={styles.loader} />
  }

  if (!isFetchingData && !hasItems) {
    return <p className={styles.noContent}>No content</p>
  }

  return (
    <PaginatedList
      next={itemsData.next}
      buttonChild="See more"
      isFetching={isFetchingData}
      fetchOnButtonClick="once"
      intersectingElement={3}
      onLoadMore={fetchItems}
    >
      {itemsComponents}
    </PaginatedList>
  )
}

export default TopItems
