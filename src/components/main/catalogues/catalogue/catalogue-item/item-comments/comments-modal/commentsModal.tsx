import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './commentsModal.scss'
//Hooks and utils
import { useDelay } from 'src/hooks/useDelay'
import { useElementInView } from 'src/hooks/useElementInView'
//Redux
import { FETCH_ITEM_COMMENTS, POST_ITEM_COMMENT } from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { commentsSelector, itemCommentsDataSelector, itemSelector } from 'store/selectors'
//Components
import Comment from '../comment/comment'
import AddComment from '../add-comment/addComment'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from 'components/global-components/loader/loader'

type Props = {
    show: boolean,
    itemId: number,
    canComment: boolean,
    onClose: () => void,
}

const CommentsModal = (props: Props) => {
    const dispatch = useAppDispatch()
    const screenWidth = useTypedSelector(state => state.modules.app.screenWidth)
    const item = useTypedSelector(itemSelector(props.itemId))
    const commentsData = useTypedSelector(itemCommentsDataSelector(props.itemId))
    const comments = useTypedSelector(commentsSelector())
    const fetchingCommentsDelay = useDelay()

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && commentsData.next) {
            fetchComments()
        }
    }

    const lastItemRef = useElementInView(handleIntersecting)

    const fetchComments = () => {
        dispatch(FETCH_ITEM_COMMENTS({
            itemId: props.itemId,
            page: commentsData.next,
        }))
    }

    const handleAddComment = (text: string, parentId?: number) => {
        dispatch(POST_ITEM_COMMENT({
            itemId: item.id,
            parentId,
            text,
        }))
    }

    const commentsComponents = commentsData.results.map((comment, i) => {
        const ref = commentsData.results.length - 1 === i ? lastItemRef : null
        return (
            <Comment
                comment={comments[comment.id]!}
                canComment={props.canComment}
                key={comment.id}
                ref={ref}
            />
        )
    })

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
                            images={item.images}
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
                            itemId={item.id}
                            onAdd={handleAddComment}
                        />
                    )}
                    <ul
                        className={styles.comments}
                        style={{
                            '--top': `${commentsTop}px`,
                        } as React.CSSProperties}
                    >
                        {commentsComponents}
                    </ul>
                    {fetchingCommentsDelay && <Loader className={styles.loader} />}
                </div>
            </div>
        </AnimatedModal>
    )
}

export default CommentsModal