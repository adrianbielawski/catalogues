import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueItem.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, itemSelector } from 'store/selectors'
import {
    REMOVE_ITEM_FROM_STATE, SAVE_ITEM, TOGGLE_EDIT_ITEM
} from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom hooks and utils
import { mergeRefs, scrollTop } from 'src/utils'
import { useFirstRender } from 'src/customHooks'
//Custom components
import ItemFields from './item-fields/itemFields'
import MainImage from './main-image/mainImage'
import EditItem from './edit-item/editItem'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from 'components/global-components/loader/loader'

type Props = {
    item: DeserializedItem
}

const CatalogueItem: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const dispatch = useAppDispatch()
    const itemRef = useRef<HTMLLIElement>()
    const item = useTypedSelector(itemSelector(props.item.id))
    const catalogue = useTypedSelector(catalogueSelector(props.item.catalogueId))
    const firstRender = useFirstRender()
    const isNewItem = item.id.toString().startsWith('newItem')

    useEffect(() => {
        if (!firstRender && itemRef.current !== null && !item.isSubmitting) {
            itemRef.current!.scrollIntoView({ behavior: 'smooth' })
        }
    }, [item.isSubmitting])

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
            dispatch(TOGGLE_EDIT_ITEM(item.id))
        }
    }

    const image = item.images.filter(img => img.isPrimary)[0]

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
                    <MainImage imgURL={image?.imageThumbnail as string} />
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
        </li>
    )
}

export default React.forwardRef(CatalogueItem)