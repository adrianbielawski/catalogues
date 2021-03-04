import React from 'react'
import classNames from 'classnames/bind'
import styles from './mobileNavBar.scss'
//Types
import { ExtraItem } from '../nav'
//Custom components
import NavButton from '../nav-button/navButton'

interface Props {
    extraItems?: ExtraItem[],
    goBackButton?: JSX.Element | undefined,
    toggleActive: () => void,
    handleGoBack: () => void
    className?: string,
}

const cx = classNames.bind(styles)

const MobileNavBar = (props: Props) => {
    const extraNavBarItems = props.extraItems!.map((item, index) => {
        if (item.inNavBarOnMobile) {
            return (
                <li key={`extraNavBarItem${index}`}>
                    {item.component}
                </li>
            )
        }
    })

    const mobileNavBarClass = cx(
        'mobileNavBar',
        {
            right: props.goBackButton === undefined,
        }
    )

    return (
        <div className={mobileNavBarClass}>
            {props.goBackButton}
            <ul>
                {extraNavBarItems}
                <li key={'navButton'}>
                    <NavButton onClick={props.toggleActive} />
                </li>
            </ul>
        </div>
    )
}

export default MobileNavBar