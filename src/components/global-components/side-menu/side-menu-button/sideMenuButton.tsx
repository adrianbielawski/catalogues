import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './sideMenuButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { SideMenuContext } from '../sideMenuStore'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const SideMenuButton = (props: Props) => {
    const sideMenuContext = useContext(SideMenuContext)
    const handleClick = () => {
        sideMenuContext.toggleSideMenu()
    }

    const buttonClass = cx(
        'filtersBarButton',
        props.className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={handleClick}>
            <FontAwesomeIcon icon={faEllipsisV} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default SideMenuButton