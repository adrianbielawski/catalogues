import React from 'react'
import styles from './manageCatalogues.scss'
//Redux
import AddButton from 'components/global-components/add-button/addButton'

const ManageCatalogues = () => {
    const handleAddButtonClick = () => {

    }

    return (
        <div className={styles.manageCatalogues}>
            <AddButton
                text="Add new catalogue"
                className={styles.addButton}
                onClick={handleAddButtonClick}
            />
        </div>
    )
}

export default ManageCatalogues