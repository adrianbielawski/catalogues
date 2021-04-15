import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './addComment.scss'
//Utils
import { confirmOnEnter } from 'src/utils'
//Redux
import { itemDataSelector } from 'store/selectors'
import { useTypedSelector } from 'store/storeConfig'
//Context
import { ItemCommentsContext } from '../item-comments-context/itemCommentsStore'
//Components
import Input from 'components/global-components/input/input'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    itemId: number,
    className?: string,
    onAdd: (text: string, parentId?: number) => void
}

const cx = classNames.bind(styles)

const AddComment = (props: Props) => {
    const { replyTo, clearReplyTo } = useContext(ItemCommentsContext)
    const isPosting = useTypedSelector(itemDataSelector(props.itemId)).isPostingComment
    const inputRef = useRef<HTMLInputElement>(null)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (replyTo) {
            inputRef.current?.focus()
        }
    }, [replyTo])

    useEffect(() => {
        if (!isPosting && inputRef.current) {
            inputRef.current.value = ''
            setComment('')
            clearReplyTo()
        }
    }, [isPosting])

    const handleChange = () => {
        setComment(inputRef.current!.value)
    }

    const handleCancelReply = () => {
        inputRef.current!.value = ''
        setComment('')
        clearReplyTo()
    }

    const handleConfirm = () => {
        if (comment.length === 0) {
            return
        }
        props.onAdd(inputRef.current!.value, replyTo?.id as number)
    }

    confirmOnEnter(inputRef, handleConfirm)

    const addCommentClass = cx(
        'addComment',
        props.className,
    )

    return (
        <div className={addCommentClass}>
            <TransparentButton
                disabled={comment.length === 0}
                onClick={handleConfirm}
            >
                <FontAwesomeIcon
                    icon={faPaperPlane}
                />
            </TransparentButton>
            <Input
                className={styles.input}
                placeholder={replyTo?.id ? `Reply to ${replyTo.username}` : 'Add comment'}
                ref={inputRef}
                onChange={handleChange}
            />
            {replyTo?.id && (
                <TransparentButton
                    className={styles.cancelButton}
                    onClick={handleCancelReply}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                    />
                </TransparentButton>
            )}
        </div>
    )
}

export default AddComment