import {
  AuthUserChoiceFieldData,
  AuthUserFieldData,
  AuthUserGroupFieldData,
  DeserializedField,
  DeserializedGeoField,
  DeserializedGroupFieldValue,
  DeserializedItem,
  DeserializedItemField,
  DeserializedItemFieldValue,
  DeserializedMediaFieldValue,
} from 'src/globalTypes'
import TextField from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'
import DateField from './date-field/dateField'
import MediaField from './media-field/mediaField'
import GeoField from './geo-field/geoField'
import GroupField from './GroupField/GroupField'
import { useCallback, useMemo } from 'react'
import { useAppDispatch } from 'store/storeConfig'
import {
  ADD_ITEM_GROUP_FIELD_CHILD,
  CHANGE_ITEM_FIELD_VALUE,
} from 'store/entities/items/slice'
import { ChangeItemFieldValuePayload } from 'store/entities/items/types'

export interface EditItemFieldsProps {
  item: DeserializedItem
  field: DeserializedField
  fieldValue?: DeserializedItemField<DeserializedItemFieldValue | undefined>
  fieldData: AuthUserFieldData
  fieldsData: AuthUserFieldData[]
  parentFieldId: number | null
  childIndex?: number
}

const EditItemField = ({
  item,
  field,
  fieldValue,
  fieldData,
  fieldsData,
  parentFieldId,
  childIndex,
}: EditItemFieldsProps) => {
  const dispatch = useAppDispatch()

  const handleChange = useCallback(
    (value: DeserializedItemFieldValue) => {
      dispatch(
        CHANGE_ITEM_FIELD_VALUE({
          itemId: item.id,
          fieldId: field.id,
          parentFieldId,
          childIndex,
          value,
        } as ChangeItemFieldValuePayload),
      )
    },
    [item.id, field.id, parentFieldId, childIndex],
  )

  const addEmptyField = useCallback(
    (value: Array<DeserializedItemField<undefined>>) => {
      dispatch(
        ADD_ITEM_GROUP_FIELD_CHILD({
          itemId: item.id,
          fieldId: field.id,
          value,
        }),
      )
    },
    [item.id, field.id],
  )

  const fieldComponent = useMemo(() => {
    const fieldProps = {
      onChange: handleChange,
      field,
    }

    switch (field.type) {
      case 'short_text':
        return (
          <TextField
            {...fieldProps}
            fieldValue={fieldValue as DeserializedItemField<string>}
          />
        )
      case 'long_text':
        return (
          <LongTextField
            {...fieldProps}
            fieldValue={fieldValue as DeserializedItemField<string>}
          />
        )
      case 'date':
        return (
          <DateField
            {...fieldProps}
            fieldValue={fieldValue as DeserializedItemField<string>}
          />
        )
      case 'media':
        return (
          <MediaField
            {...fieldProps}
            fieldValue={
              fieldValue as DeserializedItemField<DeserializedMediaFieldValue>
            }
          />
        )
      case 'geo_point':
        return (
          <GeoField
            {...fieldProps}
            fieldValue={fieldValue?.value as DeserializedGeoField}
          />
        )
      case 'single_choice':
        return (
          <SingleChoiceField
            {...fieldProps}
            fieldValue={fieldValue as DeserializedItemField<number | null>}
            fieldData={fieldData as AuthUserChoiceFieldData}
          />
        )
      case 'multiple_choice':
        return (
          <MultipleChoiceField
            {...fieldProps}
            fieldValue={fieldValue as DeserializedItemField<number[] | null>}
            fieldData={fieldData as AuthUserChoiceFieldData}
          />
        )
      case 'group':
        return (
          <GroupField
            item={item}
            field={field}
            fieldValue={
              fieldValue as DeserializedItemField<DeserializedGroupFieldValue>
            }
            fieldData={fieldData as AuthUserGroupFieldData}
            fieldsData={fieldsData}
            onAddValue={addEmptyField}
          />
        )
    }
  }, [item, parentFieldId, childIndex])

  return fieldComponent
}

export default EditItemField
