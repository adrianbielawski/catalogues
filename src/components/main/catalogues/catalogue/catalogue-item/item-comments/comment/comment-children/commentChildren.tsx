import { useState } from 'react'
import ReactAnimateHeight from 'react-animate-height'
import classNames from 'classnames/bind'
import styles from './commentChildren.module.scss'
// Types
import { DeserializedItemCommentChild } from 'src/globalTypes'
// Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Comment from '../comment'

interface Props {
  commentChildren: DeserializedItemCommentChild[]
  canComment: boolean
  className?: string
}

const cx = classNames.bind(styles)

const CommentChildren = (props: Props) => {
  const [showReplies, setShowReplies] = useState(false)

  const toggleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  const children = props.commentChildren.map((child) => (
    <li key={child.id}>
      <Comment comment={child} canComment={props.canComment} isChild={true} />
    </li>
  ))

  const commentClass = cx('commentChildren', props.className)

  return (
    <div className={commentClass}>
      <TransparentButton onClick={toggleShowReplies}>
        {showReplies ? 'Hide replies' : `Show replies (${children.length})`}
      </TransparentButton>
      <div className={styles.wrapper}>
        <ReactAnimateHeight height={showReplies ? 'auto' : 0}>
          <ul>{children}</ul>
        </ReactAnimateHeight>
      </div>
    </div>
  )
}

export default CommentChildren
