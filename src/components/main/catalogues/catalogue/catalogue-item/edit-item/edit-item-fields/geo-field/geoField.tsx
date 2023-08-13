import { useCallback, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './geoField.module.scss'
// Types
import { DeserializedField, DeserializedGeoField } from 'src/globalTypes'
// Redux
import { CHANGE_ITEM_FIELD_VALUE } from 'store/entities/items/slice'
import { useAppDispatch } from 'store/storeConfig'
// Components
import Map, { Coords } from 'components/global-components/map/map'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  itemId: number
  field: DeserializedField
  fieldValue?: DeserializedGeoField
}

const cx = classNames.bind(styles)

const GeoField = (props: Props) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [clipText, setClipText] = useState(true)
  const fieldValue = props.fieldValue

  const initialCoords =
    fieldValue != null
      ? {
          lat: fieldValue.latitude,
          lng: fieldValue.longitude,
        }
      : null

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = useCallback(
    (coords: Coords, displayName: string | null) => {
      const address = displayName
        ? {
            displayName,
          }
        : undefined

      dispatch(
        CHANGE_ITEM_FIELD_VALUE({
          itemId: props.itemId,
          fieldId: props.field.id,
          value:
            coords != null
              ? {
                  latitude: coords.lat,
                  longitude: coords.lng,
                  address,
                }
              : null,
        }),
      )
    },
    [props.itemId, props.field],
  )

  const handleAddressClick = () => {
    setClipText(!clipText)
  }

  const valueCoords =
    fieldValue && `${fieldValue.latitude}, ${fieldValue.longitude}`
  const value =
    fieldValue != null
      ? `${fieldValue.address?.displayName ?? valueCoords ?? 'Unknown address'}`
      : null

  const wrapperClass = cx('wrapper', {
    clipText,
  })

  const content = isEditing ? (
    <div className={wrapperClass}>
      <p onClick={handleAddressClick}>{value ?? 'No location selected'}</p>
      <Map
        className={styles.map}
        interactive={true}
        onChange={handleChange}
        coords={initialCoords}
      />
    </div>
  ) : (
    value
  )

  return (
    <EditableField
      title={props.field.name}
      isEditing={isEditing}
      onEditClick={handleEdit}
      content={content}
    />
  )
}

export default GeoField
