import { useState } from 'react'
import * as React from 'react'
import styles from './addChoice.module.scss'
// Types
import { AuthUserChoiceFieldData, DeserializedField } from 'src/globalTypes'
// Redux
import {
  CLEAR_FIELD_ERROR,
  POST_FIELD_CHOICE,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Custom components
import AddButton from 'components/global-components/add-button/addButton'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import MessageModal from 'components/global-components/message-modal/messageModal'

interface Props {
  field: DeserializedField
  fieldData: AuthUserChoiceFieldData
}

const AddChoice = (props: Props) => {
  const dispatch = useAppDispatch()
  const choices = useTypedSelector((state) => state.entities.choices.entities)
  const [isAddChoiceActive, setIsAddChoiceActive] = useState(false)
  const [inputError, setInputError] = useState('')

  const handleAddButtonClick = () => {
    setIsAddChoiceActive(true)
  }

  const validateInput = (name: string) => {
    let error = null

    if (
      props.fieldData.choices.find(
        (c) => choices[c.id]?.value.toLowerCase() === name.toLowerCase(),
      ) != null
    ) {
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
    dispatch(
      CLEAR_FIELD_ERROR({
        catalogueId: props.field.catalogueId,
        fieldId: props.field.id,
      }),
    )
  }

  const handleAddChoice = (name: string) => {
    dispatch(
      POST_FIELD_CHOICE({
        name,
        fieldId: props.field.id,
        catalogueId: props.field.catalogueId,
      }),
    )
  }

  const error = props.fieldData.fieldError

  const inputAttributes = {
    placeholder: 'New choice name',
    onChange: handleChange,
  }

  const buttonProps = {
    disabled: inputError.length !== 0,
  }

  return (
    <>
      {isAddChoiceActive ? (
        <InputWithConfirmButton
          {...inputAttributes}
          buttonProps={buttonProps}
          clearOnConfirm={true}
          invalidInputMessage={inputError}
          onConfirm={handleAddChoice}
        />
      ) : (
        <AddButton
          text="Add choice"
          className={styles.addChoiceButton}
          onClick={handleAddButtonClick}
        />
      )}
      <MessageModal
        show={error !== null}
        title={error?.title}
        message={error?.message ?? ''}
        onConfirm={clearError}
      />
    </>
  )
}

export default AddChoice
