import { useMemo } from 'react'
import styles from './field.module.scss'
// Types
import {
  DeserializedGeoField,
  DeserializedItemField,
  DeserializedItemFieldValue,
  DeserializedMediaFieldValue,
} from 'src/globalTypes'
// Redux
import { useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldChoicesSelector } from 'store/selectors'
// Components
import MediaFieldValue from '../media-field-value/mediaFieldValue'
import GeoFieldValue from '../geo-field-value/geoFieldValue'

interface Props {
  item: DeserializedItemField<DeserializedItemFieldValue>
}

const Field = (props: Props) => {
  const field = useTypedSelector(fieldSelector(props.item.fieldId))!
  const fieldChoices = useTypedSelector(fieldChoicesSelector(field?.id))

  const valueComponent = useMemo(() => {
    const value = props.item.value
    switch (field.type) {
      case 'multiple_choice': {
        if (value === null) {
          return null
        }
        const values = (value as number[]).map(
          (id) => fieldChoices.find((c) => c.id === id)?.value,
        )
        const displayedValue = values.join(', ')
        return <p>{displayedValue}</p>
      }

      case 'single_choice': {
        const displayedValue =
          fieldChoices.find((f) => f.id === value)?.value ?? ''
        return <p>{displayedValue}</p>
      }
      case 'media': {
        return (
          <MediaFieldValue fieldValue={value as DeserializedMediaFieldValue} />
        )
      }
      case 'geo_point': {
        return <GeoFieldValue fieldValue={value as DeserializedGeoField} />
      }
      default: {
        return <p>{value}</p>
      }
    }
  }, [props.item.value, field.type])

  return (
    <div className={styles.field}>
      <p className={styles.name}>{field.name}:</p>
      <div className={styles.value}>{valueComponent}</div>
    </div>
  )
}

export default Field
