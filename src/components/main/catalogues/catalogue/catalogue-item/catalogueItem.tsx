import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueItem.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector } from 'store/selectors'
import {
    REFRESH_ITEM,
    REMOVE_ITEM_FROM_STATE, SAVE_ITEM, TOGGLE_EDIT_ITEM
} from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom hooks and utils
import { mergeRefs, scrollTop } from 'src/utils'
import { useFirstRender } from 'src/customHooks'
//Custom components
import ItemFields from './item-fields/itemFields'
import EditItem from './edit-item/editItem'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from 'components/global-components/loader/loader'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import Modal from 'components/global-components/modal/modal'

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
    const item = useTypedSelector(itemSelector(props.item.id))
    const [carouselWrapperWidth, setCarouselWrapperWidth] = useState(0)
    const [fullScreenImagesView, setFullScreenImagesView] = useState(false)
    const catalogue = useTypedSelector(catalogueSelector(props.item.catalogueId))
    const firstRender = useFirstRender()
    const isNewItem = item.id.toString().startsWith('newItem')
    const screenWidth = window.innerWidth

    useEffect(() => {
        if (!firstRender && itemRef.current !== null && !item.isSubmitting) {
            itemRef.current!.scrollIntoView({ behavior: 'smooth' })
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

    const handleEdit = () => {
        dispatch(TOGGLE_EDIT_ITEM(item.id))
    }

    const handleEditConfirm = () => {
        dispatch(SAVE_ITEM(item))
    }

    const handleCancel = () => {
        if (isNewItem) {
            dispatch(REMOVE_ITEM_FROM_STATE(item.id))
            scrollTop()
        } else {
            dispatch(REFRESH_ITEM({ itemId: item.id as number, prevId: item.id }))
        }
    }

    const toggleFullScreenImagesView = () => {
        setFullScreenImagesView(!fullScreenImagesView)
    }

    const imagesCawouselWidth = screenWidth > 800 ? 200 : carouselWrapperWidth
    const imagesCawouselHeight = screenWidth > 800 ? 200 : undefined

    return (
        <li className={styles.item} ref={mergeRefs([ref, itemRef])}>
            {item.isEditing
                ? (
                    <EditItem
                        show={item.isEditing}
                        item={props.item}
                        onEditConfirm={handleEditConfirm}
                        onCancel={handleCancel}
                    />
                )
                : <>
                    <div className={styles.carouselWrapper} ref={carouselWrapperRef}>
                        <ImagesCarousel
                            width={imagesCawouselWidth}
                            height={imagesCawouselHeight}
                            images={item.images}
                            singleView={true}
                            onFullScreenView={item.images.length ? toggleFullScreenImagesView : undefined}
                        />
                    </div>
                    <div className={styles.itemContent}>
                        <div className={styles.wrapper}>
                            {!isNewItem &&
                                <p className={styles.itemId}>
                                    Id:<span> {props.item.id}</span>
                                </p>
                            }
                            <TransparentButton className={styles.editButton} onClick={handleEdit}>
                                <FontAwesomeIcon icon={faEdit} />
                            </TransparentButton>
                        </div>
                        {catalogue.fetchingFields
                            ? <Loader />
                            : <ItemFields item={item} />
                        }
                    </div>
                </>
            }
            <Modal
                show={fullScreenImagesView}
                className={styles.modal}
                onClose={toggleFullScreenImagesView}
            >
                <ImagesCarousel
                    width={screenWidth * .9}
                    height={window.innerHeight * .9}
                    images={item.images}
                    singleView={true}
                    fullSizeImages={true}
                />
            </Modal>
        </li>
    )
}

export default React.forwardRef(CatalogueItem)