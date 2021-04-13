import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './catalogueItem.scss'
//Redux
import { ADD_ITEM_TO_FAVOURITE, DELETE_ITEM_FROM_FAVOURITE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector, currentUserCatalogueSelector } from 'store/selectors'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Hooks and utils
import { mergeRefs } from 'src/utils'
import { useFirstRender } from 'src/hooks/useFirstRender'
//Components
import ItemFields from './item-fields/itemFields'
import EditItem from './edit-item/editItem'
import Loader from 'components/global-components/loader/loader'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import ImagesPreview from './images-preview/imagesPreview'
import ItemData from './item-data/itemData'
import ItemRating from './item-rating/itemRating'
import EditItemButton from './edit-item/edit-item-button/editItemButton'
import ItemComments from './item-comments/itemComments'
import FavouriteIcon from 'components/global-components/favourite-icon/favouriteIcon'
import ItemHeader from './item-header/itemHeader'

type Props = {
    item: DeserializedItem,
    isNarrow: boolean,
    className?: string,
}

const cx = classNames.bind(styles)

const CatalogueItem: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const dispatch = useAppDispatch()
    const itemRef = useRef<HTMLLIElement>()
    const item = useTypedSelector(itemSelector(props.item.id))
    const [showImagesPreview, setShowImagesPreview] = useState(false)
    const catalogue = useTypedSelector(catalogueSelector(props.item.catalogueId))
    const catalogueData = useTypedSelector(currentUserCatalogueSelector(catalogue.id))
    const firstRender = useFirstRender()

    useEffect(() => {
        if (!firstRender && itemRef.current !== null && !item.isSubmitting) {
            itemRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [item.isSubmitting, item.isEditing])

    const toggleImagesPreview = () => {
        setShowImagesPreview(!showImagesPreview)
    }

    const handleFavouriteChange = () => {
        if (!props.item.isFavourite) {
            dispatch(ADD_ITEM_TO_FAVOURITE(props.item.id))
        } else {
            dispatch(DELETE_ITEM_FROM_FAVOURITE(props.item.id))
        }
    }

    const isImagesPreviewAllowed = item.images.length && !props.isNarrow
    const showImagesCounter = item.images.length > 1

    const itemClass = cx(
        'item',
        props.className,
        {
            narrow: props.isNarrow,
        }
    )

    return (
        <li className={itemClass} ref={mergeRefs([ref, itemRef])}>
            {item.isEditing
                ? (
                    <EditItem
                        show={item.isEditing}
                        itemId={props.item.id}
                        isItemNew={false}
                        className={styles.editItem}
                    />
                )
                : <>
                    <ItemHeader
                        className={styles.itemHeader}
                        userImage={item.createdBy.imageThumbnail}
                        username={item.createdBy.username}
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
                                withShadow={!props.isNarrow}
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
                            {catalogueData.isFetchingFields
                                ? <Loader />
                                : (
                                    <ItemFields
                                        className={styles.itemFields}
                                        item={item}
                                    />
                                )
                            }
                        </div>
                    </div>
                    {item.commentsData &&
                        <ItemComments
                            className={styles.itemComments}
                            itemId={item.id}
                            commentsData={item.commentsData}
                            canComment={item.permissions.canComment}
                        />
                    }
                </>
            }
            <ImagesPreview
                show={showImagesPreview}
                images={item.images}
                onClose={toggleImagesPreview}
            />
        </li>
    )
}

export default React.forwardRef(CatalogueItem)