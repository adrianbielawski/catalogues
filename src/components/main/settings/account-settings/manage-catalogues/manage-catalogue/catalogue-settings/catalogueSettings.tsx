import React, { useState } from 'react'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueSettings.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CHANGE_DEFAULT_CATALOGUE, DELETE_CATALOGUE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import CatalogueSettingsCategory from '../catalogueSettingsCategory/catalogueSettingsCategory'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import Button from 'components/global-components/button/button'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueSettings = (props: Props) => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState<ProtectedMessage | null>(null)

    const handleChangeDefault = () => {
        dispatch(CHANGE_DEFAULT_CATALOGUE({
            catalogueId: props.catalogue.id,
            default: !props.catalogue.default,
        }))
    }

    const handleDeleteCatalogue = () => {
        setMessage({
            title: 'Delete catalogue',
            value: `Are you sure you want to delete "${props.catalogue.name}" catalogue`,
            expectedInput: props.catalogue.name,
        })
    }

    const deleteCatalogue = () => {
        setMessage(null)
        dispatch(DELETE_CATALOGUE(props.catalogue.id))
    }

    const clearMessage = () => {
        setMessage(null)
    }

    return (
        <div className={styles.catalogueSettings}>
            <CatalogueSettingsCategory
                title={'Catalogue settings'}
                icon={faCogs}
            >
                <>
                    <CheckBoxWithTitle
                        id={'defaultCatalogue'}
                        title={`Default catalogue`}
                        selected={props.catalogue.default}
                        onChange={handleChangeDefault}
                    />
                    <Button
                        className={styles.deleteCatalogueButton}
                        disabled={props.catalogue.deletingCatalogue}
                        onClick={handleDeleteCatalogue}
                    >
                        Delete catalogue
                    </Button>
                </>
            </CatalogueSettingsCategory>
            <ProtectedConfirmMessageModal
                show={message !== null}
                message={message}
                onConfirm={deleteCatalogue}
                onCancel={clearMessage}
            />
        </div>
    )
}

export default CatalogueSettings