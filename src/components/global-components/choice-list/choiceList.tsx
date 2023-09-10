import { useEffect, useState } from 'react'
import { orderBy, size, upperFirst } from 'lodash'
import classNames from 'classnames/bind'
import styles from './choiceList.module.scss'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SearchBar from '../search-bar/searchBar'

export interface Choice {
  id: number | string
  value: string
}

type Sort = 'asc' | 'desc'

type Id = number | string

export type SingleChoiceOnChange = Id | null
export type MultipleChoiceOnChange = Id[] | null

interface SingleChoiceProps<T> {
  choices: T[]
  selected: Id | null
  defaultSortDir?: Sort
  defaultSearchValue?: string
  multiple?: never
  className?: string
  onChange: (choiceId: Id | null) => void
}

interface MultipleChoiceProps<T> {
  choices: T[]
  selected: Id[]
  defaultSortDir?: Sort
  defaultSearchValue?: string
  multiple: true
  className?: string
  onChange: (choicesIds: Id[] | null) => void
}

type Props<T> = SingleChoiceProps<T> | MultipleChoiceProps<T>

const cx = classNames.bind(styles)

const ChoiceList = <T extends Choice>({
  choices,
  selected,
  defaultSortDir,
  defaultSearchValue,
  multiple,
  className,
  onChange,
}: Props<T>) => {
  const [allChoicesSelected, setAllChoicesSelected] = useState(false)
  const [sortDir, setSortDir] = useState<Sort | undefined>(defaultSortDir)
  const [searchValue, setSearchValue] = useState(defaultSearchValue ?? '')
  const showSearchBar = !!(
    defaultSearchValue !== undefined || defaultSortDir !== undefined
  )

  const handleSort = () => {
    let sort: Sort = 'asc'

    if (sortDir === 'asc') {
      sort = 'desc'
    } else {
      sort = 'asc'
    }
    setSortDir(sort)
  }

  const handleSearch = (input: string) => {
    setSearchValue(input)
  }

  const filteredChoices = showSearchBar
    ? choices.filter((choice) =>
        choice.value.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : undefined

  const sortedChoices = orderBy(
    filteredChoices,
    (c) => c.value.toLowerCase(),
    sortDir,
  )

  const visibleChoices = sortedChoices.length > 0 ? sortedChoices : choices

  useEffect(() => {
    if (multiple && size(selected) === visibleChoices.length) {
      setAllChoicesSelected(true)
      return
    }
    setAllChoicesSelected(false)
  }, [selected])

  const handleSelectAllChange = () => {
    if (multiple) {
      if (allChoicesSelected) {
        onChange(null)
      } else {
        onChange(visibleChoices.map((c) => c.id))
      }
    }
  }

  const choiceComponents = visibleChoices.map((choice) => {
    const handleChange = (choiceId: Id, isSelected: boolean) => {
      if (multiple) {
        let selectedIds = [...selected]
        if (isSelected) {
          selectedIds.push(choiceId)
        } else {
          selectedIds = selectedIds.filter((id) => id !== choiceId)
        }

        onChange(selectedIds.length > 0 ? selectedIds : null)
      } else {
        onChange(isSelected ? choiceId : null)
      }
    }

    const isSelected = multiple
      ? selected?.includes(choice.id)
      : selected === choice.id

    return (
      <li key={choice.id}>
        <CheckBoxWithTitle
          id={choice.id}
          title={upperFirst(choice.value)}
          selected={isSelected}
          onChange={handleChange}
        />
      </li>
    )
  })

  const choiceListClass = cx('choiceList', className)

  return (
    <div className={choiceListClass}>
      {showSearchBar && (
        <SearchBar
          sortDir={sortDir!}
          defaultSearchValue={searchValue}
          onSort={handleSort}
          onSearch={handleSearch}
        />
      )}
      {multiple && (
        <CheckBoxWithTitle
          id={'selectAll'}
          title={'Select all'}
          selected={allChoicesSelected}
          className={styles.selectAll}
          onChange={handleSelectAllChange}
        />
      )}
      <ul>{choiceComponents}</ul>
    </div>
  )
}

export default ChoiceList
