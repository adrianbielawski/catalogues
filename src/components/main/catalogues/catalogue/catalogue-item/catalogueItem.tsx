import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './catalogueItem.scss'
//Redux
import { CHANGE_FAVOURITE_ITEM, CLEAR_ITEM_ERROR } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector, userSelector } from 'store/selectors'
//Types
import { DeserializedItemData } from 'src/globalTypes'
//Hooks and utils
import { mergeRefs } from 'src/utils'
import { useFirstRender } from 'src/hooks/useFirstRender'
//Components
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

type Props = {
    itemData: DeserializedItemData,
    isNarrow: boolean,
    className?: string,
    onAddComment: (text: string, parentId?: number) => void,
    onFetchComments: (page: number | null) => void,
}

const cx = classNames.bind(styles)

const CatalogueItem: React.ForwardRefRenderFunction<
    HTMLDivElement,
    Props
> = (props, ref) => {
    const { itemData, isNarrow, className } = props
    const dispatch = useAppDispatch()
    const largeViewport = useTypedSelector(state => state.modules.app.screenWidth.largeViewport)
    const item = useTypedSelector(itemSelector(itemData.id))
    const user = useTypedSelector(userSelector(item.createdBy))
    const catalogue = useTypedSelector(catalogueSelector(item.catalogueId))
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
        dispatch(CHANGE_FAVOURITE_ITEM({
            itemId: item.id,
            isFavourite: !item.isFavourite,
        }))
    }

    const clearError = () => {
        dispatch(CLEAR_ITEM_ERROR(item.id))
    }

    const isImagesPreviewAllowed = item.images.length && largeViewport
    const showImagesCounter = item.images.length > 1
    const error = itemData.itemError

    const itemClass = cx(
        'item',
        className,
        {
            narrow: isNarrow,
        }
    )

    return (
        <div className={itemClass} ref={mergeRefs([ref, itemRef])}>
            {itemData.isEditing
                ? (
                    <EditItem
                        show={itemData.isEditing}
                        itemId={item.id}
                        isItemNew={false}
                        className={styles.editItem}
                    />
                )
                : <>
                    <ItemHeader
                        className={styles.itemHeader}
                        userImage={user.imageThumbnail}
                        username={user.username}
                        catalogueImage={catalogue.imageThumbnail}
                        catalogueName={catalogue.name}
                        slug={catalogue.slug}
                    />
                    <div className={styles.wrapper}>
                        <div className={styles.carouselWrapper}>
                            <ImagesCarousel
                                images={item.images}
                                useThumbnails={true}
                                singleView={true}
                                withShadow={!isNarrow}
                                onImageClick={isImagesPreviewAllowed ? toggleImagesPreview : undefined}
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
                                {item.permissions.canEdit &&
                                    <EditItemButton itemId={item.id} />
                                }
                            </div>
                            <ItemData
                                className={styles.itemData}
                                item={item}
                            />
                            <ItemFields
                                className={styles.itemFields}
                                item={item}
                                isNarrow={props.isNarrow}
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
                        onAdd={props.onAddComment}
                        onFetch={props.onFetchComments}
                    />
                </>
            }
            <ImagesPreview
                show={showImagesPreview}
                images={item.images}
                onClose={toggleImagesPreview}
            />
            <MessageModal
                show={error !== null}
                title={error?.title}
                message={error?.message || ''}
                onConfirm={clearError}
            />
        </div>
    )
}

export default React.forwardRef(CatalogueItem)