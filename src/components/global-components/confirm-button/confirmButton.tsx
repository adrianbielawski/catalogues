import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './confirmButton.scss'
//Custom components
import Loader from 'components/global-components/loader/loader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
    loading: boolean,
    size: number,
    className?: string,
    onClick: () => void
}

const cx = classNames.bind(styles)

const ConfirmButton = (props: Props) => {
    const confirnButtonClass = cx(
        'buttonWrapper',
        props.className,
    )

    return (
        <div
            className={confirnButtonClass}
            style={{
                '--size': `${props.size}px`,
            } as React.CSSProperties}
        >
            {!props.loading
                ? (
                    <TransparentButton
                        className={styles.button}
                        onClick={props.onClick}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </TransparentButton>
                )
                : (
                    <Loader size={props.size} />
                )
            }
        </div>
    )
}

export default ConfirmButton