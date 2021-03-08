import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './sideMenuButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    className?: string,
    onToggle: (e: React.MouseEvent) => void,
}

const cx = classNames.bind(styles)

const SideMenuButton = (props: Props) => {
    const buttonClass = cx(
        'filtersBarButton',
        props.className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={props.onToggle}>
            <FontAwesomeIcon icon={faEllipsisV} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default SideMenuButton