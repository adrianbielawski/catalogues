import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './editableField.module.scss'
//Custom components
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props {
    title: string,
    content: ReactNode,
    isEditing: boolean,
    className?: string,
    onEditClick: () => void,
}

const cx = classNames.bind(styles)

const EditableField = (props: Props) => {
    const { title, content, isEditing, className, onEditClick } = props

    const handleEdit = () => {
        onEditClick()
    }

    const editableFieldClass = cx(
        'editableField',
        className,
        {
            active: isEditing
        },
    )

    return (
        <div className={editableFieldClass}>
            <EditableFieldTitle
                title={title}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            < div className={styles.content}>
                {content}
            </div>
        </div >
    )
}

export default EditableField