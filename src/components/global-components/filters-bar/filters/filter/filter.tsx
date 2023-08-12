import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './filter.module.scss'
// Context
import { FiltersContext } from '../filtersStore'
// Types
import { type FilterType } from '../filtersTypes'
// Maps
import { filterComponentMap } from '../filtersMaps'
// Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import ContentWrapper from '../../content-wrapper/contentWrapper'

interface Props {
  filter: FilterType
  className?: string
}

const cx = classNames.bind(styles)

const Filter = (props: Props) => {
  const { activeFilters, changeActiveFilters } = useContext(FiltersContext)
  const isActive = activeFilters[props.filter.id]

  const handleChange = () => {
    changeActiveFilters(props.filter.id, !isActive)
  }

  const filterClass = cx('filter', props.className)

  const FilterComponent = filterComponentMap[props.filter.type]

  return (
    <li className={filterClass}>
      <CheckBoxWithTitle
        id={props.filter.id}
        title={`By ${props.filter.title.toLowerCase()}`}
        selected={isActive}
        onChange={handleChange}
      />
      <ContentWrapper active={isActive}>
        <FilterComponent filter={props.filter} active={isActive} />
      </ContentWrapper>
    </li>
  )
}

export default Filter
