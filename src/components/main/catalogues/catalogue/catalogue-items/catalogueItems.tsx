import { useCallback, useEffect, useMemo } from 'react'
import { size } from 'lodash'
import classNames from 'classnames/bind'
import styles from './catalogueItems.module.scss'
import {
  AuthUserFieldData,
  CatalogueData,
  CurrentUserFieldData,
  DeserializedItem,
} from 'src/globalTypes'
import {
  ADD_ITEM,
  CLEAR_ITEMS_DATA,
  CLEAR_ITEMS_DATA_ERROR,
  DELETE_ITEM,
  FETCH_CURRENT_USER_ITEMS,
  FETCH_ITEM_COMMENTS,
  POST_ITEM_COMMENT,
  REFRESH_CURRENT_USER_ITEM,
  SAVE_ITEM,
  TOGGLE_EDIT_ITEM,
} from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import { scrollTop } from 'src/utils'
import queryBuilder from 'components/global-components/filters-bar/builders/queryBuilder'
import filtersBarValuesBuilder from 'components/global-components/filters-bar/builders/filtersBarValuesBuilder'
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import NewItemModal from './new-item-modal/newItemModal'
import MessageModal from 'components/global-components/message-modal/messageModal'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  catalogueData: CatalogueData<AuthUserFieldData | CurrentUserFieldData>
}

const cx = classNames.bind(styles)

const CatalogueItems = (props: Props) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const largeViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.largeViewport,
  )
  const currentUserItems = useTypedSelector(
    (state) => state.modules.currentUserItems,
  )
  const itemsData = currentUserItems.itemsData
  const catalogue = useTypedSelector(catalogueSelector(props.catalogueData.id))
  const filtersBarContext = useFiltersBarContext()

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
    return () => {
      dispatch(CLEAR_ITEMS_DATA())
    }
  }, [props.catalogueData.id])

  useEffect(() => {
    if (!filtersBarContext.filtersBar.isInitialized) return
    fetchItems(1)
    scrollTop()
  }, [
    filtersBarContext.searchContext.search,
    filtersBarContext.sortContext.selected,
    filtersBarContext.filtersContext.selectedFilters,
    filtersBarContext.filtersBar.isInitialized,
  ])

  const fetchItems = (pageNum?: number) => {
    let page = 1

    if (currentUserItems.catalogueId === props.catalogueData.id) {
      page = pageNum ?? itemsData!.next ?? 1
    }

    const query = queryBuilder(filtersBarContext)

    navigate({ search: query.query })

    dispatch(
      FETCH_CURRENT_USER_ITEMS({
        catalogueId: props.catalogueData.id,
        page,
        search: query.search,
        sort: query.sort,
        filters: query.filters,
      }),
    )
  }

  const handleAddItem = useCallback(() => {
    dispatch(ADD_ITEM(catalogue!.id))
  }, [catalogue?.id])

  const items = useMemo(
    () =>
      itemsData?.results.map((itemData) => {
        const handleAddComment = (text: string, parentId?: number) => {
          dispatch(
            POST_ITEM_COMMENT({
              itemId: itemData.id,
              text,
              parentId,
            }),
          )
        }

        const handleFetchComments = (page: number | null) => {
          dispatch(
            FETCH_ITEM_COMMENTS({
              itemId: itemData.id,
              page,
            }),
          )
        }

        const handleEditItem = () => {
          dispatch(TOGGLE_EDIT_ITEM(itemData.id))
        }

        const handleEditConfirm = (item: DeserializedItem) => {
          dispatch(SAVE_ITEM(item))
        }

        const handleEditCancel = (isNew: boolean) => {
          if (isNew) {
            dispatch(DELETE_ITEM(itemData.id))
          } else {
            dispatch(REFRESH_CURRENT_USER_ITEM(itemData.id))
          }
        }

        return (
          <CatalogueItem
            itemData={itemData}
            catalogueData={props.catalogueData}
            isNarrow={!largeViewport}
            editable={true}
            key={itemData.id}
            onEdit={handleEditItem}
            onSave={handleEditConfirm}
            onEditCancel={handleEditCancel}
            onAddComment={handleAddComment}
            onFetchComments={handleFetchComments}
          />
        )
      }),
    [itemsData, props.catalogueData, largeViewport],
  )

  const noItemsMessage = useMemo(() => {
    if (currentUserItems.isCreatingNewItem) return
    return (
      <div className={styles.noContent}>
        <p>You have no items yet,</p>
        <p className={styles.anchor} onClick={handleAddItem}>
          click here to create your first item
        </p>
      </div>
    )
  }, [currentUserItems.isCreatingNewItem, handleAddItem])

  const noItemsFoundMessage = useMemo(() => {
    if (currentUserItems.isCreatingNewItem) {
      return
    }

    return (
      <div className={styles.noItemsFound}>
        <p>No items found</p>
      </div>
    )
  }, [currentUserItems.isCreatingNewItem])

  const addItemButton = useMemo(() => {
    if (largeViewport) {
      return (
        <AddButton
          text="Add new item"
          className={styles.addItemButton}
          onClick={handleAddItem}
        />
      )
    } else {
      return <FixedAddButton onClick={handleAddItem} />
    }
  }, [largeViewport, handleAddItem])

  const clearError = () => {
    dispatch(CLEAR_ITEMS_DATA_ERROR())
  }

  if (
    itemsData == null ||
    props.catalogueData.isFetchingFields ||
    props.catalogueData.isFetchingFieldsChoices ||
    (currentUserItems.isFetchingItems && !itemsData.results?.length)
  ) {
    return <Loader className={styles.loader} />
  }

  const itemsClass = cx('items', {
    showingAll: itemsData.next === null,
  })

  const error = currentUserItems.itemsDataError
  const isItemInCatalogue = catalogue!.itemsRanges.date.min
  const isSearchResult =
    isItemInCatalogue &&
    location.search.length !== 0 &&
    itemsData.results.length === 0
  const showAddItemButton =
    isItemInCatalogue &&
    !currentUserItems.newItemId &&
    !currentUserItems.isCreatingNewItem &&
    catalogue!.permissions.canCreateItems

  return (
    <div className={itemsClass}>
      {showAddItemButton && addItemButton}
      {!isItemInCatalogue && noItemsMessage}
      {isSearchResult && noItemsFoundMessage}
      <PaginatedList
        next={itemsData.next}
        buttonChild="See more"
        isFetching={currentUserItems.isFetchingItems}
        fetchOnButtonClick="once"
        intersectingElement={3}
        onLoadMore={fetchItems}
      >
        {items}
      </PaginatedList>
      <NewItemModal />
      <MessageModal
        show={error !== null}
        title={error?.title}
        message={error?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default CatalogueItems
