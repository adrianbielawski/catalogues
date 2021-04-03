import React from 'react'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSlash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './noImageIcon.scss'

type Props = {
    className?: string,
    size?: SizeProp,
}

const cx = classNames.bind(styles)

const NoImageIcon = (props: Props) => {

    const iconClass = cx(
        'noImageIcon',
        props.className,
    )
    
    return (
        <div className={`fa-layers fa-fw ${iconClass}`}>
            <FontAwesomeIcon
                icon={faCamera}
                size={props.size} />
            <FontAwesomeIcon
                icon={faSlash}
                size={props.size}
                className={styles.slash}
            />
        </div>
    )
}

export default NoImageIcon

