import React, { useEffect, useState } from 'react'
//Types
import { LeafletMouseEvent, LatLngLiteral } from 'leaflet'
import { Coords } from '../map'
//Hooks
import { useFirstRender } from 'src/hooks/useFirstRender'
import { useMap, useMapEvent } from 'react-leaflet'
import useDeviceLocation from '../hooks/useDeviceLocation'
import useSearchBar from '../hooks/useSearchBar'
//Components
import DraggableMarker from '../dragable-marker/dragableMarker'

type Props = {
	coords: Coords,
	onChange: (coords: Coords, displayName: string | null) => void,
}

const InteractiveLayer = (props: Props) => {
	const [coords, setCoords] = useState(props.coords)
	const [displayName, setDisplayName] = useState<string | null>(null)
	const map = useMap()
	const firstRender = useFirstRender()
	const location = useDeviceLocation()
	const search = useSearchBar()

	useEffect(() => {
		if (firstRender) {
			return
		}

		const newCoords = search
			? { lat: search.location.y, lng: search.location.x }
			: null

		setCoords(newCoords)
		setDisplayName(search?.location?.label || null)
	}, [search])

	useEffect(() => {
		if (location && !props.coords) {
			map.panTo(location.latlng)
		}
	}, [location])

	useEffect(() => {
		if (coords === props.coords) {
			return
		}

		const latLng = coords ? convertLatLng(coords) : null
		props.onChange(latLng, displayName)
	}, [coords, displayName, props.onChange])

	const convertLatLng = (latLng: LatLngLiteral) => ({
		lat: latLng.lat,
		lng: (latLng.lng % 360 + 540) % 360 - 180,
	})

	const getAddress = (coords: LatLngLiteral) => {
		const { lat, lng } = convertLatLng(coords)
		fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`)
			.then(r => r.json())
			.then(r => setDisplayName(r.display_name))
			.catch(() => setDisplayName('Unknown address'))
	}

	const handleClick = (e: LeafletMouseEvent) => {
		if (search !== null) {
			return
		}

		setCoords(e.latlng)
		getAddress(e.latlng)
	}

	useMapEvent('click', handleClick)

	const handleMarkerDrop = (coords: LatLngLiteral) => {
		setCoords(coords)
		getAddress(coords)
	}

	if (!coords || search !== null) {
		return null
	}

	return (
		<DraggableMarker
			coords={coords}
			onDrop={handleMarkerDrop}
		/>
	)
}

export default InteractiveLayer