import { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './geoField.module.scss'
import { DeserializedField, DeserializedGeoField } from 'src/globalTypes'
import Map, { Coords } from 'components/global-components/map/map'
import EditableField from 'components/global-components/editable-field/editableField'

interface Props {
  field: DeserializedField
  fieldValue?: DeserializedGeoField
  onChange: (value: DeserializedGeoField | null) => void
}

const cx = classNames.bind(styles)

const GeoField = ({ field, fieldValue, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [clipText, setClipText] = useState(true)

  const initialCoords =
    fieldValue != null
      ? {
          lat: fieldValue.latitude,
          lng: fieldValue.longitude,
        }
      : null

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleChange = useCallback(
    (coords: Coords, displayName: string | null) => {
      const newValue =
        coords != null
          ? {
              latitude: coords.lat,
              longitude: coords.lng,
              address: displayName ? { displayName } : undefined,
            }
          : null

      onChange(newValue)
    },
    [onChange],
  )

  const handleAddressClick = useCallback(() => {
    setClipText(!clipText)
  }, [clipText])

  const valueCoords =
    fieldValue && `${fieldValue.latitude}, ${fieldValue.longitude}`
  const value =
    fieldValue != null
      ? `${fieldValue.address?.displayName ?? valueCoords ?? 'Unknown address'}`
      : null

  const content = useMemo(() => {
    const wrapperClass = cx('wrapper', {
      clipText,
    })

    return isEditing ? (
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
  }, [
    isEditing,
    value,
    clipText,
    initialCoords,
    handleChange,
    handleAddressClick,
  ])

  return (
    <EditableField
      title={field.name}
      isEditing={isEditing}
      onEditClick={handleEdit}
      content={content}
    />
  )
}

export default GeoField
