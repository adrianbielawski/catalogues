import React from 'react'
import styles from './catalogueTitle.scss'
//Redux
import { CHANGE_CATALOGUE_NAME, TOGGLE_CATALOGUE_NAME_EDIT } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'

type Props = {
    id: number,
    name: string,
}

const CatalogueTitle = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.id))  

    const handleEditName = () => {
        dispatch(TOGGLE_CATALOGUE_NAME_EDIT(props.id))
    }

    const handleNameChange = (input: string[]) => {
        dispatch(CHANGE_CATALOGUE_NAME({
            catalogueId: props.id,
            name: input[0]
        }))
    }

    return (
        <div className={styles.catalogueTitle}>
            <EditableField
                id={`Catalogue title ${props.id}`}
                title="Name"
                content={[`${props.name}`]}
                isEditing={catalogue.isEditingCatalogueName}
                isSubmitting={catalogue.isSubmittingCatalogueName}
                onEditClick={handleEditName}
                onConfirm={handleNameChange}
            />
        </div>
    )
}

export default CatalogueTitle