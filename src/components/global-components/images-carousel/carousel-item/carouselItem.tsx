import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './carouselItem.module.scss'
// Types
import { DeserializedImage } from 'src/globalTypes'
// Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import PrimaryImageStar from '../primary-image-star/primaryImageStar'
import Image from 'components/global-components/image/image'
import NoImageIcon from 'components/global-components/no-image-icon/noImageIcon'

interface Props {
  offset: string | null
  scale: number
  image: DeserializedImage
  singleView?: boolean
  useThumbnails?: boolean
  showPrimaryStar?: boolean
  withShadow?: boolean
  onRemove?: () => void
  onPrimaryChange?: () => void
  onImageClick?: () => void
}

const cx = classNames.bind(styles)

const CarouselItem = (props: Props) => {
  const url = props.image.id.toString().startsWith('newImage')
    ? props.image.image
    : props.useThumbnails
    ? `${props.image.imageThumbnail}`
    : `${props.image.image}`

  const onPrimaryChange = () => {
    if (props.onPrimaryChange !== undefined) {
      props.onPrimaryChange()
    }
  }

  const carouselItemClass = cx('carouselItem', {
    singleView: props.singleView,
    withShadow: props.withShadow,
  })

  if (!props.offset) {
    return null
  }

  return (
    <div
      className={carouselItemClass}
      style={
        {
          '--offset': props.offset,
          '--scale': props.scale,
        } as React.CSSProperties
      }
    >
      <Image
        className={styles.image}
        url={url}
        dimensions={props.image.dimensions}
        placeHolder={<NoImageIcon className={styles.noImageIcon} size="6x" />}
        onClick={props.onImageClick}
      />
      {props.onRemove != null && (
        <TransparentButton
          className={styles.trashButton}
          onClick={props.onRemove}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </TransparentButton>
      )}
      {props.showPrimaryStar && (
        <PrimaryImageStar
          className={styles.primaryImageStar}
          solid={props.image.isPrimary}
          onClick={onPrimaryChange}
        />
      )}
    </div>
  )
}

export default CarouselItem
