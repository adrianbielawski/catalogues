import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import {
    POST_CHOICE_FIELD_CHANGES, REFRESH_CATALOGUE_FIELD, TOGGLE_FIELD_EDIT
} from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'
//Custom hooks
import { useDelay } from 'src/customHooks'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'

type Props = {
    field: DeserializedChoiceField,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
    const dispatch = useAppDispatch()
    const nameInputRef = useRef<HTMLInputElement>(null)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField
    const delayCompleated = useDelay(field.isSubmitting)

    const handleEdit = () => {
        dispatch(TOGGLE_FIELD_EDIT({
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
    }

    const handleConfirm = () => {
        const name = nameInputRef.current!.value
        dispatch(POST_CHOICE_FIELD_CHANGES({
            field,
            name,
        }))
    }

    const handleCancel = () => {
        dispatch(REFRESH_CATALOGUE_FIELD({
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
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

    if (field.fetchingChoices) {
        return null
    }

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? (
                    <div>
                        <Input
                            defaultValue={props.field.name}
                            className={styles.nameInput}
                            minLength={2}
                            ref={nameInputRef}
                        />
                        <Choices
                            field={field}
                            className={styles.choices}
                        />
                        <div className={styles.buttons}>
                            <Button
                                className={styles.button}
                                loading={delayCompleated}
                                disabled={field.isSubmitting}
                                onClick={handleConfirm}
                            >
                                Save
                            </Button>
                            <Button
                                className={styles.button}
                                disabled={field.isSubmitting}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
                : props.field.name
            }
        </div>
    )
}

export default ChoiceField
