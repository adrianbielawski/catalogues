import React, { useEffect, useRef, useState } from 'react'
import styles from './catalogueItem.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector } from 'store/selectors'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom hooks and utils
import { mergeRefs } from 'src/utils'
import { useFirstRender } from 'src/customHooks'
//Custom components
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
import { ADD_ITEM_TO_FAVOURITE, DELETE_ITEM_FROM_FAVOURITE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'

type Props = {
    item: DeserializedItem
}

const CatalogueItem: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const dispatch = useAppDispatch()
    const itemRef = useRef<HTMLLIElement>()
    const carouselWrapperRef = useRef<HTMLDivElement>(null)
    const is800OrLess = useTypedSelector(state => state.app.screenWidth.is800OrLess)
    const item = useTypedSelector(itemSelector(props.item.id))
    const [carouselWrapperWidth, setCarouselWrapperWidth] = useState(0)
    const [showImagesPreview, setShowImagesPreview] = useState(false)
    const catalogue = useTypedSelector(catalogueSelector(props.item.catalogueId))
    const firstRender = useFirstRender()

    useEffect(() => {
        if (!firstRender && itemRef.current !== null && !item.isSubmitting) {
            itemRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [item.isSubmitting, item.isEditing])

    useEffect(() => {
        if (!is800OrLess) {
            window.addEventListener('resize', getCarouselWidth)
        }
        getCarouselWidth()

        return () => {
            window.addEventListener('resize', getCarouselWidth)
        }
    }, [])

    const getCarouselWidth = () => {
        if (carouselWrapperRef.current) {
            const width = carouselWrapperRef.current.getBoundingClientRect().width
            setCarouselWrapperWidth(width)
        }
    }

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

    const imagesCarouselWidth = !is800OrLess ? 200 : carouselWrapperWidth
    const imagesCarouselHeight = !is800OrLess ? 200 : undefined
    const isImagesPreviewAllowed = item.images.length && !is800OrLess
    const showImagesCounter = item.images.length > 1

    return (
        <li className={styles.item} ref={mergeRefs([ref, itemRef])}>
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
                    <div className={styles.wrapper}>
                        <div className={styles.carouselWrapper} ref={carouselWrapperRef}>
                            <ImagesCarousel
                                width={imagesCarouselWidth}
                                height={imagesCarouselHeight}
                                images={item.images}
                                singleView={true}
                                onFullScreenView={isImagesPreviewAllowed ? toggleImagesPreview : undefined}
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
                            <ItemData item={item} />
                            {catalogue.fetchingFields
                                ? <Loader />
                                : <ItemFields item={item} />
                            }
                        </div>
                    </div>
                    {item.commentsData &&
                        <ItemComments
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