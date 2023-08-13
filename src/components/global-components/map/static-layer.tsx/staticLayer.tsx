import { useEffect } from 'react'
// Types
import { Coords } from '../map'
// Hooks
import useDeviceLocation from '../hooks/useDeviceLocation'
// Components
import { Marker, useMap } from 'react-leaflet'

interface Props {
  coords: Coords
}

const StaticLayer = (props: Props) => {
  const location = useDeviceLocation()
  const map = useMap()

  useEffect(() => {
    if (location != null && props.coords == null) {
      map.panTo(location?.latlng)
    }
  }, [location])

  if (props.coords == null) {
    return null
  }

  return <Marker position={props.coords} />
}

export default StaticLayer
