import {
  useContext,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './comment.module.scss'
import { DeserializedItemComment } from 'src/globalTypes'
import { useTypedSelector } from 'store/storeConfig'
import { userSelector } from 'store/selectors'
import { ItemCommentsContext } from '../item-comments-context/itemCommentsStore'
import CommentChildren from './comment-children/commentChildren'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AvatarWithName from 'components/global-components/avatar-with-name/avatarWithName'
import AnimateHeight from 'react-animate-height'
import { useNavigate } from 'react-router-dom'

interface Props {
  comment: DeserializedItemComment
  canComment: boolean
  isChild?: boolean
  className?: string
  clipText?: boolean
}

const cx = classNames.bind(styles)

const Comment: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  props,
  ref,
) => {
  const { comment } = props
  const navigate = useNavigate()
  const user = useTypedSelector(userSelector(comment.createdBy))
  const { replyTo, changeReplyTo } = useContext(ItemCommentsContext)
  const [clipText, setClipText] = useState(props.clipText)
  const [height, setHeight] = useState<'auto' | 35>(
    props.clipText ? 35 : 'auto',
  )

  const handleUsernameClick = () => {
    if (!user) {
      return
    }
    navigate(`/${user.username}`)
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
    if (!user) {
      return
    }
    changeReplyTo({
      id: comment.id,
      username: user.username,
    })
  }

  const getChildren = () => {
    if ('children' in comment && comment.children.length !== 0) {
      return (
        <CommentChildren
          commentChildren={comment.children}
          canComment={props.canComment}
        />
      )
    }
  }

  const getReplyButton = () => {
    if ('children' in comment) {
      return <TransparentButton onClick={handleReply}>Reply</TransparentButton>
    }
  }

  const getCreatedAt = () => {
    if (moment(comment.createdAt).isAfter(moment())) {
      return 'now'
    }
    return moment(comment.createdAt).fromNow()
  }

  const commentClass = cx('comment', props.className, {
    replying: replyTo?.id === comment.id,
    clipText,
  })
  const textClass = cx('text', {
    parentText: !props.isChild,
  })

  return (
    <div className={commentClass} ref={ref}>
      <div className={styles.parent}>
        <AnimateHeight height={height} onAnimationEnd={handleAnimationEnd}>
          <div className={styles.wrapper}>
            {user && (
              <AvatarWithName
                name={user.username}
                placeholderIcon={faUser}
                className={styles.avatar}
                url={user.imageThumbnail}
                avatarClassName={styles.userImage}
                onClick={handleUsernameClick}
              />
            )}
            <span className={textClass} onClick={handleCommentClick}>
              {comment.text}
            </span>
          </div>
        </AnimateHeight>
        <div className={styles.info}>
          {props.canComment && getReplyButton()}
          <p className={styles.createdAt}>{getCreatedAt()}</p>
        </div>
      </div>
      {getChildren()}
    </div>
  )
}

export default forwardRef(Comment)
