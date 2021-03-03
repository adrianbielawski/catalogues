import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { CLEAR_FIELD_ERROR, TOGGLE_FIELD_EDIT } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditChoiceField from './edit-choice-field/editChoiceField'

type Props = {
    field: DeserializedChoiceField,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

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
            active: field.isEditing,
        }
    )

    const buttonClass = cx(
        'editButton',
        {
            active: field.isEditing,
        }
    )

    const error = field.fieldError

    if (field.fetchingChoices) {
        return null
    }

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? <EditChoiceField field={props.field} />
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

export default ChoiceField
