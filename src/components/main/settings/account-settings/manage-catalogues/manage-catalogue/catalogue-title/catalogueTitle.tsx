import React, { useState } from 'react'
import styles from './catalogueTitle.scss'
//Redux
import {
    CHANGE_CATALOGUE_NAME, TOGGLE_CATALOGUE_NAME_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom components
import EditableFieldWithConfirm from 'components/global-components/editable-field/editableFieldWithConfirm'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    id: number,
    name: string,
}

const CatalogueTitle = (props: Props) => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState('')
    const catalogue = useTypedSelector(catalogueSelector(props.id))

    const validateName = (name: string) => {
        let error = null
        if (!name.length) {
            error = `Please set catalogue name`
        }
        return {
            valid: error === null,
            error,
        }
    }

    const handleNameChange = (input: string[]) => {
        const { valid, error } = validateName(input[0])
        if (!valid) {
            setError(error!)
            return
        }
        dispatch(CHANGE_CATALOGUE_NAME({
            catalogueId: props.id,
            name: input[0]
        }))
    }

    const clearError = () => {
        setError('')
    }

    const handleEditName = () => {
        dispatch(TOGGLE_CATALOGUE_NAME_EDIT(props.id))
    }

    return (
        <div className={styles.catalogueTitle}>
            <EditableFieldWithConfirm
                id={`Catalogue title ${props.id}`}
                title="Name"
                content={[`${props.name}`]}
                isEditing={catalogue.isEditingCatalogueName}
                isSubmitting={catalogue.isSubmittingCatalogueName}
                onEditClick={handleEditName}
                onConfirm={handleNameChange}
            />
            <MessageModal
                show={error.length !== 0}
                title={'Catalogue name error'}
                message={error}
                onConfirm={clearError}
            />
        </div>
    )
}

export default CatalogueTitle