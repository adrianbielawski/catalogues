import { ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSortAlphaUp,
  faSortAlphaDown,
} from '@fortawesome/free-solid-svg-icons'
import styles from './searchBar.module.scss'
import Input from 'components/global-components/input/input'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
  sortDir: string
  defaultSearchValue: string
  onSort: () => void
  onSearch: (input: string) => void
}

const SearchBar = (props: Props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSearch(e.target.value)
  }
  return (
    <div className={styles.searchBar}>
      <TransparentButton className={styles.sortButton} onClick={props.onSort}>
        <FontAwesomeIcon
          icon={props.sortDir === 'desc' ? faSortAlphaDown : faSortAlphaUp}
        />
      </TransparentButton>
      <Input
        defaultValue={props.defaultSearchValue}
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchBar
