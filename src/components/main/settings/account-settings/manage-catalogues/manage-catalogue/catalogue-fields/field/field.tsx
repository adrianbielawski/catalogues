import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV, faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './field.scss'
//Types
import { AuthUserFieldData } from 'src/globalTypes'
//Redux
import { CLEAR_FIELD_ERROR, TOGGLE_FIELD_EDIT } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import OrderableList, { ItemComponentProps } from '@adrianbielawski/orderable-list'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import MessageModal from 'components/global-components/message-modal/messageModal'
import EditTextField from '../edit-text-field/editTextField'
import EditChoiceField from '../edit-choice-field/editChoiceField'

const cx = classNames.bind(styles)

const Field = (props: ItemComponentProps<AuthUserFieldData>) => {
    const fieldsEntities = useTypedSelector(state => state.entities.fields.entities)
    const dispatch = useAppDispatch()
    const fieldData = props.item
    const isEditing = fieldData.isEditing
    const error = fieldData.fieldError
    const field = fieldsEntities[fieldData.id]!

    const catalogueAndFieldId = {
        fieldId: field.id,
        catalogueId: field.catalogueId
    }

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_FIELD_ERROR(catalogueAndFieldId))
    }

    const getEditComponent = () => {
        switch (field.type) {
            case 'short_text':
            case 'long_text':
            case 'date':
            case 'media':
                return (
                    <EditTextField
                        field={field}
                        fieldData={fieldData}
                    />
                )
            case 'single_choice':
            case 'multiple_choice':
                return (
                    <EditChoiceField
                        field={field}
                        fieldData={fieldData}
                    />
                )
        }

    }

    const wrapperClass = cx(
        'wrapper',
        {
            grabbed: props.grabbed,
        }
    )

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
        <div className={wrapperClass}>
            <OrderableList.Grabbable className={styles.grabbable}>
                <FontAwesomeIcon icon={faArrowsAltV} />
            </OrderableList.Grabbable>
            <div className={fieldClass}>
                <TransparentButton
                    className={editButtonClass}
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </TransparentButton>
                {isEditing
                    ? getEditComponent()
                    : field.name
                }
                <MessageModal
                    show={error !== null}
                    title={error?.title}
                    message={error?.message || ''}
                    onConfirm={clearError}
                />
            </div>
        </div>
    )
}

export default Field