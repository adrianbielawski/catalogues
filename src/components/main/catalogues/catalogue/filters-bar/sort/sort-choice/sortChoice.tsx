import React, { useContext } from 'react'
import styles from './sortChoice.scss'
//Context
import { SortContext } from '../sortStore'
//Types
import { Option } from '../sortTypes'
//Maps
import { sortMap } from '../sortMaps'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

type Props = {
    option: Option
}

const SortChoice: React.ForwardRefRenderFunction<
    HTMLDivElement,
    Props
> = (props, ref) => {
    const { selected, setSortValue } = useContext(SortContext)

    const handleChange = (id: number | string) => {
        setSortValue({ [props.option.id]: id })
    }

    return (
        <div className={styles.sortChoice} ref={ref}>
            <CheckBoxWithTitle
                title={sortMap[props.option.type][0]}
                id={'0'}
                selected={selected?.[props.option.id] === '0'}
                onChange={handleChange}
            />
            <CheckBoxWithTitle
                title={sortMap[props.option.type][1]}
                id={'1'}
                selected={selected?.[props.option.id] === '1'}
                onChange={handleChange}
            />
        </div>
    )
}

export default React.forwardRef(SortChoice)