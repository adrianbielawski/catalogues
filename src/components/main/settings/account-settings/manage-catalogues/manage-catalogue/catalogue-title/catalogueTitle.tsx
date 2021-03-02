import React, { useRef, useState } from 'react'
import styles from './catalogueTitle.scss'
//Redux
import {
    CHANGE_CATALOGUE_NAME, CLEAR_NAME_CHANGE_ERROR, TOGGLE_CATALOGUE_NAME_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { useDebouncedDispatch } from 'src/customHooks'

type Props = {
    id: number,
    name: string,
}

const CatalogueTitle = (props: Props) => {
    const dispatch = useAppDispatch()
    const [inputError, setInputError] = useState('')
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const catalogue = useTypedSelector(catalogueSelector(props.id))

    const validateName = (name: string) => {
        let message = ''
        
        if (name.length < 2) {
            message = 'Minimum 2 characters'
        }
        if (catalogues.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== catalogue.id)) {
            message = `Catalogue with name "${name}" already exists`
        }

        setInputError(message)
        return message.length === 0
    }

    const handleEditName = () => {
        dispatch(TOGGLE_CATALOGUE_NAME_EDIT(props.id))
    }

    const nameInputRef = useDebouncedDispatch(
        name => CHANGE_CATALOGUE_NAME({
            catalogueId: props.id,
            name
        }),
        500,
        validateName,
    )

    const clearError = () => {
        dispatch(CLEAR_NAME_CHANGE_ERROR(catalogue.id))
    }
    
    const error = catalogue.changeNameError

    return (
        <div className={styles.catalogueTitle}>
            <EditableField
                title="Name"
                content={props.name}
                isEditing={catalogue.isEditingCatalogueName}
                invalidInputMessage={inputError}
                onEditClick={handleEditName}
                ref={nameInputRef}
            />
            <MessageModal
                show={error.message.length !== 0}
                title={'Catalogue name error'}
                message={error.message}
                onConfirm={clearError}
            />
        </div>
    )
}

export default CatalogueTitle