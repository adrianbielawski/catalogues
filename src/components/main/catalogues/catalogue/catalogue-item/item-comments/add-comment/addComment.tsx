import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import styles from './addComment.scss'
//Custom components
import Input from 'components/global-components/input/input'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { confirmOnEnter } from 'src/utils'
import { useTypedSelector } from 'store/storeConfig'
import { itemSelector } from 'store/selectors'

type Props = {
    itemId: number,
    onAdd: (comment: string) => void
}

const AddComment = (props: Props) => {
    const posting = useTypedSelector(itemSelector(props.itemId)).postingComment
    const inputRef = useRef<HTMLInputElement>(null)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (!posting && inputRef.current) {
            inputRef.current.value = ''
            setComment('')
        }
    }, [posting])

    const handleChange = () => {
        setComment(inputRef.current!.value)
    }

    const handleConfirm = () => {
        if (comment.length === 0) {
            return
        }
        props.onAdd(inputRef.current!.value)
    }

    confirmOnEnter(inputRef, handleConfirm)

    return (
        <div className={styles.addComment}>
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
                placeholder={'Add comment'}
                ref={inputRef}
                onChange={handleChange}
            />
        </div>
    )
}

export default AddComment