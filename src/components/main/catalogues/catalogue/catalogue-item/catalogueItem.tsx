import React, { useEffect, useRef, useState } from 'react'
import styles from './catalogueItem.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
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
import FavouriteItemIcon from './favourite-item-icon/favouriteItemIcon'

type Props = {
    item: DeserializedItem
}

const CatalogueItem: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const itemRef = useRef<HTMLLIElement>()
    const carouselWrapperRef = useRef<HTMLDivElement>(null)
    const item = useTypedSelector(itemSelector(props.item.id))
    const [carouselWrapperWidth, setCarouselWrapperWidth] = useState(0)
    const [showImagesPreview, setShowImagesPreview] = useState(false)
    const catalogue = useTypedSelector(catalogueSelector(props.item.catalogueId))
    const firstRender = useFirstRender()
    const screenWidth = window.innerWidth

    useEffect(() => {
        if (!firstRender && itemRef.current !== null && !item.isSubmitting) {
            itemRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [item.isSubmitting, item.isEditing])

    useEffect(() => {
        if (screenWidth > 800) {
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

    const imagesCarouselWidth = screenWidth > 800 ? 200 : carouselWrapperWidth
    const imagesCarouselHeight = screenWidth > 800 ? 200 : undefined
    const isImagesPreviewAllowed = item.images.length && screenWidth > 800
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
                                    <FavouriteItemIcon
                                        itemId={item.id}
                                        isFavourite={item.isFavourite}
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