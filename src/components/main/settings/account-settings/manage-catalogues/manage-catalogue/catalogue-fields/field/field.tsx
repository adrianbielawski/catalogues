import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV, faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './field.module.scss'
import {
  AuthUserChoiceFieldData,
  AuthUserFieldData,
  AuthUserTextFieldData,
  AuthUserGroupFieldData,
} from 'src/globalTypes'
import {
  CLEAR_FIELD_ERROR,
  TOGGLE_FIELD_EDIT,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch } from 'store/storeConfig'
import OrderableList, {
  ItemComponentProps,
} from '@adrianbielawski/orderable-list'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditTextField from '../edit-text-field/editTextField'
import EditChoiceField from '../edit-choice-field/editChoiceField'
import { useEntitiesSelector } from 'store/entities/hooks'
import EditGroupField from '../edit-group-field/editGroupField'

const cx = classNames.bind(styles)

const Field: FC<ItemComponentProps<AuthUserFieldData>> = ({
  item: fieldData,
  grabbed,
}) => {
  const dispatch = useAppDispatch()

  const fieldsEntities = useEntitiesSelector('fields')

  const isEditing = fieldData.isEditing
  const error = fieldData.fieldError
  const field = fieldsEntities[fieldData.id]

  if (!field) {
    return null
  }

  const catalogueAndFieldIds = {
    catalogueId: field.catalogueId,
    fieldId: field.id,
  }

  const handleEdit = () => {
    dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldIds))
  }

  const clearError = () => {
    dispatch(CLEAR_FIELD_ERROR(catalogueAndFieldIds))
  }

  const getEditComponent = () => {
    switch (field.type) {
      case 'short_text':
      case 'long_text':
      case 'date':
      case 'media':
      case 'geo_point':
        return (
          <EditTextField
            field={field}
            fieldData={fieldData as AuthUserTextFieldData}
          />
        )
      case 'single_choice':
      case 'multiple_choice':
        return (
          <EditChoiceField
            field={field}
            fieldData={fieldData as AuthUserChoiceFieldData}
          />
        )
      case 'group':
        return (
          <EditGroupField
            fieldComponent={Field}
            field={field}
            fieldData={fieldData as AuthUserGroupFieldData}
          />
        )
    }
  }

  const wrapperClass = cx('wrapper', {
    grabbed,
  })

  const fieldClass = cx('field', {
    active: isEditing,
  })

  const editButtonClass = cx('editButton', {
    active: isEditing,
  })

  return (
    <div className={wrapperClass}>
      <OrderableList.Grabbable className={styles.grabbable}>
        <FontAwesomeIcon icon={faArrowsAltV} />
      </OrderableList.Grabbable>
      <div className={fieldClass}>
        <TransparentButton className={editButtonClass} onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </TransparentButton>
        {isEditing ? getEditComponent() : field.name}
        <MessageModal
          show={error !== null}
          title={error?.title}
          message={error?.message ?? ''}
          onConfirm={clearError}
        />
      </div>
    </div>
  )
}

export default Field
