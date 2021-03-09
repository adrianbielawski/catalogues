import React from 'react'
import styles from './newCatalogueModal.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom components
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import ManageCatalogue from '../manage-catalogue/manageCatalogue'
import Button from 'components/global-components/button/button'
import { DELETE_CATALOGUE, NEW_CATALOGUE_CREATED } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'

type Props = {
    newCatalogueId: number,
}

const NewCatalogueModal = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.newCatalogueId))

    const handleEditConfirm = () => {
        dispatch(NEW_CATALOGUE_CREATED())
    }

    const handleEditCancel = () => {
        dispatch(DELETE_CATALOGUE(props.newCatalogueId))
    }

    return (
        <AnimatedModal
            show={props.newCatalogueId !== null}
            className={styles.newCatalogueModal}
        >
            <div className={styles.catalogue}>
                <ManageCatalogue
                    catalogue={catalogue}
                />
                <div className={styles.buttons}>
                    <Button
                        disabled={catalogue.name.length === 0}
                        onClick={handleEditConfirm}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={handleEditCancel}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </AnimatedModal>
    )
}

export default NewCatalogueModal