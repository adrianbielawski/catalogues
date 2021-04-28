import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Types
import { AuthUserTextFieldData, DeserializedField } from 'src/globalTypes'
//Redux
import { CLEAR_FIELD_ERROR, TOGGLE_FIELD_EDIT } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditTextField from './edit-text-field/editTextField'

type Props = {
    field: DeserializedField,
    fieldData: AuthUserTextFieldData,
}

const cx = classNames.bind(styles)

const TextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const fieldData = props.fieldData
    const isEditing = fieldData.isEditing
    const error = fieldData.fieldError

    const catalogueAndFieldId = {
        fieldId: props.field.id,
        catalogueId: props.field.catalogueId
    }

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_FIELD_ERROR(catalogueAndFieldId))
    }

    const fieldClass = cx(
        'field',
        {
            active: isEditing,
        }
    )

    const editButtonClass = cx(
        'editButton',
        {
            active: isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={editButtonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {isEditing
                ? (
                    <EditTextField
                        field={props.field}
                        fieldData={props.fieldData}
                    />
                )
                : props.field.name
            }
            <MessageModal
                show={error !== null}
                title={error?.title}
                message={error?.message || ''}
                onConfirm={clearError}
            />
        </div>
    )
}

export default TextField