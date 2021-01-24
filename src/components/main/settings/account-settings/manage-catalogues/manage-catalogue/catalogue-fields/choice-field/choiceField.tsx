import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
import { fieldSelector } from 'store/selectors'
import { fetchFieldsChoices, refreshCatalogueField } from 'store/actions/cataloguesActions'
import {
    addFieldChoiceToState, removeFieldChoiceFromState, toggleFieldEdit, postChoiceFieldChanges
} from 'store/actions/settingsActions'
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
    const dispatch = useDispatch()
    const nameInputRef = useRef<HTMLInputElement>(null)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField
    const delayCompleated = useDelay(field.isSubmitting)

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        dispatch(toggleFieldEdit(props.field.id, props.field.catalogueId))
    }

    const handleRemoveChoice = (id: number) => {
        dispatch(removeFieldChoiceFromState(id, props.field.id, props.field.catalogueId))
    }

    const handleAddChoice = (name: string) => {
        dispatch(addFieldChoiceToState(name, props.field.id, props.field.catalogueId))
    }

    const handleConfirm = () => {
        const fieldName = nameInputRef.current!.value
        dispatch(postChoiceFieldChanges(field, fieldName))
    }

    const handleCancel = () => {
        dispatch(refreshCatalogueField(props.field.id, props.field.catalogueId))
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
                            className={styles.choices}
                            choices={field.choices}
                            onRemove={handleRemoveChoice}
                            onAdd={handleAddChoice}
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
