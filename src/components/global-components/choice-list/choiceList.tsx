import { useEffect, useState } from 'react'
import { orderBy, size, upperFirst } from 'lodash'
import classNames from 'classnames/bind'
import styles from './choiceList.module.scss'
// Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SearchBar from '../search-bar/searchBar'

interface BasicChoice {
  id: number | string
  value: string
}

type Sort = 'asc' | 'desc'

type Id = number | string

export type SingleChoiceOnChange = Id | null
export type MultipleChoiceOnChange = Id[] | null

interface SingleChoiceProps<ChoiceType> {
  choices: ChoiceType[]
  selected: Id | null
  defaultSortDir?: Sort
  defaultSearchValue?: string
  multiple?: never
  className?: string
  onChange: (choiceId: Id | null) => void
}

interface MultipleChoiceProps<ChoiceType> {
  choices: ChoiceType[]
  selected: Id[]
  defaultSortDir?: Sort
  defaultSearchValue?: string
  multiple: true
  className?: string
  onChange: (choicesIds: Id[] | null) => void
}

type Props<ChoiceType> =
  | SingleChoiceProps<ChoiceType>
  | MultipleChoiceProps<ChoiceType>

const cx = classNames.bind(styles)

const ChoiceList = <ChoiceType extends BasicChoice>(
  props: Props<ChoiceType>,
) => {
  const [allChoicesSelected, setAllChoicesSelected] = useState(false)
  const [sortDir, setSortDir] = useState<Sort | undefined>(props.defaultSortDir)
  const [searchValue, setSearchValue] = useState(props.defaultSearchValue)
  const showSearchBar = !!(
    props.defaultSearchValue !== undefined || props.defaultSortDir !== undefined
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
    ? props.choices.filter((choice) =>
        choice.value.toLowerCase().includes(searchValue!.toLowerCase()),
      )
    : undefined

  const sortedChoices = orderBy(
    filteredChoices,
    (c) => c.value.toLowerCase(),
    sortDir,
  )

  const visibleChoices =
    sortedChoices.length > 0 ? sortedChoices : props.choices

  useEffect(() => {
    if (props.multiple && size(props.selected) === visibleChoices.length) {
      setAllChoicesSelected(true)
      return
    }
    setAllChoicesSelected(false)
  }, [props.selected])

  const handleSelectAllChange = () => {
    if (props.multiple) {
      if (allChoicesSelected) {
        props.onChange(null)
      } else {
        props.onChange(visibleChoices.map((c) => c.id))
      }
    }
  }

  const choices = visibleChoices.map((choice) => {
    const handleChange = (choiceId: Id, isSelected: boolean) => {
      if (props.multiple) {
        let selectedIds = [...props.selected]
        if (isSelected) {
          selectedIds.push(choiceId)
        } else {
          selectedIds = selectedIds.filter((id) => id !== choiceId)
        }

        props.onChange(selectedIds.length > 0 ? selectedIds : null)
      } else {
        props.onChange(isSelected ? choiceId : null)
      }
    }

    const isSelected = props.multiple
      ? props.selected?.includes(choice.id)
      : props.selected === choice.id

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

  const choiceListClass = cx('choiceList', props.className)

  return (
    <div className={choiceListClass}>
      {showSearchBar && (
        <SearchBar
          sortDir={sortDir!}
          defaultSearchValue={searchValue!}
          onSort={handleSort}
          onSearch={handleSearch}
        />
      )}
      {props.multiple && (
        <CheckBoxWithTitle
          id={'selectAll'}
          title={'Select all'}
          selected={allChoicesSelected}
          className={styles.selectAll}
          onChange={handleSelectAllChange}
        />
      )}
      <ul>{choices}</ul>
    </div>
  )
}

export default ChoiceList
