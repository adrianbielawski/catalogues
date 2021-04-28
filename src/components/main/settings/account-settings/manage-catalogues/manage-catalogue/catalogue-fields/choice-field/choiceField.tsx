import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
import { AuthUserChoiceFieldData, DeserializedField } from 'src/globalTypes'
//Redux
import { CLEAR_FIELD_ERROR, TOGGLE_FIELD_EDIT } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch } from 'store/storeConfig'
//Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditChoiceField from './edit-choice-field/editChoiceField'

type Props = {
    field: DeserializedField,
    fieldData: AuthUserChoiceFieldData,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
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

    const buttonClass = cx(
        'editButton',
        {
            active: isEditing,
        }
    )

    if (fieldData.isFetchingChoices) {
        return null
    }

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {isEditing
                ? (
                    <EditChoiceField
                        field={props.field}
                        fieldData={fieldData}
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

export default ChoiceField
