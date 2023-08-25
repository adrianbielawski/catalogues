import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './filters.module.scss'
import { FiltersContext } from './filtersStore'
import Filter from './filter/filter'

interface Props {
  className?: string
}

const cx = classNames.bind(styles)

const Filters = (props: Props) => {
  const state = useContext(FiltersContext)

  const filters = state.filters.map((filter) => (
    <Filter filter={filter} key={filter.id} />
  ))

  const filtersClass = cx('filters', props.className)

  return (
    <div className={filtersClass}>
      <p className={styles.title}>Filters</p>
      <ul>{filters}</ul>
    </div>
  )
}

export default Filters
