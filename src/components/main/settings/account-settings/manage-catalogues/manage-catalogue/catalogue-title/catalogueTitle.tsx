import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './catalogueTitle.scss'
//Redux
import { toggleCatalogueNameEdit, changeCatalogueName } from 'store/actions/settingsActions'
import { useTypedSelector } from 'store/reducers'
import { catalogueSelector } from 'store/selectors'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'

type Props = {
    id: number,
    name: string,
}

const CatalogueTitle = (props: Props) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.id))  

    const handleEditName = () => {
        dispatch(toggleCatalogueNameEdit(props.id))
    }

    const handleNameChange = (input: string[]) => {
        dispatch(changeCatalogueName(props.id, input[0]))
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