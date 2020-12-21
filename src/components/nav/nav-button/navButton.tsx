import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from './navButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
    onClick: () => void,
    className?: string,
}

const cx = classNames.bind(styles)

const NavButton = (props: Props) => {
    const buttonClass = cx(
        'navButton',
        props.className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={props.onClick}>
            <FontAwesomeIcon icon={faBars} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default NavButton