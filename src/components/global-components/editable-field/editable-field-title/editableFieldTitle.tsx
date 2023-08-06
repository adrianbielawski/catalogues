import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './editableFieldTitle.module.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
    title: string,
    isEditing: boolean,
    className?: string,
    onEdit: () => void,
}

const cx = classNames.bind(styles)

const EditableFieldTitle = (props: Props) => {
    const editableFieldTitleClass = cx(
        'editableFieldTitle',
        props.className,
        {
            active: props.isEditing,
        },
    )

    const editButtonClass = cx(
        'editButton',
        {
            active: props.isEditing,
        },
    )

    return (
        <div className={editableFieldTitleClass}>
            <TransparentButton className={editButtonClass} onClick={props.onEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            <p className={styles.title}>
                {props.title}:
            </p>
        </div>
    )
}

export default EditableFieldTitle