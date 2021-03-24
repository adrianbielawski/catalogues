import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './comment.scss'
//Types
import { DeserializedItemComment, LocationState } from 'src/globalTypes'
//Context
import { ItemCommentsContext } from '../item-comments-context/itemCommentsStore'
//Custom components
import Avatar from 'components/global-components/avatar/avatar'
import CommentChildren from './comment-children/commentChildren'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    comment: DeserializedItemComment,
    canComment: boolean,
    className?: string,
    clipText?: boolean,
}

const cx = classNames.bind(styles)

const Comment: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const { replyTo, changeReplyTo } = useContext(ItemCommentsContext)
    const history = useHistory<LocationState>()

    const handleUsernameClick = () => {
        history.push(`/${props.comment.createdBy.username}`)
    }

    const handleReply = () => {
        changeReplyTo({
            id: props.comment.id,
            username: props.comment.createdBy.username,
        })
    }

    const getChildren = (comment: DeserializedItemComment) => {
        if ('children' in comment && comment.children.length !== 0) {
            return (
                <CommentChildren
                    children={comment.children}
                    canComment={props.canComment}
                />
            )
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

    const commentClass = cx(
        'comment',
        props.className,
        {
            replying: replyTo?.id === props.comment.id,
        }
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
                    <Avatar
                        placeholderIcon={faUser}
                        className={styles.userImage}
                        url={props.comment.createdBy.imageThumbnail}
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
                    {props.canComment && getReplyButton(props.comment)}
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