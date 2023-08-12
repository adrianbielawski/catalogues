import { useRef, useEffect, useContext } from 'react'
import styles from './filterRange.module.scss'
// Types
import { FilterWithoutChoices, Range } from '../../filtersTypes'
// Context
import { FiltersContext } from '../../filtersStore'
// Custom components
import Input from 'components/global-components/input/input'

interface Props {
  filter: FilterWithoutChoices
  active: boolean
}

const FilterRange = (props: Props) => {
  const { selectedFilters, changeSelectedFilters } = useContext(FiltersContext)
  const gteRef = useRef<HTMLInputElement>(null)
  const lteRef = useRef<HTMLInputElement>(null)

  const value = (selectedFilters[props.filter.id] as Range | null) ?? null

  useEffect(() => {
    if (!props.active) {
      gteRef.current!.value = ''
      lteRef.current!.value = ''
    }
  }, [props.active])

  const handleChange = () => {
    const gte = gteRef.current!.value || null
    const lte = lteRef.current!.value || null
    let value: Range | null = { gte, lte }

    if (gte === null && lte === null) {
      value = null
    }

    changeSelectedFilters(props.filter.id, value)
  }

  return (
    <div className={styles.filterRange}>
      <div className={styles.wrapper}>
        <span>From:</span>
        <Input
          value={value?.gte ?? ''}
          type={props.filter.type}
          className={styles.input}
          min={props.filter.minVal}
          max={value?.lte ? props.filter.maxVal : ''}
          onChange={handleChange}
          ref={gteRef}
        />
      </div>
      <div className={styles.wrapper}>
        <span className={styles.to}>To:</span>
        <Input
          value={value?.lte ?? ''}
          type={props.filter.type}
          className={styles.input}
          min={value?.gte ? props.filter.minVal : ''}
          max={props.filter.maxVal}
          onChange={handleChange}
          ref={lteRef}
        />
      </div>
    </div>
  )
}

export default FilterRange
