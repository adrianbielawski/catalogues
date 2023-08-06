import React from 'react'
import styles from './settingsIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, IconDefinition } from '@fortawesome/free-solid-svg-icons'

type Props = {
    mainIcon: IconDefinition,
}

const SettingsIcon = (props: Props) => (
    <div className={styles.settingsIcon}>
        <FontAwesomeIcon icon={props.mainIcon} className={styles.main} />
        <FontAwesomeIcon icon={faCog} className={styles.cog} />
    </div>
)

export default SettingsIcon