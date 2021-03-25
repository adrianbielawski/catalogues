import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './filtersBarButton.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    className?: string,
    onToggleFiltersBar: (e: React.MouseEvent) => void
}

const cx = classNames.bind(styles)

const FiltersBarButton = (props: Props) => {
    const location = useLocation<LocationState>()

    const buttonClass = cx(
        'filtersBarButton',
        props.className,
        {
            filtersApplied: location.search,
        },
    )

    return (
        <TransparentButton className={buttonClass} onClick={props.onToggleFiltersBar}>
            <FontAwesomeIcon icon={faFilter} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default FiltersBarButton