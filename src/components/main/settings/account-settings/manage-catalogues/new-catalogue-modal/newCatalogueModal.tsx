import React from 'react'
import styles from './newCatalogueModal.module.scss'
//Redux
import { DELETE_CATALOGUE, NEW_CATALOGUE_CREATED } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Components
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import ManageCatalogue from '../manage-catalogue/manageCatalogue'
import Button from 'components/global-components/button/button'

type Props = {
    catalogueId: number,
}

const NewCatalogueModal = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))

    const handleEditConfirm = () => {
        dispatch(NEW_CATALOGUE_CREATED())
    }

    const handleEditCancel = () => {
        dispatch(DELETE_CATALOGUE(props.catalogueId))
    }

    return (
        <AnimatedModal
            show={props.catalogueId !== null}
            className={styles.newCatalogueModal}
        >
            <div className={styles.catalogue}>
                <ManageCatalogue
                    catalogueId={catalogue.id}
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