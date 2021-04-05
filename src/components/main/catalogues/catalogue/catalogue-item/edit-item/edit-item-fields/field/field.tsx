import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './field.scss'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'

interface Props {
    fieldName: string,
    editComponent: ReactNode,
    isEditing: boolean,
    fieldValue?: any,
    className: string,
    onEditClick: () => void,
}

const cx = classNames.bind(styles)

const Field = (props: Props) => {
    const fieldClass = cx(
        'field',
        props.className,
        {
            active: props.isEditing
        },
    )

    return (
        <li className={fieldClass}>
            <EditableFieldTitle
                title={props.fieldName}
                isEditing={props.isEditing}
                onEdit={props.onEditClick}
            />
            <div className={styles.content}>
                {props.isEditing
                    ? (
                        props.editComponent
                    )
                    : props.fieldValue
                }
            </div>
        </li>
    )
}

export default Field