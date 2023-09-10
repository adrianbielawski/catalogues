import { useState } from 'react'
import styles from './catalogueTitle.module.scss'
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import {
  CHANGE_CATALOGUE_NAME,
  CLEAR_CATALOGUE_ERROR,
  TOGGLE_CATALOGUE_NAME_EDIT,
} from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
import EditableField from 'components/global-components/editable-field/editableField'
import Input from 'components/global-components/input/input'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { useEntitiesSelector } from 'store/entities/hooks'

interface Props {
  catalogueId: number
  name: string
}

const CatalogueTitle = ({ catalogueId, name }: Props) => {
  const dispatch = useAppDispatch()

  const authUserCatalogues = useTypedSelector(
    (state) => state.modules.authUserCatalogues,
  )
  const { isEditingCatalogueName, catalogueError } = useTypedSelector(
    authUserCatalogueDataSelector(catalogueId),
  )
  const catalogues = useEntitiesSelector('catalogues')

  const [inputError, setInputError] = useState('')

  const validateName = (name: string) => {
    let message = ''

    if (name.length < 1) {
      message = 'Minimum 1 characters'
    }

    authUserCatalogues.cataloguesData.forEach((c) => {
      if (
        catalogues[c.id]?.name.toLowerCase() === name.toLowerCase() &&
        catalogues[c.id]?.id !== catalogueId
      ) {
        message = `Catalogue with name "${name}" already exists`
      }
    })

    setInputError(message)
    return message.length === 0
  }

  const handleEditName = () => {
    dispatch(TOGGLE_CATALOGUE_NAME_EDIT(catalogueId))
  }

  const nameInputRef = useDebouncedDispatch(
    (name) =>
      CHANGE_CATALOGUE_NAME({
        catalogueId,
        name,
      }),
    500,
    validateName,
  )

  const clearError = () => {
    dispatch(CLEAR_CATALOGUE_ERROR(catalogueId))
  }

  const content = isEditingCatalogueName ? (
    <Input
      defaultValue={name}
      invalidInputMessage={inputError}
      autoFocus
      ref={nameInputRef}
    />
  ) : (
    name
  )

  return (
    <div className={styles.catalogueTitle}>
      <EditableField
        title="Name"
        content={content}
        isEditing={isEditingCatalogueName}
        onEditClick={handleEditName}
      />
      <MessageModal
        show={!!catalogueError}
        title={catalogueError?.title ?? 'Catalogue name error'}
        message={catalogueError?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default CatalogueTitle
