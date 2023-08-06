import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './modalHeader.module.scss'
//Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    className: string,
    buttonClassName: string,
    onClose: () => void,
}

const cx = classNames.bind(styles)

const ModalHeader = (props: Props) => {
    const headerClass = cx(
        'header',
        props.className,
    )

    const buttonClass = cx(
        'closeButton',
        props.buttonClassName,
    )

    return (
        <div className={headerClass}>
            <TransparentButton
                className={buttonClass}
                onClick={props.onClose}
            >
                <FontAwesomeIcon
                    className={styles.close}
                    icon={faTimes}
                />
            </TransparentButton>
        </div>
    )
}

export default ModalHeader