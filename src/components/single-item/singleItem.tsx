import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DeserializedItem } from 'src/globalTypes'
import {
  CLEAR_SINGLE_ITEM_DATA,
  CLEAR_SINGLE_ITEM_ERROR,
  FETCH_SINGLE_ITEM,
  FETCH_MORE_SINGLE_ITEM_COMMENTS,
  POST_SINGLE_ITEM_COMMENT,
  TOGGLE_EDIT_SINGLE_ITEM,
  SAVE_SINGLE_ITEM,
  REFRESH_SINGLE_ITEM,
} from 'store/modules/single-item/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import Header from 'components/global-components/header/header'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import MessageModal from 'components/global-components/message-modal/messageModal'
import Loader from 'components/global-components/loader/loader'
import styles from './singleItem.module.scss'
import useMinContentHeight from 'src/hooks/useMinContentHeight'
import useRefCallback from 'src/hooks/useRefCallback'

const Item = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { itemId } = useParams()

  const { authUser } = useTypedSelector((state) => state.modules)
  const screenWidth = useTypedSelector((state) => state.modules.app.screenWidth)
  const singleItem = useTypedSelector((state) => state.modules.singleItem)

  const [rect, ref] = useRefCallback<HTMLDivElement>()
  const minHeight = useMinContentHeight(rect)

  useEffect(() => {
    fetchItem()

    return () => {
      dispatch(CLEAR_SINGLE_ITEM_DATA())
    }
  }, [authUser.id])

  const fetchItem = () => {
    if (!itemId) {
      return
    }
    dispatch(FETCH_SINGLE_ITEM(Number(itemId)))
  }

  const handleEditItem = () => {
    dispatch(TOGGLE_EDIT_SINGLE_ITEM())
  }

  const handleEditConfirm = (item: DeserializedItem) => {
    dispatch(SAVE_SINGLE_ITEM(item))
  }

  const handleEditCancel = () => {
    if (!itemId) {
      return
    }
    dispatch(REFRESH_SINGLE_ITEM(Number(itemId)))
  }

  const handleAddComment = (text: string, parentId?: number) => {
    dispatch(
      POST_SINGLE_ITEM_COMMENT({
        itemId: singleItem.itemData!.id,
        text,
        parentId,
      }),
    )
  }

  const handleFetchComments = (page: number) => {
    dispatch(
      FETCH_MORE_SINGLE_ITEM_COMMENTS({
        itemId: singleItem.itemData!.id,
        page,
      }),
    )
  }

  const clearError = () => {
    dispatch(CLEAR_SINGLE_ITEM_ERROR())
    navigate('/')
  }

  const error = singleItem.error

  if (!itemId) {
    return null
  }

  return (
    <div
      className={styles.singleItem}
      style={{ minHeight: `${minHeight}px` }}
      ref={ref}
    >
      <Header />
      {singleItem.isFetchingData && <Loader className={styles.loader} />}
      {singleItem.itemData === null && !singleItem.isFetchingData && (
        <p className={styles.noItemFound}>
          {`Item with id: ${itemId} does not exist`}
        </p>
      )}
      {singleItem.itemData?.id && !singleItem.isFetchingData && (
        <div className={styles.content}>
          <CatalogueItem
            className={styles.item}
            itemData={singleItem.itemData}
            catalogueData={singleItem.catalogueData!}
            isNarrow={!screenWidth.largeViewport}
            editable={true}
            largeImage={screenWidth.largeViewport}
            key={itemId}
            onEdit={handleEditItem}
            onSave={handleEditConfirm}
            onEditCancel={handleEditCancel}
            onAddComment={handleAddComment}
            onFetchComments={handleFetchComments}
          />
        </div>
      )}
      <MessageModal
        show={error !== null}
        title={error?.title}
        message={error?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default Item
