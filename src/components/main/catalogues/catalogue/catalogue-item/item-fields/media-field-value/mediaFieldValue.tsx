import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import styles from './mediaFieldValue.scss'
//Assets
import YT from 'assets/img/youtube.png'
import FB from 'assets/img/facebook.png'
import Vimeo from 'assets/img/vimeo.png'
//Types
import { DeserializedMediaFieldValue } from 'src/globalTypes'
//Components
import Image from 'components/global-components/image/image'

type Props = {
    fieldValue: DeserializedMediaFieldValue,
}

const servicesMap: Record<string, string> = {
    youtube: YT,
    facebook: FB,
    vimeo: Vimeo
}

const MediaFieldValue = (props: Props) => {
    const handleMediaFieldClick = () => {
        
    }
    
    const image = servicesMap[props.fieldValue.service]

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
                {props.fieldValue.title}
            </p>
        </div>
    )
}

export default MediaFieldValue