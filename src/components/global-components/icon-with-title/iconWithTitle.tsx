import React, { ReactNode, useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './iconWithTitle.scss'
import AnimateHeight from 'react-animate-height'

type Props = {
    title: string,
    icon: IconDefinition,
    children: ReactNode,
}

const cx = classNames.bind(styles)

const IconWithTitle = (props: Props) => {
    const [active, setActive] = useState(false)

    const toggleShowContent = () => {
        setActive(!active)
    }

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
            <AnimateHeight
                className={styles.content}
                height={active ? 'auto' : 0}
            >
                {props.children}
            </AnimateHeight>
        </div>
    )
}

export default IconWithTitle