import { FC, useCallback, useEffect, useState } from 'react'
import styles from './addField.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
import AddButton from 'components/global-components/add-button/addButton'
import FieldForm from './field-form/fieldForm'
import AnimateHeight from 'react-animate-height'

interface Props {
  catalogueId: number
  parentId?: number
  formTitle?: string
  confirmButtonText?: string
  className?: string
}

const AddField: FC<Props> = ({
  catalogueId,
  parentId,
  formTitle,
  confirmButtonText,
  className,
}) => {
  const { isSubmittingNewField } = useTypedSelector(
    authUserCatalogueDataSelector(catalogueId),
  )
  const [active, setActive] = useState(false)

  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  useEffect(() => {
    if (!isSubmittingNewField) {
      setActive(false)
    }
  }, [isSubmittingNewField])

  return (
    <AnimateHeight height={active ? 'auto' : 46} className={className}>
      {!active ? (
        <AddButton
          className={styles.addButton}
          text="Add new field"
          onClick={toggleActive}
        />
      ) : (
        <FieldForm
          catalogueId={catalogueId}
          parentId={parentId}
          active={active}
          title={formTitle}
          confirmButtonText={confirmButtonText}
          canEditPublic={!parentId}
          onCancel={toggleActive}
        />
      )}
    </AnimateHeight>
  )
}

export default AddField
