import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './AddButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    text?: string,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const AddButton = (props: Props) => {
    const buttonClass = cx(
        'addButton',
        props.className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={props.onClick}>
            <>
                <FontAwesomeIcon icon={faPlus} className={styles.plus} />
                {props.text ? <p>{props.text}</p> : null}
            </>
        </TransparentButton>
    )
}

export default AddButton