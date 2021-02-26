import React from 'react'
import styles from './imagesPreview.scss'
//Components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import { DeserializedImage } from 'src/globalTypes'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'

type Props = {
    show: boolean,
    images: DeserializedImage[],
    onClose: () => void,
}

const ImagesPreview = (props: Props) => (
    <AnimatedModal
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
            background={'grey'}
        />
    </AnimatedModal>
)

export default ImagesPreview