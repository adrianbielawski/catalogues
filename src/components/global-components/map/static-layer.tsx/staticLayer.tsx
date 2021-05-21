import React, { useEffect } from 'react'
//Types
import { Coords } from '../map'
//Hooks
import useDeviceLocation from '../hooks/useDeviceLocation'
//Components
import { Marker, useMap } from 'react-leaflet'

type Props = {
	coords: Coords,
}

const StaticLayer = (props: Props) => {
	const location = useDeviceLocation()
    const map = useMap()

	useEffect(() => {
		if (location && !props.coords) {
			map.panTo(location?.latlng)
		}
	}, [location])
    
	if (!props.coords) {
		return null
	}

	return (
		<Marker
			position={props.coords}
		/>
	)
}

export default StaticLayer