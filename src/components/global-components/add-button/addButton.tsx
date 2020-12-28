import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './addButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const AddButton = (props: Props) => {
    const { text, onClick, className, ...rest } = props
    
    const buttonClass = cx(
        'addButton',
        className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={onClick} { ...rest }>
            <>
                <FontAwesomeIcon icon={faPlus} className={styles.plus} />
                {text ? <p>{text}</p> : null}
            </>
        </TransparentButton>
    )
}

export default AddButton
