import React, { useState } from 'react'
import styles from './catalogueTitle.scss'
//Custom components
import EditableField from 'components/global-components/editable-field/editableField'

type Props = {
    id: number | string,
    name: string,
}

const CatalogueTitle = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditName = () => {
        setIsEditing(!isEditing)
    }

    const handleNameChange = () => {
        setIsEditing(false)
        
    }

    return (
        <div className={styles.catalogueTitle}>
            <EditableField
                id={`Catalogue title ${props.id}`}
                title="Name"
                content={[`${props.name}`]}
                isEditing={isEditing}
                isSubmitting={false}
                onEditClick={handleEditName}
                onConfirm={handleNameChange}
            />
        </div>
    )
}

export default CatalogueTitle