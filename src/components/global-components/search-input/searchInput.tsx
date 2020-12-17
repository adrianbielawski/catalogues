import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './searchInput.scss'
//Redux
//Custom components
import Input from 'components/global-components/input/input'
import TransparentButton from '../transparent-button/transparentButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch: (input: string[]) => void,
    className?: string,
}

const SearchInput = (props: Props) => {
    const { className, onSearch, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (inputRef.current !== null) {
            const inputArray = inputRef.current.value.split(" ")
            onSearch(inputArray)
        }
    }

    return (
        <div className={styles.searchInput}>
            <Input
                className={className}
                ref={inputRef}
                minLength={1}
                maxLength={50}
                { ...rest }
            />
            <TransparentButton className={styles.searchButton} onClick={handleClick}>
                <FontAwesomeIcon icon={faSearch} className={styles.plus} />
            </TransparentButton>
        </div>
    )
}

export default SearchInput