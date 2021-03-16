import React from 'react'
import styles from './itemComments.scss'
//Types
import { DeserializedCommentsData } from 'src/globalTypes'
//Redux
//Custom components
import Comment from './comment/comment'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddComment from './add-comment/addComment'
import { useAppDispatch } from 'store/storeConfig'
import { POST_ITEM_COMMENT } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'

type Props = {
    itemId: number,
    commentsData: DeserializedCommentsData,
}

const ItemComments = (props: Props) => {
    const dispatch = useAppDispatch()
    const comments = []

    for (let i = 0; i < 2; i++) {
        if (props.commentsData.results[i] === undefined) {
            break
        }
        comments.push(
            <Comment
                comment={props.commentsData.results[i]}
                key={i}
            />
        )
    }

    const handleShowAllComments = () => {

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
                    onClick={handleShowAllComments}
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
        </div>
    )
}

export default ItemComments