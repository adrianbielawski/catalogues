import { FC, useState } from 'react'
import styles from './DeleteFieldButton.module.scss'
import { DELETE_CATALOGUE_FIELD } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch } from 'store/storeConfig'
import { DeserializedField } from 'src/globalTypes'
import Button from 'components/global-components/button/button'
import ConfirmMessageModal from 'components/global-components/confirm-message-modal/confirmMessageModal'

interface Message {
  title: string
  value: string
}
interface Props {
  field: DeserializedField
  isDeleting: boolean
}

const DeleteFieldButton: FC<Props> = ({ field, isDeleting }) => {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState<Message>()

  const catalogueAndFieldId = {
    fieldId: field.id,
    catalogueId: field.catalogueId,
    parentFieldId: field.parentId,
  }

  const handleDeleteField = () => {
    setMessage({
      title: 'Confirm delete',
      value: `Are you sure you want to delete field ${field.name}?`,
    })
  }

  const deleteField = () => {
    dispatch(DELETE_CATALOGUE_FIELD(catalogueAndFieldId))
  }

  const clearMessage = () => {
    setMessage(undefined)
  }

  return (
    <>
      <Button
        className={styles.deleteButton}
        disabled={isDeleting}
        onClick={handleDeleteField}
      >
        Delete field
      </Button>
      {message && (
        <ConfirmMessageModal
          show={!!message.value}
          title={message.title}
          message={message.value}
          onConfirm={deleteField}
          onCancel={clearMessage}
        />
      )}
    </>
  )
}

export default DeleteFieldButton
