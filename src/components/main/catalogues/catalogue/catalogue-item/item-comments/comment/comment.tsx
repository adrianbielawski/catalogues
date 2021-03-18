import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './comment.scss'
//Types
import { DeserializedItemComment, LocationState } from 'src/globalTypes'
import UserImage from 'components/global-components/user-image/userImage'
import CommentChildren from './comment-children/commentChildren'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    comment: DeserializedItemComment,
    className?: string,
    clipText?: boolean,
}

const cx = classNames.bind(styles)

const Comment: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const history = useHistory<LocationState>()

    const handleUsernameClick = () => {
        history.push(`/${props.comment.createdBy.username}`)
    }

    const getChildren = (comment: DeserializedItemComment) => {
        if ('children' in comment && comment.children.length !== 0) {
            return <CommentChildren children={comment.children} />
        }
    }

    const getReplyButton = (comment: DeserializedItemComment) => {
        if ('children' in comment) {
            return (
                <TransparentButton onClick={handleReply}>
                    Reply
                </TransparentButton>
            )
        }
    }
    const handleReply = () => {
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
    moment.updateLocale('en', {
        relativeTime: {
            future: "%s ago",
        }
    })

    return (
        <li
            className={commentClass}
            ref={ref}
        >
            <div className={styles.parent}>
                <div className={styles.commentContent}>
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
                </div>
                <div className={styles.info}>
                    {getReplyButton(props.comment)}
                    <p className={styles.createdAt}>
                        {moment(props.comment.createdAt).fromNow()}
                    </p>
                </div>
            </div>
            {getChildren(props.comment)}
        </li>
    )
}

export default React.forwardRef(Comment)