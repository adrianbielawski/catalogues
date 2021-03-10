import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Types
import { DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { CLEAR_FIELD_ERROR, REMOVE_CHOICE } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { useAppDispatch } from 'store/storeConfig'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddChoice from 'components/global-components/add-choice/addChoice'
import MessageModal from 'components/global-components/message-modal/messageModal'
import SearchBar from 'components/global-components/search-bar/searchBar'
import { orderBy } from 'lodash'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'

type Props = {
    field: DeserializedChoiceField,
    className: string,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const dispatch = useAppDispatch()
    const [choicesSortDir, setChoicesSortDir] = useState<'asc' | 'desc'>('asc')
    const [searchChoiceValue, setSearchChoiceValue] = useState('')
    const [protectedMessage, setProtectedMessage] = useState<ProtectedMessage | null>(null)

    const clearError = () => {
        dispatch(CLEAR_FIELD_ERROR({
            catalogueId: props.field.catalogueId,
            fieldId: props.field.id,
        }))
    }

    const displayMessage = (choiceId: number, expected: string) => {
        setProtectedMessage({
            title: 'Delete item',
            value: `Are you sure you want to delete choice with name: ${expected}?`,
            expectedInput: expected,
            callbackParams: { choiceId },
        })
    }

    const clearProtectedMessage = () => {
        setProtectedMessage(null)
    }

    const deleteChoice = () => {
        dispatch(REMOVE_CHOICE({
            catalogueId: props.field.catalogueId,
            fieldId: props.field.id,
            choiceId: protectedMessage!.callbackParams!.choiceId,
        }))
        clearProtectedMessage()
    }

    const handleSort = () => {
        let sort: 'asc' | 'desc' = 'asc'

        if (choicesSortDir === 'asc') {
            sort = 'desc'
        } else {
            sort = 'asc'
        }
        setChoicesSortDir(sort)
    }

    const handleSearch = (input: string) => {
        setSearchChoiceValue(input)
    }

    const filteredChoices = props.field.choices.filter(choice =>
        choice.value.toLowerCase().includes(searchChoiceValue.toLowerCase())
    )

    const sortedChoices = orderBy(
        filteredChoices,
        (c) => c.value.toLowerCase(),
        choicesSortDir
    )

    const choices = (
        sortedChoices.map(choice => {
            const handleDelete = () => {
                displayMessage(choice.id, choice.value)
            }

            return (
                <li className={styles.choice} key={choice.value}>
                    <TransparentButton className={styles.removeButton} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choice.value}</span>
                </li>
            )
        })
    )

    const error = props.field.fieldError

    const choicesClass = cx(
        'choicesList',
        props.className,
    )

    return (
        <div className={styles.choices}>
            <SearchBar
                sortDir={choicesSortDir}
                defaultSearchValue={searchChoiceValue}
                onSort={handleSort}
                onSearch={handleSearch}
            />
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
            <ProtectedConfirmMessageModal
                show={protectedMessage !== null}
                message={protectedMessage}
                onConfirm={deleteChoice}
                onCancel={clearProtectedMessage}
            />
        </div>
    )
}

export default Choices