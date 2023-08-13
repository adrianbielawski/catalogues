import { useContext } from 'react'
import styles from './filterChoices.module.scss'
// Types
import {
  type FilterWithChoices,
  type SelectedChoiceFilterValue,
} from '../../filtersTypes'
// Context
import { FiltersContext } from '../../filtersStore'
// Custom components
import ChoiceList, {
  type MultipleChoiceOnChange,
} from 'components/global-components/choice-list/choiceList'

interface Props {
  active: boolean
  filter: FilterWithChoices
}

const FilterChoices = (props: Props) => {
  const { selectedFilters, changeSelectedFilters } = useContext(FiltersContext)

  const selectedChoices = selectedFilters[
    props.filter.id
  ] as SelectedChoiceFilterValue[]

  const handleChange = (selected: MultipleChoiceOnChange) => {
    changeSelectedFilters(props.filter.id, selected as string[])
  }

  return (
    <div className={styles.wrapper}>
      <ChoiceList
        choices={props.filter.choices}
        defaultSortDir="asc"
        defaultSearchValue=""
        selected={selectedChoices || []}
        multiple={true}
        onChange={handleChange}
      />
    </div>
  )
}

export default FilterChoices
