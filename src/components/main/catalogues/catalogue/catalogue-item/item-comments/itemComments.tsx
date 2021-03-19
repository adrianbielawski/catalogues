import React, { useState } from 'react'
import styles from './itemComments.scss'
//Types
import { DeserializedCommentsData } from 'src/globalTypes'
//Redux
import { useAppDispatch } from 'store/storeConfig'
import { POST_ITEM_COMMENT } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
//Custom components
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
    commentsData: DeserializedCommentsData,
    canComment: boolean,
}

const ItemComments = (props: Props) => {
    const dispatch = useAppDispatch()
    const [showAllComments, setShowAllComments] = useState(false)
    const comments = []

    for (let i = 0; i < 2; i++) {
        if (props.commentsData.results[i] === undefined) {
            break
        }
        comments.push(
            <Comment
                comment={props.commentsData.results[i]}
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

    return (
        <ItemCommentsContextProvider value={contextValue}>
            <div className={styles.itemComments}>
                {props.commentsData.results.length > 2 && (
                    <TransparentButton
                        onClick={toggleShowAllComments}
                    >
                        {`Show all ${props.commentsData.count} comments`}
                    </TransparentButton>
                )}
                {!props.commentsData.results.length && <p>No comments</p>}
                <ul>
                    {comments}
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