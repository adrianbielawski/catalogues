import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { orderBy } from 'lodash'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Types
import { AuthUserChoiceData, AuthUserChoiceFieldData, DeserializedField } from 'src/globalTypes'
//Redux
import { REMOVE_FIELD_CHOICE } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import AddChoice from 'components/global-components/add-choice/addChoice'
import SearchBar from 'components/global-components/search-bar/searchBar'
import
    ProtectedConfirmMessageModal, { ProtectedMessage }
from 'components/global-components/protected-confirm-message-modal/protectedConfirmMessageModal'

type Props = {
    field: DeserializedField,
    fieldData: AuthUserChoiceFieldData,
    choices: AuthUserChoiceData[],
    className: string,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const dispatch = useAppDispatch()
    const choices = useTypedSelector(state => state.entities.choices.entities)
    const [choicesSortDir, setChoicesSortDir] = useState<'asc' | 'desc'>('asc')
    const [searchChoiceValue, setSearchChoiceValue] = useState('')
    const [protectedMessage, setProtectedMessage] = useState<ProtectedMessage | null>(null)

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
        dispatch(REMOVE_FIELD_CHOICE({
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

    const filteredChoices = props.choices.filter(c =>
        choices[c.id]!.value.toLowerCase().includes(searchChoiceValue.toLowerCase())
    )

    const sortedChoices = orderBy(
        filteredChoices,
        (c) => choices[c.id]!.value.toLowerCase(),
        choicesSortDir
    )

    const choicesComponents = (
        sortedChoices.map(c => {
            const handleDelete = () => {
                displayMessage(c.id, choices[c.id]!.value)
            }

            return (
                <li className={styles.choice} key={choices[c.id]!.value}>
                    <TransparentButton className={styles.removeButton} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choices[c.id]!.value}</span>
                </li>
            )
        })
    )

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
                {choicesComponents}
            </ul>
            <AddChoice
                field={props.field}
                fieldData={props.fieldData}
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