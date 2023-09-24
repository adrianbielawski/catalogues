import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import {
  AuthUserFieldData,
  DeserializedGroupFieldValue,
  DeserializedItem,
  DeserializedItemField,
  DeserializedItemFieldValue,
} from 'src/globalTypes'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import { useEntitiesSelector } from 'store/entities/hooks'
import { useFilterByParentId } from 'src/hooks/useFilterByParentId'
import styles from './editItemFields.module.scss'
import { useMemo } from 'react'
import EditItemField from './EditItemField'

export interface EditItemFieldsPropsBase {
  item: DeserializedItem
  fieldsData: AuthUserFieldData[]
}

export interface EditItemFieldsPropsWithoutParent
  extends EditItemFieldsPropsBase {
  parentFieldId: null
  childIndex?: never
}

export interface EditItemFieldsPropsWithParent extends EditItemFieldsPropsBase {
  parentFieldId: number
  childIndex: number
}

export type EditItemFieldsProps =
  | EditItemFieldsPropsWithoutParent
  | EditItemFieldsPropsWithParent

const EditItemFields = ({
  item,
  fieldsData,
  parentFieldId,
  childIndex,
}: EditItemFieldsProps) => {
  const fields = useEntitiesSelector('fields')

  const [filteredFieldsData, restFieldsData] = useFilterByParentId(
    fieldsData,
    parentFieldId,
  )

  const fieldsListComponent = useMemo(() => {
    const fieldComponents = filteredFieldsData.map((fieldData) => {
      const field = fields[fieldData.id]

      if (!field) {
        return null
      }

      let fieldValue:
        | DeserializedItemField<DeserializedItemFieldValue | undefined>
        | undefined

      let data: AuthUserFieldData | undefined

      if (parentFieldId) {
        const parentFieldValue = item.fieldsValues.find(
          (v) => v.fieldId === parentFieldId,
        ) as DeserializedItemField<DeserializedGroupFieldValue> | undefined

        fieldValue = parentFieldValue?.value[childIndex]?.find(
          (v) => v.fieldId === fieldData.id,
        )

        data = filteredFieldsData.find((f) => f.id === fieldData.id)
      } else {
        fieldValue = item.fieldsValues.find((v) => v.fieldId === field.id)
        data = fieldData
      }

      if (!data) {
        return null
      }

      return (
        <li key={field.id}>
          <EditItemField
            item={item}
            field={field}
            fieldValue={fieldValue}
            fieldData={data}
            fieldsData={fieldsData}
            parentFieldId={parentFieldId}
            childIndex={childIndex}
          />
        </li>
      )
    })

    return <ul className={styles.fieldsList}>{fieldComponents}</ul>
  }, [
    item,
    fields,
    fieldsData,
    childIndex,
    parentFieldId,
    filteredFieldsData,
    restFieldsData,
  ])

  if (parentFieldId) {
    return fieldsListComponent
  }

  return (
    <IconWithTitle title={'Item fields'} icon={faListAlt}>
      {fieldsListComponent}
    </IconWithTitle>
  )
}

export default EditItemFields
