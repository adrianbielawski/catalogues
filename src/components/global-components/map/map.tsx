import React from 'react'
import classNames from 'classnames/bind'
import styles from './map.scss'
import { MapContainer, TileLayer } from 'react-leaflet'
//Types
import { LatLngLiteral } from 'leaflet'
//Components
import InteractiveLayer from './interactive-layer/interactiveLayer'
import StaticLayer from './static-layer.tsx/staticLayer'

const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const CENTER = { lat: 51.4875305896239, lng: -0.07735299927790606 }

const cx = classNames.bind(styles)

export type Coords = LatLngLiteral | null

type InteractiveMapProps = {
	coords: Coords,
	zoom?: number,
	interactive: true,
	className?: string,
	onChange: (coords: Coords, displayName: string | null) => void
}

type StaticMapProps = {
	coords: Coords,
	zoom?: number,
	interactive?: false,
	className?: string,
	onCoordsChange?: never,
}

type Props = InteractiveMapProps | StaticMapProps

const Map = (props: Props) => {
	const layer = props.interactive
		? (
			<InteractiveLayer
				coords={props.coords}
				onChange={props.onChange}
			/>
		) : (
			<StaticLayer
				coords={props.coords}
			/>
		)

	const mapClass = cx(
		'mapWrapper',
		props.className,
	)

	return (
		<div id="leaflet-map" className={mapClass}>
			<MapContainer
				className={styles.map}
				center={props.coords || CENTER}
				zoom={props.zoom}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution={ATTRIBUTION}
					url={MAP_URL}
				/>
				{layer}
			</MapContainer>
		</div>
	)
}

Map.defaultProps = {
	coords: null,
	zoom: 13,
}

export default Map