import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Redux
import { POST_TEXT_FIELD_NAME_CHANGE, TOGGLE_FIELD_EDIT } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

type Props = {
    field: DeserializedTextField,
}

const cx = classNames.bind(styles)

const TextField = (props: Props) => {
    const dispatch = useAppDispatch()
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedTextField
    const delayCompleated = useDelay(field.isSubmitting)

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT({
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
    }

    const handleConfirm = (input: string) => {
        dispatch(POST_TEXT_FIELD_NAME_CHANGE({
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId,
            name: input
        }))
    }

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
                        <InputWithConfirmButton
                            defaultValue={props.field.name}
                            loading={delayCompleated}
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.field.name
                }
        </div>
    )
}

export default TextField