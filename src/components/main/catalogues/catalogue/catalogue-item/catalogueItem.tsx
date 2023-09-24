import {
  useEffect,
  useRef,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import classNames from 'classnames/bind'
import styles from './catalogueItem.module.scss'
import {
  CHANGE_FAVOURITE_ITEM,
  REFRESH_CURRENT_USER_ITEM,
} from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector, userSelector } from 'store/selectors'
import {
  AuthUserCatalogueData,
  CurrentUserCatalogueData,
  DeserializedItem,
  DeserializedItemData,
} from 'src/globalTypes'
import { mergeRefs } from 'src/utils'
import { useFirstRender } from 'src/hooks/useFirstRender'
import ItemFields from './item-fields/itemFields'
import EditItem from './edit-item/editItem'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import ImagesPreview from './images-preview/imagesPreview'
import ItemData from './item-data/itemData'
import ItemRating from './item-rating/itemRating'
import EditItemButton from './edit-item/edit-item-button/editItemButton'
import ItemComments from './item-comments/itemComments'
import FavouriteIcon from 'components/global-components/favourite-icon/favouriteIcon'
import ItemHeader from './item-header/itemHeader'
import MessageModal from 'components/global-components/message-modal/messageModal'
import ShareButton from 'components/global-components/share-button/shareButton'

interface EditableItemProps {
  itemData: DeserializedItemData
  catalogueData: AuthUserCatalogueData | CurrentUserCatalogueData
  isNarrow: boolean
  editable: true
  largeImage?: boolean
  className?: string
  onEdit: () => void
  onSave: (item: DeserializedItem) => void
  onEditCancel: (isNew: boolean) => void
  onAddComment: (text: string, parentId?: number) => void
  onFetchComments: (page: number) => void
}

interface ItemProps {
  itemData: DeserializedItemData
  catalogueData?: CurrentUserCatalogueData
  isNarrow: boolean
  editable: false
  largeImage?: boolean
  className?: string
  onEdit?: never
  onSave?: never
  onEditCancel?: never
  onAddComment: (text: string, parentId?: number) => void
  onFetchComments: (page: number) => void
}

type Props = ItemProps | EditableItemProps

const cx = classNames.bind(styles)

const CatalogueItem: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    itemData,
    isNarrow,
    className,
    largeImage,
    editable,
    catalogueData,
    onSave,
    onEdit,
    onEditCancel,
    onAddComment,
    onFetchComments,
  },
  ref,
) => {
  const dispatch = useAppDispatch()

  const largeViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.largeViewport,
  )
  const item = useTypedSelector(itemSelector(itemData.id))!
  const user = useTypedSelector(userSelector(item.createdBy))!
  const catalogue = useTypedSelector(catalogueSelector(item.catalogueId))!

  const itemRef = useRef<HTMLDivElement>()

  const [showImagesPreview, setShowImagesPreview] = useState(false)

  const firstRender = useFirstRender()

  useEffect(() => {
    if (!firstRender && itemRef.current !== null && !itemData.isSubmitting) {
      itemRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [itemData.isSubmitting, itemData.isEditing])

  const toggleImagesPreview = () => {
    setShowImagesPreview(!showImagesPreview)
  }

  const handleFavouriteChange = () => {
    dispatch(
      CHANGE_FAVOURITE_ITEM({
        itemId: item.id,
        isFavourite: !item.isFavourite,
      }),
    )
  }

  const handleEdit = () => {
    onEdit?.()
  }

  const refreshItem = () => {
    dispatch(REFRESH_CURRENT_USER_ITEM(item.id))
  }

  const shareData = {
    title: 'Catalogues',
    url: `https://catalogues.adrian.bielaw.ski/item/${item.id}`,
  }
  const isImagesPreviewAllowed = item.images.length > 0 && largeViewport
  const showImagesCounter = item.images.length > 1
  const error = itemData.itemError

  const itemClass = cx('item', className, {
    narrow: isNarrow,
  })

  const carouselWrapperClass = cx('carouselWrapper', {
    large: largeImage && !isNarrow,
  })

  return (
    <div className={itemClass} ref={mergeRefs([ref, itemRef])}>
      {itemData.isEditing && editable ? (
        <EditItem
          itemId={item.id}
          itemData={itemData}
          catalogueData={catalogueData as AuthUserCatalogueData}
          isItemNew={false}
          onSave={onSave}
          onCancel={onEditCancel}
        />
      ) : (
        <>
          <ItemHeader
            className={styles.itemHeader}
            userImage={user.imageThumbnail}
            username={user.username}
            catalogueImage={catalogue.imageThumbnail}
            catalogueName={catalogue.name}
            slug={catalogue.slug}
          />
          <div className={styles.wrapper}>
            <div className={carouselWrapperClass}>
              <ImagesCarousel
                images={item.images}
                useThumbnails={true}
                singleView={true}
                withShadow={!isNarrow}
                onImageClick={
                  isImagesPreviewAllowed ? toggleImagesPreview : undefined
                }
                showCounter={showImagesCounter}
              />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.ratingWrapper}>
                <ItemRating item={item} />
                {item.permissions.canAddToFavourites && (
                  <FavouriteIcon
                    className={styles.favouriteIcon}
                    active={item.isFavourite}
                    onChange={handleFavouriteChange}
                  />
                )}
                <ShareButton className={styles.shareButton} data={shareData} />
                {item.permissions.canEdit && editable && (
                  <EditItemButton itemId={item.id} onClick={handleEdit} />
                )}
              </div>
              <ItemData className={styles.itemData} item={item} />
              <ItemFields
                className={styles.itemFields}
                item={item}
                isNarrow={isNarrow}
              />
            </div>
          </div>
          <ItemComments
            className={styles.itemComments}
            itemId={item.id}
            images={item.images}
            commentsData={itemData.commentsData}
            isPostingComment={itemData.isPostingComment}
            isFetchingComments={itemData.isFetchingComments}
            canComment={item.permissions.canComment}
            onAdd={onAddComment}
            onFetch={onFetchComments}
          />
        </>
      )}
      <ImagesPreview
        show={showImagesPreview}
        images={item.images}
        onClose={toggleImagesPreview}
      />
      <MessageModal
        show={error !== null}
        title={error?.title}
        message={error?.message ?? ''}
        onConfirm={refreshItem}
      />
    </div>
  )
}

export default forwardRef(CatalogueItem)
