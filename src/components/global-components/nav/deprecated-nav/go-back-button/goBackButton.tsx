import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    title: string,
    className?: string,
    arrowClass?: string,
    onClick: () => void,
}

const GoBackButton = (props: Props) => (
    <div className={props.className} onClick={props.onClick} key={'goBack'}>
        <FontAwesomeIcon
            icon={faArrowLeft}
            className={props.arrowClass}
        />
        <p>{props.title}</p>
    </div>
)

export default GoBackButton