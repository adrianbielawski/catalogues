import { useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './search.module.scss'
// Custom hooks and utils
import { useDebouncedCallback } from 'src/hooks/useDebouncedCallback'
import { mergeRefs } from 'src/utils'
// Contexts
import { SearchContext } from './searchStore'
// Custom components
import Input from 'components/global-components/input/input'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

const Search = () => {
  const { search, setSearchValue } = useContext(SearchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const inputDebounceRef = useDebouncedCallback((value) => {
    handleChange(value)
  })

  const handleChange = (value: string) => {
    setSearchValue(value)
  }

  const handleClear = () => {
    inputRef.current!.value = ''
    setSearchValue('')
  }

  return (
    <div className={styles.searchInput}>
      <Input
        defaultValue={search}
        placeholder="search catalogue"
        ref={mergeRefs([inputDebounceRef, inputRef])}
      />
      <TransparentButton
        className={styles.clearButton}
        disabled={search.length <= 0}
        onClick={handleClear}
      >
        <FontAwesomeIcon icon={faTimes} className={styles.plus} />
      </TransparentButton>
    </div>
  )
}

export default Search
