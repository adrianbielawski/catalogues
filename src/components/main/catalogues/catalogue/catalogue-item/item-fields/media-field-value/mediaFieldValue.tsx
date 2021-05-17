import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import styles from './mediaFieldValue.scss'
//Assets
import YT from 'assets/img/youtube.png'
import FB from 'assets/img/facebook.png'
import Vimeo from 'assets/img/vimeo.png'
//Types
import { DeserializedMediaFieldValue, MediaFieldType } from 'src/globalTypes'
//Components
import Image from 'components/global-components/image/image'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import MediaPlayer from 'components/global-components/media-player/mediaPlayer'

type Props = {
    fieldValue: DeserializedMediaFieldValue,
}

type Service = {
    image: string,
    internalPlayer?: MediaFieldType[],
}

const servicesMap: Record<string, Service> = {
    youtube: {
        image: YT,
        internalPlayer: ['video']
    },
    facebook: {
        image: FB,
    },
    vimeo: {
        image: Vimeo,
        internalPlayer: ['video']
    },
}

const MediaFieldValue = (props: Props) => {
    const [showPlayer, setShowPlayer] = useState(false)

    const internalPlayer = props.fieldValue.service
        ? servicesMap[props.fieldValue.service]?.internalPlayer?.includes(props.fieldValue.type)
        : false

    const image = props.fieldValue.service
        ? servicesMap[props.fieldValue.service]?.image
        : undefined

    const handleMediaFieldClick = () => {
        if (internalPlayer) {
            setShowPlayer(true)
        } else {
            window.open(props.fieldValue.url, '_blank')
        }
    }

    const handleClosePlayer = () => {
        setShowPlayer(false)
    }

    const placeholder = (
        <FontAwesomeIcon
            className={styles.icon}
            icon={faLink}
        />
    )

    return (
        <div
            className={styles.mediaField}
            onClick={handleMediaFieldClick}
        >
            <Image
                className={styles.image}
                url={image}
                placeHolder={placeholder}
            />
            <p className={styles.title}>
                {props.fieldValue.title
                    ? props.fieldValue.title
                    : props.fieldValue.url
                }
            </p>
            {internalPlayer && (
                <AnimatedModal
                    show={showPlayer}
                    className={styles.mediaPlayerModal}
                    onClose={handleClosePlayer}
                >
                    <MediaPlayer
                        className={styles.mediaPlayer}
                        url={props.fieldValue.url}
                        thumbnailUrl={props.fieldValue.thumbnailUrl}
                    />
                </AnimatedModal>
            )}
        </div>
    )
}

export default MediaFieldValue