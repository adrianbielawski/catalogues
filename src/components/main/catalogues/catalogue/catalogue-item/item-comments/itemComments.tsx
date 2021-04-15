import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './itemComments.scss'
//Types
import { DeserializedCommentData, DeserializedListData } from 'src/globalTypes'
//Redux
import { POST_ITEM_COMMENT } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { commentsSelector } from 'store/selectors'
//Components
import Comment from './comment/comment'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddComment from './add-comment/addComment'
import CommentsModal from './comments-modal/commentsModal'
import ItemCommentsContextProvider from './item-comments-context/itemCommentsContextProvider'

const contextValue = {
    replyTo: null,
}

type Props = {
    itemId: number,
    commentsData: DeserializedListData<DeserializedCommentData>,
    canComment: boolean,
    className?: string,
}

const cx = classNames.bind(styles)

const ItemComments = (props: Props) => {
    const dispatch = useAppDispatch()
    const comments = useTypedSelector(commentsSelector())
    const [showAllComments, setShowAllComments] = useState(false)
    const commentsComponents = []

    for (let i = 0; i < 2; i++) {
        if (props.commentsData.results[i]?.id === undefined) {
            break
        }
        
        commentsComponents.push(
            <Comment
                comment={comments[props.commentsData.results[i].id]!}
                canComment={props.canComment}
                className={styles.comment}
                clipText={true}
                key={i}
            />
        )
    }

    const toggleShowAllComments = () => {
        setShowAllComments(!showAllComments)
    }

    const handleAddComment = (text: string, parentId?: number) => {
        dispatch(POST_ITEM_COMMENT({
            itemId: props.itemId,
            parentId,
            text,
        }))
    }
    const itemCommentsClass = cx(
        'itemComments',
        props.className,
    )

    return (
        <ItemCommentsContextProvider value={contextValue}>
            <div className={itemCommentsClass}>
                {props.commentsData.results.length > 2 && (
                    <TransparentButton
                        onClick={toggleShowAllComments}
                    >
                        {`Show all ${props.commentsData.count} comments`}
                    </TransparentButton>
                )}
                {!props.commentsData.results.length && <p>No comments</p>}
                <ul>
                    {commentsComponents}
                </ul>
                {props.canComment && (
                    <AddComment
                        itemId={props.itemId}
                        onAdd={handleAddComment}
                    />
                )}
                <CommentsModal
                    show={showAllComments}
                    itemId={props.itemId}
                    canComment={props.canComment}
                    onClose={toggleShowAllComments}
                />
            </div>
        </ItemCommentsContextProvider>
    )
}

export default ItemComments