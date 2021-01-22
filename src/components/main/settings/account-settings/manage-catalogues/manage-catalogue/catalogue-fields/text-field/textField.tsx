import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './textField.scss'
//Redux
import { postTextFieldNameChange, toggleFieldEdit } from 'store/actions/settingsActions'
import { useTypedSelector } from 'store/reducers'
import { fieldSelector } from 'store/selectors'
//Types
import { DeserializedTextField } from 'src/globalTypes'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'

type Props = {
    field: DeserializedTextField,
}

const cx = classNames.bind(styles)

const TextField = (props: Props) => {
    const dispatch = useDispatch()
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedTextField

    const handleEdit = () => {
        dispatch(toggleFieldEdit(props.field.id, props.field.catalogueId))
    }

    const handleConfirm = (input: string) => {
        dispatch(postTextFieldNameChange(props.field.id, props.field.catalogueId, input))
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
                            loading={field.isSubmitting}
                            onConfirm={handleConfirm}
                        />
                    )
                    : props.field.name
                }
        </div>
    )
}

export default TextField