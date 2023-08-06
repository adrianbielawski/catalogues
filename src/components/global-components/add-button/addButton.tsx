import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './addButton.module.scss'
//Custom hooks
import { useDelay } from 'src/hooks/useDelay'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from '../loader/loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    loading?: boolean,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const AddButton = (props: Props) => {
    const delayCompleated = useDelay(props.loading)
    const { text, loading, onClick, className, ...rest } = props

    const buttonClass = cx(
        'addButton',
        className,
    )

    return (
        <TransparentButton
            className={buttonClass}
            disabled={loading}
            onClick={onClick}
            {...rest}
        >
            <>
                {delayCompleated
                    ? <Loader size={24} />
                    : <FontAwesomeIcon icon={faPlus} className={styles.plus} />
                }
                {text ? <p>{text}</p> : null}
            </>
        </TransparentButton>
    )
}

export default AddButton
