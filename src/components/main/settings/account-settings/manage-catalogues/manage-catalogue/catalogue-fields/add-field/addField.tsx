import React from 'react'
import styles from './addField.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
import { TOGGLE_ADD_FIELD } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'

type Props = {
    catalogueId: number,
}

const AddField = (props: Props) => {
    const dispatch = useAppDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))

    const handleAddClick = () => {
        dispatch(TOGGLE_ADD_FIELD(catalogue.id))
    }

    return (
        <div className={styles.addField}>
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
        </div>
    )
}

export default AddField