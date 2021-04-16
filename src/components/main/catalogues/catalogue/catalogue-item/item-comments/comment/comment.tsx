import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './comment.scss'
//Types
import { DeserializedItemComment, LocationState } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { userSelector } from 'store/selectors'
//Context
import { ItemCommentsContext } from '../item-comments-context/itemCommentsStore'
//Components
import CommentChildren from './comment-children/commentChildren'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AvatarWithName from 'components/global-components/avatar-with-name/avatarWithName'
import AnimateHeight from 'react-animate-height'

type Props = {
    comment: DeserializedItemComment,
    canComment: boolean,
    isChild?: boolean,
    className?: string,
    clipText?: boolean,
}

const cx = classNames.bind(styles)

const Comment: React.ForwardRefRenderFunction<
    HTMLLIElement,
    Props
> = (props, ref) => {
    const { comment } = props
    const history = useHistory<LocationState>()
    const user = useTypedSelector(userSelector(comment.createdBy))
    const { replyTo, changeReplyTo } = useContext(ItemCommentsContext)
    const [clipText, setClipText] = useState(props.clipText)
    const [height, setHeight] = useState<'auto' | 35>(props.clipText ? 35 : 'auto')
    
    const handleUsernameClick = () => {
        history.push(`/${user.username}`)
    }

    const handleCommentClick = () => {
        if (!props.clipText) {
            return
        }
        if (clipText) {
            setHeight('auto')
            setClipText(false)
        } else {
            setHeight(35)
        }
    }

    const handleAnimationEnd = () => {
        if (height === 35) {
            setClipText(true)
        }
    }

    const handleReply = () => {
        changeReplyTo({
            id: comment.id,
            username: user.username,
        })
    }

    const getChildren = () => {
        if ('children' in comment && comment.children.length !== 0) {
            return (
                <CommentChildren
                    children={comment.children}
                    canComment={props.canComment}
                />
            )
        }
    }

    const getReplyButton = () => {
        if ('children' in comment) {
            return (
                <TransparentButton onClick={handleReply}>
                    Reply
                </TransparentButton>
            )
        }
    }

    const getCreatedAt = () => {
        if (moment(comment.createdAt).isAfter(moment())) {
            return 'now'
        }
        return moment(comment.createdAt).fromNow()
    }

    const commentClass = cx(
        'comment',
        props.className,
        {
            replying: replyTo?.id === comment.id,
            clipText: clipText,
        }
    )
    const parentCommentTextClass = cx(
        {
            parentCommentText: !props.isChild
        }
    )

    return (
        <li
            className={commentClass}
            ref={ref}
        >
            <div className={styles.parent}>
                <div className={styles.commentContent}>
                    <AvatarWithName
                        name={user.username}
                        placeholderIcon={faUser}
                        className={styles.avatar}
                        url={user.imageThumbnail}
                        avatarClassName={styles.userImage}
                        onClick={handleUsernameClick}
                    />
                    <AnimateHeight
                        className={styles.commentTextWrapper}
                        height={height}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        <p
                            className={parentCommentTextClass}
                            onClick={handleCommentClick}>
                            {comment.text}
                        </p>
                    </AnimateHeight>
                </div>
                <div className={styles.info}>
                    {props.canComment && getReplyButton()}
                    <p className={styles.createdAt}>
                        {getCreatedAt()}
                    </p>
                </div>
            </div>
            {getChildren()}
        </li>
    )
}

export default React.forwardRef(Comment)