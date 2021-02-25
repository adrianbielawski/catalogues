import React from 'react'
import styles from './imagesPreview.scss'
//Components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import Modal from 'components/global-components/modal/modal'
import { DeserializedImage } from 'src/globalTypes'

type Props = {
    show: boolean,
    images: DeserializedImage[],
    onClose: () => void,
}

const ImagesPreview = (props: Props) => (
    <Modal
        show={props.show}
        className={styles.imagesPreview}
        onClose={props.onClose}
    >
        <ImagesCarousel
            width={window.innerWidth * .9}
            height={window.innerHeight * .9}
            images={props.images}
            singleView={true}
            fullSizeImages={true}
        />
    </Modal>
)

export default ImagesPreview