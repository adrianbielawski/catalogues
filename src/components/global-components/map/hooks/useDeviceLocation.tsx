import { useEffect, useState } from 'react'
import { LocationEvent } from 'leaflet'
import { useMap, useMapEvent } from 'react-leaflet'

const useDeviceLocation = () => {
  const [location, setLocation] = useState<LocationEvent | null>(null)
  const map = useMap()

  useEffect(() => {
    map.locate()
  }, [map])

  const handleLocation = (e: LocationEvent) => {
    console.log(e)
    setLocation(e)
  }

  useMapEvent('locationfound', handleLocation)
  useMapEvent('locationerror', console.log)

  return location
}

export default useDeviceLocation
