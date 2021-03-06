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
import useFiltersBarContext from '../useFiltersBarContext'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const FiltersBarButton = (props: Props) => {
    const location = useLocation<LocationState>()
    const filtersBarContext = useFiltersBarContext()

    useEffect(() => {
        if (filtersBarContext.filtersBar.show) {
            setTimeout(() => window.addEventListener('click', toggleFiltersBar), 1)
        } else {
            window.removeEventListener('click', toggleFiltersBar)
        }
        return () => {
            window.removeEventListener('click', toggleFiltersBar)
        }
    }, [filtersBarContext.filtersBar])

    const toggleFiltersBar = () => {
        filtersBarContext.filtersBar.toggleFiltersBar()
    }

    const buttonClass = cx(
        'filtersBarButton',
        props.className,
        {
            filtersApplied: location.search,
        },
    )

    return (
        <TransparentButton className={buttonClass} onClick={toggleFiltersBar}>
            <FontAwesomeIcon icon={faFilter} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default FiltersBarButton