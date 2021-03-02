import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Redux
import {
    CHANGE_FIELD_NAME, CLEAR_CHANGE_FIELD_NAME_ERROR, TOGGLE_FIELD_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom hooks
import { useDebouncedDispatch } from 'src/customHooks'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Input from 'components/global-components/input/input'
import MessageModal from 'components/global-components/message-modal/messageModal'

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

    const validateInput = (input: string) => {
        if (input.length < 2) {
            return false
        } else {
            return true
        }
    }

    const nameInputRef = useDebouncedDispatch(
        name => CHANGE_FIELD_NAME({
            ...catalogueAndFieldId,
            name,
        }),
        500,
        validateInput,
    )

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT(catalogueAndFieldId))
    }

    const clearError = () => {
        dispatch(CLEAR_CHANGE_FIELD_NAME_ERROR(catalogueAndFieldId))
    }

    const error = field.changeNameError

    const fieldClass = cx(
        'field',
    )

    const buttonClass = cx(
        'button',
        {
            active: field.isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? (
                    <Input
                        defaultValue={props.field.name}
                        className={styles.nameInput}
                        minLength={2}
                        ref={nameInputRef}
                    />
                )
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