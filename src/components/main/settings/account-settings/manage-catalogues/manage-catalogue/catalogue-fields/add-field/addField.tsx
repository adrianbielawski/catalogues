import React from 'react'
import styles from './addField.scss'
//Redux
import { TOGGLE_ADD_FIELD } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
//Components
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'
import AnimateHeight from 'react-animate-height'

type Props = {
    catalogueId: number,
}

const AddField = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(authUserCatalogueDataSelector(props.catalogueId))

    const handleAddClick = () => {
        dispatch(TOGGLE_ADD_FIELD(catalogue.id))
    }

    return (
        <AnimateHeight height={catalogue.isAddFieldFormActive ? "auto" : 46}>
            {!catalogue.isAddFieldFormActive
                ?
                <AddButton
                    className={styles.addButton}
                    text="Add new field"
                    onClick={handleAddClick}
                />
                :
                <FieldForm
                    catalogueId={props.catalogueId}
                    active={catalogue.isAddFieldFormActive}
                />
            }
        </AnimateHeight>
    )
}

export default AddField