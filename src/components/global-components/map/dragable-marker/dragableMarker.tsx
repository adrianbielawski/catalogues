import { useCallback, useMemo, useRef } from 'react'
// Types
import { Marker as LeafletMarker, LatLngLiteral, LatLng } from 'leaflet'
// Components
import { Marker } from 'react-leaflet'

interface Props {
  coords: LatLngLiteral
  onDrop: (latLng: LatLng) => void
}

const DraggableMarker = (props: Props) => {
  const markerRef = useRef<LeafletMarker | null>(null)

  const dragend = useCallback(() => {
    if (markerRef.current != null) {
      props.onDrop(markerRef.current.getLatLng())
    }
  }, [])

  const eventHandlers = useMemo(
    () => ({
      dragend,
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={props.coords}
      ref={markerRef}
    />
  )
}

export default DraggableMarker
