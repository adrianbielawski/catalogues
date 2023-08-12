import { useContext, useRef } from 'react'
import styles from './sortOption.module.scss'
// Contexts
import { SortContext } from '../sortStore'
// Types
import { Option } from '../sortTypes'
// Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SortChoice from '../sort-choice/sortChoice'
import ContentWrapper from '../../content-wrapper/contentWrapper'

interface Props {
  option: Option
}

const SortOption = (props: Props) => {
  const { activeOption, setActiveOption } = useContext(SortContext)
  const SortChoiceRef = useRef<HTMLDivElement>(null)

  const isActive = activeOption === props.option.id

  const handleChange = () => {
    const option = isActive ? null : props.option.id
    setActiveOption(option)
  }

  return (
    <li className={styles.sortOption}>
      <CheckBoxWithTitle
        id={props.option.id}
        title={`By ${props.option.title}`}
        selected={isActive}
        onChange={handleChange}
      />
      <ContentWrapper active={isActive}>
        <SortChoice option={props.option} ref={SortChoiceRef} />
      </ContentWrapper>
    </li>
  )
}

export default SortOption
