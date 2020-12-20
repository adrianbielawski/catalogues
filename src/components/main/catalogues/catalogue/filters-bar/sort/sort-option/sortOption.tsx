import React, { useContext, useRef } from 'react'
import styles from './sortOption.scss'
//Contexts
import { SortContext } from '../sortStore'
//Types
import { Option } from '../sortTypes'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SortWrapper from '../sort-wrapper/sortWrapper'
import SortChoice from '../sort-choice/sortChoice'

type Props = {
    option: Option,
}

const SortOption = (props: Props) => {
    const { selected, setSortValue } = useContext(SortContext)
    const SortChoiceRef = useRef<HTMLDivElement>(null)
    const sortChoiceH = SortChoiceRef.current?.getBoundingClientRect().height

    const isActive = selected?.[props.option.id] !== undefined

    const handleChange = () => {
        const value = isActive ? undefined : { [props.option.id]: null }
        setSortValue(value)
    }

    return (
        <li className={styles.sortOption}>
            <CheckBoxWithTitle
                id={props.option.id}
                title={`By ${props.option.title}`}
                selected={isActive}
                onChange={handleChange}
            />
            <SortWrapper active={isActive} maxHeight={sortChoiceH} >
                <SortChoice option={props.option} ref={SortChoiceRef} />
            </SortWrapper>
        </li>
    )
}

export default SortOption