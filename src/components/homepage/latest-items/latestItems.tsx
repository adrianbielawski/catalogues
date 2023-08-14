import { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './latestItems.module.scss'
// Redux
import {
  CLEAR_LATEST_ITEMS,
  FETCH_LATEST_ITEMS,
  FETCH_LATEST_ITEM_COMMENTS,
  POST_LATEST_ITEM_COMMENT,
} from 'store/modules/homepage/latest-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Components
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

const cx = classNames.bind(styles)

const LatestItems = () => {
  const dispatch = useAppDispatch()
  const authUser = useTypedSelector((state) => state.modules.authUser)
  const isFetchingCataloguesData = useTypedSelector(
    (state) => state.modules.authUserCatalogues.isFetchingCataloguesData,
  )
  const latestItems = useTypedSelector(
    (state) => state.modules.homepage.latestItems,
  )
  const itemsData = latestItems.itemsData

  useEffect(() => {
    fetchItems(1)

    return () => {
      dispatch(CLEAR_LATEST_ITEMS())
    }
  }, [])

  const fetchItems = (page?: number) => {
    dispatch(FETCH_LATEST_ITEMS(page ?? itemsData?.next ?? 1))
  }

  const itemsComponents = () => {
    return itemsData?.results.map((item, i) => {
      const handleAddComment = (text: string, parentId?: number) => {
        dispatch(
          POST_LATEST_ITEM_COMMENT({
            itemId: item.id,
            text,
            parentId,
          }),
        )
      }

      const handleFetchComments = (page: number | null) => {
        dispatch(
          FETCH_LATEST_ITEM_COMMENTS({
            itemId: item.id,
            page,
          }),
        )
      }

      let renderQty = itemsData.results.length

      if (latestItems.isFetchingItems && itemsData.current) {
        renderQty = itemsData.current * 10
      }
      if (
        latestItems.isFetchingData &&
        !latestItems.isFetchingItems &&
        itemsData.current
      ) {
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
    })
  }

  const hasItemsData = itemsData?.results.length === 0

  if (
    !itemsData ||
    (latestItems.isFetchingData && !hasItemsData) ||
    (authUser.id && isFetchingCataloguesData)
  ) {
    return <Loader className={styles.loader} />
  }

  if (!latestItems.isFetchingData && !hasItemsData) {
    return <p className={styles.noContent}>No content</p>
  }

  return (
    <PaginatedList
      next={itemsData.next}
      buttonChild="See more"
      isFetching={latestItems.isFetchingData}
      fetchOnButtonClick="once"
      intersectingElement={3}
      onLoadMore={fetchItems}
    >
      {itemsComponents()}
    </PaginatedList>
  )
}

export default LatestItems
