import React, { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './search.scss'
//Contexts
import { SearchContext } from './searchStore'
//Custom components
import SearchInput from 'components/global-components/search-input/searchInput'

type Props = {
    className?: string,
}

const cx = classNames.bind(styles)

const Search = (props: Props) => {
    const { search, setSearchValue } = useContext(SearchContext)
    
    const handleSearch = (input: string) => {
        setSearchValue(input)
    }

    const handleClear = () => {
        setSearchValue('')
    }

    const searchClass = cx(
        'search',
        props.className,
    )

    return (
        <SearchInput
            className={searchClass}
            value={search}
            placeholder="search catalogue"
            minLength={1}
            maxLength={50}
            onSearch={handleSearch}
            onClear={handleClear}
        />
    )
}

export default Search