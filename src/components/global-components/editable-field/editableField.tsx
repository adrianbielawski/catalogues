import React from 'react'
import styles from './editableField.scss'
//Custom components
import Input from 'components/global-components/input/input'
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>  {
    title: string,
    content: string,
    isEditing: boolean,
    invalidInputMessage?: string,
    onEditClick: () => void,
}

const EditableField: React.ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => {
    const { title, content, isEditing, invalidInputMessage, onEditClick, ...rest } = props

    const handleEdit = () => {
        props.onEditClick()
    }

    const getField = () => {
        if (isEditing) {
            return (
                <Input
                    defaultValue={content}
                    invalidInputMessage={invalidInputMessage}
                    ref={ref}
                    { ...rest }
                />
            )
        } else {
            return content
        }
    }

    return (
        <div className={styles.editableField}>
            <EditableFieldTitle
                title={title}
                isEditing={isEditing}
                onEdit={handleEdit}
            />
            < div className={styles.content}>
                {getField()}
            </div>
        </div >
    )
}

export default React.forwardRef(EditableField)