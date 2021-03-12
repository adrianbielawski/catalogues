import React, { useState } from 'react'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import styles from './catalogueSettings.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import {
    CHANGE_DEFAULT_CATALOGUE, CHANGE_PUBLIC_CATALOGUE, DELETE_CATALOGUE
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import Button from 'components/global-components/button/button'
import
ProtectedConfirmMessageModal, { ProtectedMessage }
    from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'

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

    const handlePublicDefault = () => {
        dispatch(CHANGE_PUBLIC_CATALOGUE({
            catalogueId: props.catalogue.id,
            public: !props.catalogue.public,
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
            <IconWithTitle
                title={'Catalogue settings'}
                icon={faCogs}
            >
                <div className={styles.options}>
                    <CheckBoxWithTitle
                        id={'defaultCatalogue'}
                        title={`Default catalogue`}
                        selected={props.catalogue.default}
                        onChange={handleChangeDefault}
                    />
                    <CheckBoxWithTitle
                        id={'publicCatalogue'}
                        title={`Public catalogue`}
                        selected={props.catalogue.public}
                        onChange={handlePublicDefault}
                    />
                </div>
                <Button
                    className={styles.deleteCatalogueButton}
                    disabled={props.catalogue.deletingCatalogue}
                    onClick={handleDeleteCatalogue}
                >
                    Delete catalogue
                </Button>
            </IconWithTitle>
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