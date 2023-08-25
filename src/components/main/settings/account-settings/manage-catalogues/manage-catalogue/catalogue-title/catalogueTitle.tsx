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
  id: number
  name: string
}

const CatalogueTitle = (props: Props) => {
  const dispatch = useAppDispatch()

  const authUserCatalogues = useTypedSelector(
    (state) => state.modules.authUserCatalogues,
  )
  const catalogueData = useTypedSelector(
    authUserCatalogueDataSelector(props.id),
  )
  const catalogues = useEntitiesSelector('catalogues')

  const [inputError, setInputError] = useState('')

  const error = catalogueData.catalogueError

  const validateName = (name: string) => {
    let message = ''

    if (name.length < 1) {
      message = 'Minimum 1 characters'
    }

    authUserCatalogues.cataloguesData.forEach((c) => {
      if (
        catalogues[c.id]?.name.toLowerCase() === name.toLowerCase() &&
        catalogues[c.id]?.id !== props.id
      ) {
        message = `Catalogue with name "${name}" already exists`
      }
    })

    setInputError(message)
    return message.length === 0
  }

  const handleEditName = () => {
    dispatch(TOGGLE_CATALOGUE_NAME_EDIT(props.id))
  }

  const nameInputRef = useDebouncedDispatch(
    (name) =>
      CHANGE_CATALOGUE_NAME({
        catalogueId: props.id,
        name,
      }),
    500,
    validateName,
  )

  const clearError = () => {
    dispatch(CLEAR_CATALOGUE_ERROR(catalogues[props.id]!.id))
  }

  const content = catalogueData.isEditingCatalogueName ? (
    <Input
      defaultValue={props.name}
      invalidInputMessage={inputError}
      autoFocus
      ref={nameInputRef}
    />
  ) : (
    props.name
  )

  return (
    <div className={styles.catalogueTitle}>
      <EditableField
        title="Name"
        content={content}
        isEditing={catalogueData.isEditingCatalogueName}
        onEditClick={handleEditName}
      />
      <MessageModal
        show={error !== null}
        title={'Catalogue name error'}
        message={error?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default CatalogueTitle
