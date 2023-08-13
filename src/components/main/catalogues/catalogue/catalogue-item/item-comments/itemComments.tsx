import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './itemComments.module.scss'
//Types
import { DeserializedCommentData, DeserializedImage, DeserializedListData } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
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
    images: DeserializedImage[],
    canComment: boolean,
    isPostingComment: boolean,
    isFetchingComments: boolean,
    className?: string,
    onAdd: (text: string, parentId?: number) => void,
    onFetch: (page: number) => void,
}

const cx = classNames.bind(styles)

const ItemComments = (props: Props) => {
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
        props.onAdd(text, parentId)
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
                        isPostingComment={props.isPostingComment}
                        onAdd={handleAddComment}
                    />
                )}
                <CommentsModal
                    show={showAllComments}
                    itemId={props.itemId}
                    commentsData={props.commentsData}
                    images={props.images}
                    canComment={props.canComment}
                    isPostingComment={props.isPostingComment}
                    isFetchingComments={props.isFetchingComments}
                    onClose={toggleShowAllComments}
                    onAdd={props.onAdd}
                    onFetch={props.onFetch}
                />
            </div>
        </ItemCommentsContextProvider>
    )
}

export default ItemComments