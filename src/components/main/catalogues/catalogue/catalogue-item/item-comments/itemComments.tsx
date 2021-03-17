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

type Props = {
    itemId: number,
    commentsData: DeserializedCommentsData,
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
                className={styles.comment}
                clipText={true}
                key={i}
            />
        )
    }

    const toggleShowAllComments = () => {
        setShowAllComments(!showAllComments)
    }

    const handleAddComment = (text: string) => {
        dispatch(POST_ITEM_COMMENT({
            itemId: props.itemId,
            text,
        }))
    }

    return (
        <div className={styles.itemComments}>
            {props.commentsData.results.length ? (
                <TransparentButton
                    onClick={toggleShowAllComments}
                >
                    {`Show all ${props.commentsData.count} comments`}
                </TransparentButton>
            ) : <p>No comments</p>}
            <ul>
                {comments}
            </ul>
            <AddComment
                itemId={props.itemId}
                onAdd={handleAddComment}
            />
            <CommentsModal
                show={showAllComments}
                itemId={props.itemId}
                onClose={toggleShowAllComments}
            />
        </div>
    )
}

export default ItemComments