import React, { useState } from 'react'
import styles from './addField.scss'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'

const AddField = () => {
    const [active, setActive] = useState(false)

    const toggleAddFieldForm = () => {
        setActive(!active)
    }

    return (
        <div className={styles.addField}>
            { !active
                ?
                <AddButton
                    className={styles.addButton}
                    text="Add new field"
                    onClick={toggleAddFieldForm}
                />
                :
                <FieldForm
                    active={active}
                    onConfirm={toggleAddFieldForm}
                    onCancel={toggleAddFieldForm}
                />
            }
        </div>
    )
}

export default AddField