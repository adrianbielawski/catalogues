import { useRef } from 'react'
import styles from './catalogueImage.module.scss'
import { POST_CATALOGUE_IMAGE } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { authUserCatalogueDataSelector } from 'store/selectors'
import Image from 'components/global-components/image/image'
import NoImageIcon from 'components/global-components/no-image-icon/noImageIcon'

interface Event<T = EventTarget> {
  target: T
}

interface Props {
  catalogueId: number
  url?: string
}

const CatalogueImage = ({ catalogueId, url }: Props) => {
  const dispatch = useAppDispatch()
  const catalogueData = useTypedSelector(
    authUserCatalogueDataSelector(catalogueId),
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: Event<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const files = Object.values(e.target.files)
      const image = files.map((f) => URL.createObjectURL(f))[0]
      dispatch(
        POST_CATALOGUE_IMAGE({
          catalogueId,
          image,
        }),
      )
    }
  }

  const handleClick = () => {
    fileInputRef.current!.click()
  }

  return (
    <div className={styles.catalogueImage} onClick={handleClick}>
      <Image
        className={styles.image}
        url={url}
        loading={catalogueData.isSubmittingImage}
        placeHolder={<NoImageIcon size="6x" />}
      />
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  )
}

export default CatalogueImage
