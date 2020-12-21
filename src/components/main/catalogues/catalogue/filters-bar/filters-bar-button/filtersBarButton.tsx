import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './filtersBarButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import useFiltersBarContext from '../useFiltersBarContext'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const FiltersBarButton = (props: Props) => {
    const filtersBarContext = useFiltersBarContext()

    const handleClick = () => {
        filtersBarContext.filtersBar.toggleFiltersBar()
    }

    const buttonClass = cx(
        'filtersBarButton',
        props.className,
    )

    return (
        <TransparentButton className={buttonClass} onClick={handleClick}>
            <FontAwesomeIcon icon={faFilter} className={styles.leftArrow} />
        </TransparentButton>
    )
}

export default FiltersBarButton