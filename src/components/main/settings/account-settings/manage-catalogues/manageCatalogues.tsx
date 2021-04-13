import React, { useRef, useState } from 'react'
import styles from './manageCatalogues.scss'
//Redux
import { CREATE_CATALOGUE } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Hooks
import { useDelay } from 'src/hooks/useDelay'
//Components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'
import Loader from 'components/global-components/loader/loader'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import NewCatalogueModal from './new-catalogue-modal/newCatalogueModal'

const ManageCatalogues = () => {
    const dispatch = useAppDispatch()
    const authUserCatalogues = useTypedSelector(state => state.modules.authUserCatalogues)
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const newCatalogueDelay = useDelay(authUserCatalogues.isCreatingNewCatalogue)
    const inputRef = useRef<HTMLInputElement>(null)
    const [addingCatalogue, setAddingCatalogue] = useState(false)
    const [inputError, setInputError] = useState('')

    const handleAddCatalogue = (name: string) => {
        if (inputError.length !== 0) {
            return
        }
        setAddingCatalogue(false)
        setInputError('')
        dispatch(CREATE_CATALOGUE(name))
    }

    const validateName = (name: string) => {
        let message = ''

        if (name.length < 1) {
            message = 'Minimum 1 character'
        }

        authUserCatalogues.cataloguesData.forEach(c => {
            if (catalogues[c.id]?.name.toLowerCase() === name.toLowerCase()) {
                message = `Catalogue with name "${name}" already exists`
            }
        })

        setInputError(message)
        return message.length === 0
    }

    const handleAddClick = () => {
        setAddingCatalogue(true)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateName(e.target.value)
    }

    const inputProps = {
        placeholder: "New catalogue name",
        className: styles.newCatalogueInput,
        onChange: handleNameChange,
    }

    const catalogueComponents = authUserCatalogues.cataloguesData.map(c => (
        <ManageCatalogue catalogueId={c.id} key={c.id} />
    ))
    
    if (authUserCatalogues.isFetchingCatalogues) {
        return <Loader size={50} className={styles.loader} />
    }

    return (
        <div className={styles.manageCatalogues}>
            <div className={styles.addCatalogue}>
                {addingCatalogue
                    ? (
                        <InputWithConfirmButton
                            inputProps={inputProps}
                            invalidInputMessage={inputError}
                            ref={inputRef}
                            onConfirm={handleAddCatalogue}
                        />
                    ) : (
                        <AddButton
                            text="Add new catalogue"
                            loading={newCatalogueDelay}
                            className={styles.addButton}
                            onClick={handleAddClick}
                        />
                    )
                }
            </div>
            {catalogueComponents}
            {authUserCatalogues.newCatalogueId && (
                <NewCatalogueModal
                    catalogueId={authUserCatalogues.newCatalogueId}
                />
            )}
        </div>
    )
}

export default ManageCatalogues