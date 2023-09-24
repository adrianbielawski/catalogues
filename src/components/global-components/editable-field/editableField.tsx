import { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './editableField.module.scss'
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props {
  title: string
  content: ReactNode
  isEditing: boolean
  className?: string
  onEditClick: () => void
}

const cx = classNames.bind(styles)

const EditableField = ({
  title,
  content,
  isEditing,
  className,
  onEditClick,
}: Props) => {
  const editableFieldClass = cx('editableField', className)

  const contentClass = cx('content', {
    active: isEditing,
  })

  return (
    <div className={editableFieldClass}>
      <EditableFieldTitle
        title={title}
        isEditing={isEditing}
        onEdit={onEditClick}
      />
      <div className={contentClass}>{content}</div>
    </div>
  )
}

export default EditableField
