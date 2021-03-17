import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './comment.scss'
//Types
import { DeserializedItemComment, LocationState } from 'src/globalTypes'
import UserImage from 'components/global-components/user-image/userImage'

type Props = {
    comment: DeserializedItemComment,
    className?: string,
    clipText?: boolean,
}

const cx = classNames.bind(styles)

const Comment = (props: Props) => {
    const history = useHistory<LocationState>()

    const handleUsernameClick = () => {
        history.push(`/${props.comment.createdBy.username}`)
    }

    const commentClass = cx(
        'comment',
        props.className,
    )

    const wrapperClass = cx(
        'wrapper',
        {
            clipText: props.clipText,
        },
    )

    return (
        <li className={commentClass}>
            <UserImage
                url={props.comment.createdBy.imageThumbnail}
                className={styles.userImage}
            />
            <p className={wrapperClass}>
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