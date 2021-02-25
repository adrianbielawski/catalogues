import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import styles from './searchBar.scss'
//Custom components
import Input from 'components/global-components/input/input'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    sortDir: string,
    onSort: () => void,
    onSearch: (input: string) => void,
}

const SearchBar = (props: Props) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(e.target.value)
    }
    return (
        <div className={styles.serchBar}>
            <TransparentButton
                className={styles.sortButton}
                onClick={props.onSort}
            >
                <FontAwesomeIcon
                    icon={props.sortDir === 'desc'
                        ? faSortAlphaDown
                        : faSortAlphaUp
                    }
                />
            </TransparentButton>
            <Input onChange={handleSearch} />
        </div>
    )
}

export default SearchBar