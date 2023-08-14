import { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './latestFromFavourites.module.scss'
// Redux
import {
  CLEAR_LFF,
  FETCH_LFF,
  FETCH_LFF_ITEM_COMMENTS,
  POST_LFF_ITEM_COMMENT,
} from 'store/modules/auth-user-dashboard/latest-from-favourites/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Components
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

const cx = classNames.bind(styles)

const LatestFromFavourites = () => {
  const dispatch = useAppDispatch()
  const latestFromFavourites = useTypedSelector(
    (state) => state.modules.authUserDashboard.latestFromFavourites,
  )
  const itemsData = latestFromFavourites?.itemsData

  useEffect(() => {
    fetchItems(1)

    return () => {
      dispatch(CLEAR_LFF())
    }
  }, [])

  const fetchItems = (page?: number) => {
    dispatch(FETCH_LFF(page ?? itemsData?.next ?? 1))
  }

  const itemsComponents = () => {
    return itemsData?.results.map((item, i) => {
      const handleAddComment = (text: string, parentId?: number) => {
        dispatch(
          POST_LFF_ITEM_COMMENT({
            itemId: item.id,
            text,
            parentId,
          }),
        )
      }

      const handleFetchComments = (page: number | null) => {
        dispatch(
          FETCH_LFF_ITEM_COMMENTS({
            itemId: item.id,
            page,
          }),
        )
      }

      let renderQty = itemsData.results.length

      if (latestFromFavourites.isFetchingItems && itemsData.current) {
        renderQty = itemsData.current * 10
      }
      if (
        latestFromFavourites.isFetchingData &&
        !latestFromFavourites.isFetchingItems &&
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

  const hasItems = itemsData?.results.length !== 0

  if (!itemsData || (latestFromFavourites.isFetchingData && !hasItems)) {
    return <Loader className={styles.loader} />
  }

  if (!latestFromFavourites.isFetchingData && hasItems) {
    return <p className={styles.noContent}>No content</p>
  }

  return (
    <PaginatedList
      next={itemsData.next}
      buttonChild="See more"
      isFetching={latestFromFavourites.isFetchingData}
      fetchOnButtonClick="once"
      intersectingElement={3}
      onLoadMore={fetchItems}
    >
      {itemsComponents()}
    </PaginatedList>
  )
}

export default LatestFromFavourites
