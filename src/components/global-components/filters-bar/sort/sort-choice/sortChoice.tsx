import { useContext, ForwardRefRenderFunction, forwardRef } from 'react'
import styles from './sortChoice.module.scss'
import { SortContext } from '../sortStore'
import { Option } from '../sortTypes'
import { sortMap } from '../sortMaps'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

interface Props {
  option: Option
}

const SortChoice: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  props,
  ref,
) => {
  const { selected, setSortValue } = useContext(SortContext)

  const handleChange = (id: number | string) => {
    setSortValue({ [props.option.id]: id })
  }

  return (
    <div className={styles.sortChoice} ref={ref}>
      <CheckBoxWithTitle
        title={sortMap[props.option.type][0]}
        id={props.option.id}
        selected={selected?.[props.option.id] === props.option.id}
        onChange={handleChange}
      />
      <CheckBoxWithTitle
        title={sortMap[props.option.type][1]}
        id={`-${props.option.id}`}
        selected={selected?.[props.option.id] === `-${props.option.id}`}
        onChange={handleChange}
      />
    </div>
  )
}

export default forwardRef(SortChoice)
