import React, { useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './iconWithTitle.scss'

type Props = {
    title: string,
    icon: IconDefinition,
    children: JSX.Element | HTMLElement,
}

const cx = classNames.bind(styles)

const IconWithTitle = (props: Props) => {
    const [active, setActive] = useState(false)

    const toggleShowContent = () => {
        setActive(!active)
    }

    const contentClass = cx(
        'content',
        { active },
    )
    const titleClass = cx(
        'title',
        { active },
    )

    return (
        <div className={styles.iconWithTitle}>
            <div
                className={titleClass}
                onClick={toggleShowContent}
            >
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={props.icon}
                />
                <p>{props.title}</p>
            </div>
            <div className={contentClass}>
                {props.children}
            </div>
        </div>
    )
}

export default IconWithTitle