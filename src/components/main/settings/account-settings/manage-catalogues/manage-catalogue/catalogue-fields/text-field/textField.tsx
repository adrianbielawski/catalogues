import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Redux
import {
    CLEAR_CHANGE_FIELD_NAME_ERROR, TOGGLE_FIELD_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector, } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditTextField from './edit-text-field/editTextField'

type Props = {
    field: DeserializedTextField,
}

const cx = classNames.bind(styles)

const TextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedTextField

    const catalogueAndFieldId = {
        fieldId: props.field.id,
        catalogueId: props.field.catalogueId
    }

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_CHANGE_FIELD_NAME_ERROR(catalogueAndFieldId))
    }

    const error = field.changeNameError

    const fieldClass = cx(
        'field',
        {
            active: field.isEditing,
        }
    )

    const editButtonClass = cx(
        'editButton',
        {
            active: field.isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={editButtonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? <EditTextField field={props.field} />
                : props.field.name
            }
            <MessageModal
                show={error.message.length !== 0}
                title={error.title}
                message={error.message}
                onConfirm={clearError}
            />
        </div>
    )
}

export default TextField