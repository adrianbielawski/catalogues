import { useEffect, useState } from 'react'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { useMap } from 'react-leaflet'

const useSearchBar = () => {
  const map = useMap()
  const provider = new OpenStreetMapProvider()
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
    })
    map.addControl(searchControl)
  }, [])

  useEffect(() => {
    const mapWrapper = document.getElementById('leaflet-map')
    const form = mapWrapper?.getElementsByTagName('form')[0]
    const clearButton = form?.getElementsByTagName('a')[0]

    clearButton?.addEventListener('click', handleClear)
    map.on('geosearch/showlocation', handleSelect)
  }, [])

  const handleClear = () => {
    setSelected(null)
  }

  const handleSelect = (r: any) => {
    setSelected(r)
  }

  return selected
}

export default useSearchBar
