import React, { useState } from 'react'
import ReactAnimateHeight from 'react-animate-height'
import classNames from 'classnames/bind'
import styles from './commentChildren.scss'
//Types
import { DeserializedItemCommentChildren } from 'src/globalTypes'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Comment from '../comment'

type Props = {
    children: DeserializedItemCommentChildren[],
    className?: string,
}

const cx = classNames.bind(styles)

const CommentChildren = (props: Props) => {
    const [showReplies, setShowReplies] = useState(false)

    const toggleShowReplies = () => {
        setShowReplies(!showReplies)
    }

    const children = props.children.map(child => (
        <Comment
            comment={child}
            key={child.id}
        />
    ))

    const commentClass = cx(
        'commentChildren',
        props.className,
    )

    return (
        <div className={commentClass}>
            <TransparentButton onClick={toggleShowReplies}>
                {showReplies ? 'Hide replies' : `Show replies (${children.length})`}
            </TransparentButton>
            <div className={styles.wrapper}>
                <ReactAnimateHeight
                    height={showReplies ? 'auto' : 0}
                >
                    <ul>
                        {children}
                    </ul>
                </ReactAnimateHeight>
            </div>
        </div>
    )
}

export default CommentChildren