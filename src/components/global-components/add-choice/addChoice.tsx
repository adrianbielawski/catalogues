import React, { useState } from 'react'
import styles from './addChoice.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { CLEAR_FIELD_ERROR, POST_CHOICE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
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
    const [inputError, setInputError] = useState('')

    const handleAddButtonClick = () => {
        setIsAddChoiceActive(true)
    }

    const validateInput = (name: string) => {
        let error = null

        if (props.field.choices.find(c => c.value.toLowerCase() === name.toLowerCase())) {
            error = `Choice with name "${name}" already exists`
        }

        if (name.length < 1) {
            error = 'Minimum 1 character'
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const { valid, error } = validateInput(input)
        if (!valid) {
            setInputError(error!)
        } else {
            setInputError('')
        }
    }

    const clearError = () => {
        dispatch(CLEAR_FIELD_ERROR({
            catalogueId: props.field.catalogueId,
            fieldId: props.field.id,
        }))
    }

    const handleAddChoice = (name: string) => {
        dispatch(POST_CHOICE({
            name,
            fieldId: props.field.id,
            catalogueId: props.field.catalogueId
        }))
    }

    const error = props.field.fieldError

    const inputProps = {
        placeholder: "New choice name",
        onChange: handleChange
    }

    const buttonProps = {
        disabled: inputError.length !== 0
    }

    return (
        <>
            {isAddChoiceActive
                ? (
                    <InputWithConfirmButton
                        inputProps={inputProps}
                        buttonProps={buttonProps}
                        clearOnConfirm={true}
                        invalidInputMessage={inputError}
                        onConfirm={handleAddChoice}
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
                onConfirm={clearError}
            />
        </>
    )
}

export default AddChoice