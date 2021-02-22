import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './searchInput.scss'
//Utils
import { confirmOnEnter } from 'src/utils'
//Custom components
import Input from 'components/global-components/input/input'
import TransparentButton from '../transparent-button/transparentButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch: (input: string) => void,
    onClear: () => void,
    value: string,
}

const SearchInput = (props: Props) => {
    const { onSearch, onClear, value, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [userInput, setUserInput] = useState(value)

    useEffect(() => {
        setUserInput(value)
    }, [value])

    const handleSearch = () => {
        if (inputRef.current !== null) {
            onSearch(inputRef.current.value)
        }
    }
    confirmOnEnter(inputRef, handleSearch)

    const handleClear = () => {
        if (inputRef.current !== null) {
            setUserInput('')
            onClear()
        }
    }

    const handleChange = () => {
        if (inputRef.current !== null) {
            setUserInput(inputRef.current.value)
        }
    }

    return (
        <div className={styles.searchInput}>
            <Input
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                {...rest}
            />
            <TransparentButton
                className={styles.clearButton}
                disabled={props.value.length <= 0}
                onClick={handleClear}
            >
                <FontAwesomeIcon icon={faTimes} className={styles.plus} />
            </TransparentButton>
            <TransparentButton
                className={styles.searchButton}
                disabled={userInput.length <= 0}
                onClick={handleSearch}
            >
                <FontAwesomeIcon icon={faSearch} className={styles.plus} />
            </TransparentButton>
        </div>
    )
}

export default SearchInput