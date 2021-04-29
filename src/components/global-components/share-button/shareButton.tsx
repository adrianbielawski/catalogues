import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './shareButton.scss'
import TransparentButton from '../transparent-button/transparentButton'

type Data = {
    title: string,
    text?: string,
    url: string,
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    data: Data,
}

const cx = classNames.bind(styles)

const ShareButton = (props: Props) => {
    const { data, className, ...rest } = props

    const handleShare = () => {
        if (navigator.share) {
            navigator.share(props.data)
                .catch(console.error)
        }
    }

    const buttonClass = cx(
        'button',
        className,
    )

    if (!navigator.share) {
        return null
    }

    return (
        <TransparentButton
            className={buttonClass}
            onClick={handleShare}
            { ...rest }
        >
            <FontAwesomeIcon icon={faShareAlt} />
        </TransparentButton>
    )
}

export default ShareButton