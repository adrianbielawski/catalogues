import React, { useState } from 'react'
import styles from './addChoice.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { ADD_CHOICE_ERROR, CLEAR_ADD_CHOICE_ERROR } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import AddButton from 'components/global-components/add-button/addButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    field: DeserializedChoiceField,
}

const AddChoice = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isAddChoiceActive, setIsAddChoiceActive] = useState(false)

    const handleAddButtonClick = () => {
        setIsAddChoiceActive(true)
    }

    const validateInput = (name: string) => {
        let error = null

        if (props.field.choices.find((choice) => choice.value.toLowerCase() === name.toLowerCase())) {
            error = `Choice with name "${name}" already exists`
        }

        return {
            valid: error === null,
            error,
        }
    }

    const clearInputError = () => {
        dispatch(CLEAR_ADD_CHOICE_ERROR({
            catalogueId: props.field.catalogueId,
            fieldId: props.field.id,
        }))
    }

    const handleConfirm = (name: string) => {
        const { valid, error } = validateInput(name)

        if (!valid) {
            dispatch(ADD_CHOICE_ERROR({
                catalogueId: props.field.catalogueId,
                fieldId: props.field.id,
                error: {
                    title: 'Choice name error',
                    message: error!,
                }
            }))
            return
        }

        handleAddChoice(name)
    }

    const handleAddChoice = (name: string) => {
        dispatch(ADD_FIELD_CHOICE_TO_STATE({
            name,
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
    }

    const error = props.field.addChoiceError

    return (
        <>
            {isAddChoiceActive
                ? (
                    <InputWithConfirmButton
                        inputProps={{ placeholder: "New choice name" }}
                        clearOnConfirm={true}
                        onConfirm={handleConfirm}
                    />
                )
                : (
                    <AddButton
                        text="Add choice"
                        className={styles.addChoiceButton}
                        onClick={handleAddButtonClick}
                    />
                )}
            <MessageModal
                show={error.message.length !== 0}
                title={error.title}
                message={error.message}
                onConfirm={clearInputError}
            />
        </>
    )
}

export default AddChoice