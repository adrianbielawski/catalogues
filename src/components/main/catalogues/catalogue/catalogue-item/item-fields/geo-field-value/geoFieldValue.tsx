import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './geoFieldValue.module.scss'
// Types
import { type DeserializedGeoField } from 'src/globalTypes'
// Redux
import { useTypedSelector } from 'store/storeConfig'
// Components
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import Map from 'components/global-components/map/map'
import ModalHeader from 'components/global-components/modals/modal-header/modalHeader'

interface Props {
  fieldValue: DeserializedGeoField
}

const GeoFieldValue = (props: Props) => {
  const largeViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.largeViewport,
  )
  const [showMap, setShowMap] = useState(false)

  const coords = {
    lat: props.fieldValue.latitude,
    lng: props.fieldValue.longitude,
  }

  const handleGeoFieldClick = () => {
    setShowMap(!showMap)
  }

  const handleCloseMap = () => {
    setShowMap(false)
  }

  return (
    <div className={styles.geoField} onClick={handleGeoFieldClick}>
      <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt} />
      <p className={styles.location}>
        {props.fieldValue.address != null
          ? props.fieldValue.address.displayName
          : null}
      </p>
      <AnimatedModal
        show={showMap}
        className={styles.locationModal}
        onClose={handleCloseMap}
      >
        <div className={styles.mapWrapper}>
          {!largeViewport && (
            <ModalHeader
              className={styles.header}
              buttonClassName={styles.closeButton}
              onClose={handleCloseMap}
            />
          )}
          <Map className={styles.map} interactive={false} coords={coords} />
        </div>
      </AnimatedModal>
    </div>
  )
}

export default GeoFieldValue
