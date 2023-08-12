import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './sort.module.scss'
// Contexts
import { SortContext } from './sortStore'
// Custom components
import SortOption from './sort-option/sortOption'

interface Props {
  className?: string
}

const cx = classNames.bind(styles)

const Sort = (props: Props) => {
  const { sortOptions } = useContext(SortContext)

  const optionsComponents = sortOptions.map((option) => (
    <SortOption option={option} key={option.id} />
  ))

  const sortClass = cx('sort', props.className)

  return (
    <div className={sortClass}>
      <p className={styles.title}>Sort</p>
      <ul>{optionsComponents}</ul>
    </div>
  )
}

export default Sort
