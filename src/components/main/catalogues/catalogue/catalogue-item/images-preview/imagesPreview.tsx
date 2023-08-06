import React from 'react'
import styles from './imagesPreview.module.scss'
//Types
import { DeserializedImage } from 'src/globalTypes'
//Components
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
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
        <div className={styles.wrapper}>
            <ImagesCarousel
                images={props.images}
                singleView={true}
                showCounter={true}
            />
        </div>
    </AnimatedModal>
)

export default ImagesPreview