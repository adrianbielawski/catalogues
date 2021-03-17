import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './commentsModal.scss'
//Custom hooks and utils
import { useDelay, useElementInView } from 'src/customHooks'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { FETCH_ITEM_COMMENTS, POST_ITEM_COMMENT } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { itemSelector } from 'store/selectors'
//Custom components
import Comment from '../comment/comment'
import AddComment from '../add-comment/addComment'
import AnimatedModal from 'components/global-components/modals/animated-modal/animatedModal'
import ImagesCarousel from 'components/global-components/images-carousel/imagesCarousel'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from 'components/global-components/loader/loader'

type Props = {
    show: boolean,
    itemId: number,
    onClose: () => void,
}

const CommentsModal = (props: Props) => {
    const dispatch = useAppDispatch()
    const item = useTypedSelector(itemSelector(props.itemId))
    const fetchingCommentsDelay = useDelay()
    const innerWidth = window.innerWidth

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && item.commentsData?.next) {
            fetchComments()
        }
    }

    const lastItemRef = useElementInView(handleIntersecting)

    const fetchComments = () => {
        dispatch(FETCH_ITEM_COMMENTS({
            itemId: props.itemId,
            page: item.commentsData!.next,
        }))
    }

    const handleAddComment = (text: string) => {
        dispatch(POST_ITEM_COMMENT({
            itemId: item.id,
            text,
        }))
    }

    const comments = item.commentsData!.results.map((comment, i) => {
        const ref = item.commentsData!.results.length - 1 === i ? lastItemRef : null
        return (
            <Comment
                comment={comment}
                key={comment.id}
                ref={ref}
            />
        )
    })

    return (
        <AnimatedModal
            show={props.show}
            className={styles.commentsModal}
            onClose={innerWidth > 800 ? props.onClose : undefined}
        >
            <div className={styles.wrapper}>
                {innerWidth > 800 && (
                    <div>
                    <ImagesCarousel
                        width={window.innerWidth * .5}
                        height={window.innerHeight * .9}
                        images={item.images}
                        singleView={true}
                        fullSizeImages={true}
                        showCounter={true}
                        background={'grey'}
                    />
                    </div>
                )}
                <div className={styles.commentsWrapper}>
                    {innerWidth <= 800 && (
                        <div
                            className={styles.buttonWrapper}
                        >
                            <TransparentButton onClick={props.onClose}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </TransparentButton>
                        </div>
                    )}
                    <AddComment
                        className={styles.addComment}
                        itemId={item.id}
                        onAdd={handleAddComment}
                    />
                    <ul className={styles.comments}>
                        {comments}
                    </ul>
                    {fetchingCommentsDelay && <Loader className={styles.loader} />}
                </div>
            </div>
        </AnimatedModal>
    )
}

export default CommentsModal