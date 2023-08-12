import { useEffect, useState } from 'react'
// Types
import { type LocationEvent } from 'leaflet'
// Hooks
import { useMap, useMapEvent } from 'react-leaflet'

const useDeviceLocation = () => {
  const [location, setLocation] = useState<LocationEvent | null>(null)
  const map = useMap()

  useEffect(() => {
    map.locate()
  }, [map])

  const handleLocation = (e: LocationEvent) => {
    setLocation(e)
  }

  useMapEvent('locationfound', handleLocation)

  return location
}

export default useDeviceLocation
