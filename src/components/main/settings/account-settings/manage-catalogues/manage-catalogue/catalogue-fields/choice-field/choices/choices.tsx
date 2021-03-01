import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { CLEAR_REMOVE_CHOICE_ERROR, REMOVE_CHOICE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch } from 'store/storeConfig'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddChoice from 'components/global-components/add-choice/addChoice'
import MessageModal from 'components/global-components/message-modal/messageModal'

type Props = {
    field: DeserializedChoiceField,
    className: string,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const dispatch = useAppDispatch()

    const clearError = () => {
        dispatch(CLEAR_REMOVE_CHOICE_ERROR({
            catalogueId: props.field.catalogueId,
            fieldId: props.field.id,
        }))
    }

    const choices = (
        props.field.choices.map(choice => {

            const handleRemove = () => {
                dispatch(REMOVE_CHOICE({
                    catalogueId: props.field.catalogueId,
                    fieldId: props.field.id,
                    choiceId: choice.id,
                }))
            }

            return (
                <li className={styles.choice} key={choice.value}>
                    <TransparentButton className={styles.removeButton} onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choice.value}</span>
                </li>
            )
        })
    )

    const error = props.field.removeChoiceError

    const choicesClass = cx(
        'choicesList',
        props.className,
    )

    return (
        <div className={styles.choices}>
            <ul className={choicesClass}>
                {choices}
            </ul>
            <AddChoice
                field={props.field}
            />
            <MessageModal
                show={error.message.length !== 0}
                title={error.title}
                message={error.message}
                onConfirm={clearError}
            />
        </div>
    )
}

export default Choices