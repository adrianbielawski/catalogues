import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './button.scss'
//Contexts
import { ListContext } from '../listStore'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Button = (props: Props) => {
    const { dispatch, ...state } = useContext(ListContext)
    const { className, ...rest } = props

    const handleClick = () => {
        dispatch({ type: 'BUTTON_CLICKED' })
    }

    const buttonClass = cx(
        'button',
        props.className,
    )

    return (
        state.maxHeightCollapsed < state.maxHeight
            ? (
                <button
                    className={buttonClass}
                    onClick={handleClick}
                    {...rest}
                >
                    <>
                        <span>{state.showAllItems ? 'Show less' : 'Show more'}</span>
                        <FontAwesomeIcon
                            icon={state.showAllItems ? faLongArrowAltUp : faLongArrowAltDown}
                            className={styles.arrow}
                        />
                    </>
                </button>
            )
            : null
    )
}

export default Button