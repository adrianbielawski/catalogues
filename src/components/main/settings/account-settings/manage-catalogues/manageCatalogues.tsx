import React, { useEffect, useRef, useState } from 'react'
import styles from './manageCatalogues.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CREATE_CATALOGUE, FETCH_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom hooks
import { useDelay} from 'src/hooks/useDelay'
import { useFirstRender } from 'src/hooks/useFirstRender'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import ManageCatalogue from './manage-catalogue/manageCatalogue'
import Loader from 'components/global-components/loader/loader'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import NewCatalogueModal from './new-catalogue-modal/newCatalogueModal'

const ManageCatalogues = () => {
    const dispatch = useAppDispatch()
    const catalogues = useTypedSelector(state => state.catalogues)
    const newCatalogueDelay = useDelay(catalogues.creatingNewCatalogue)
    const firstRender = useFirstRender()
    const inputRef = useRef<HTMLInputElement>(null)
    const [addingCatalogue, setAddingCatalogue] = useState(false)
    const [inputError, setInputError] = useState('')

    useEffect(() => {
        dispatch(FETCH_CATALOGUES())
    }, [])

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
        if (catalogues.catalogues.find(c => c.name.toLowerCase() === name.toLowerCase())) {
            message = `Catalogue with name "${name}" already exists`
        }

        setInputError(message)
        return message.length === 0
    }

    const items = catalogues.catalogues.map(catalogue => (
        <ManageCatalogue catalogue={catalogue} key={catalogue.id} />
    ))

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
            {catalogues.fetchingCatalogues || firstRender
                ? <Loader size={50} className={styles.loader} />
                : items
            }
            {catalogues.newCatalogueId && (
                <NewCatalogueModal
                    newCatalogueId={catalogues.newCatalogueId}
                />
            )}
        </div>
    )
}

export default ManageCatalogues