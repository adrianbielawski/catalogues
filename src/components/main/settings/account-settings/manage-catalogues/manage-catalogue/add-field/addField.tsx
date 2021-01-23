import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './addField.scss'
//Redux
import { useTypedSelector } from 'store/reducers'
import { catalogueSelector } from 'store/selectors'
import { toggleAddField } from 'store/actions/settingsActions'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'

type Props = {
    catalogueId: number,
}

const AddField = (props: Props) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))

    const handleAddClick = () => {
        dispatch(toggleAddField(catalogue.id))
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