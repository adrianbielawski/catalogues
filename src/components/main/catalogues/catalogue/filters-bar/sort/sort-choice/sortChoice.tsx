import React, { useContext } from 'react'
//Context
import { SortContext } from '../sortStore'
//Types
import { CHANGE_SORT, Option } from '../sortTypes'
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
    const { dispatch, ...state } = useContext(SortContext)

    const handleChange = (id: string) => {
        dispatch({
            type: CHANGE_SORT,
            value: { [props.option.id]: id }
        })
    }

    return (
        <div ref={ref}>
            <CheckBoxWithTitle
                title={sortMap[props.option.type][0]}
                id={'0'}
                selected={state.selected?.[props.option.id] === '0'}
                onChange={handleChange}
            />
            <CheckBoxWithTitle
                title={sortMap[props.option.type][1]}
                id={'1'}
                selected={state.selected?.[props.option.id] === '1'}
                onChange={handleChange}
            />
        </div>
    )
}

export default React.forwardRef(SortChoice)