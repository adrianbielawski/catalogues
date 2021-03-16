import React from 'react'
import styles from './comment.scss'
//Types
import { DeserializedItemComment, LocationState } from 'src/globalTypes'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
//Redux
//Custom components

type Props = {
    comment: DeserializedItemComment,
}

const Comment = (props: Props) => {
    const history = useHistory<LocationState>()

    const handleUsernameClick = () => {
        history.push(`/${props.comment.createdBy.username}`)
    }
    return (
        <li className={styles.comment}>
            <p className={styles.wrapper}>
                <span
                    className={styles.username}
                    onClick={handleUsernameClick}
                >
                    {props.comment.createdBy.username}
                </span>
                {props.comment.text}
            </p>
            <p className={styles.createdAt}>
                {moment.max((props.comment.createdAt, moment())).fromNow()}
            </p>
        </li>
    )
}

export default Comment