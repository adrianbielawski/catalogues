import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './commentsModal.module.scss'
//Types
import { DeserializedCommentData, DeserializedImage, DeserializedListData } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { commentsSelector } from 'store/selectors'
//Components
import Comment from '../comment/comment'
import AddComment from '../add-comment/addComment'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

type Props = {
    show: boolean,
    itemId: number,
    commentsData: DeserializedListData<DeserializedCommentData>,
    images: DeserializedImage[],
    canComment: boolean,
    isPostingComment: boolean,
    isFetchingComments: boolean,
    onClose: () => void,
    onAdd: (text: string, parentId?: number) => void,
    onFetch: (page: number) => void,
}

const CommentsModal = (props: Props) => {
    const screenWidth = useTypedSelector(state => state.modules.app.screenWidth)
    const comments = useTypedSelector(commentsSelector())

    const fetchComments = () => {
        props.onFetch(props.commentsData.next!)
    }

    const handleAddComment = (text: string, parentId?: number) => {
        props.onAdd(text, parentId)
    }

    const commentsComponents = props.commentsData.results.map(comment => (
        <Comment
            comment={comments[comment.id]!}
            canComment={props.canComment}
            key={comment.id}
        />
    ))

    let commentsTop = 0

    if (props.canComment) {
        if (screenWidth.largeViewport) {
            commentsTop = 52
        } else {
            commentsTop = 94
        }
    } else {
        if (screenWidth.mediumViewport || screenWidth.smallViewport) {
            commentsTop = 52
        }
    }

    return (
        <AnimatedModal
            show={props.show}
            className={styles.commentsModal}
            onClose={screenWidth.largeViewport ? props.onClose : undefined}
        >
            <div className={styles.wrapper}>
                {screenWidth.largeViewport && (
                    <div className={styles.carouselWrapper}>
                        <ImagesCarousel
                            images={props.images}
                            singleView={true}
                            showCounter={true}
                        />
                    </div>
                )}
                <div className={styles.commentsWrapper}>
                    {(screenWidth.mediumViewport || screenWidth.smallViewport) && (
                        <div
                            className={styles.buttonWrapper}
                        >
                            <TransparentButton onClick={props.onClose}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </TransparentButton>
                        </div>
                    )}
                    {props.canComment && (
                        <AddComment
                            className={styles.addComment}
                            itemId={props.itemId}
                            isPostingComment={props.isPostingComment}
                            onAdd={handleAddComment}
                        />
                    )}
                    <div
                        className={styles.comments}
                        style={{
                            '--top': `${commentsTop}px`,
                        } as React.CSSProperties}
                    >
                        <PaginatedList
                            next={props.commentsData.next}
                            isFetching={props.isFetchingComments}
                            intersectingElement={3}
                            onLoadMore={fetchComments}
                        >
                            {commentsComponents}
                        </PaginatedList>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    )
}

export default CommentsModal