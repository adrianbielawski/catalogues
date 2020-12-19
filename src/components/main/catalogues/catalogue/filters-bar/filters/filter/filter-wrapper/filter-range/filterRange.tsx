import React, { useRef, useEffect, useContext } from 'react'
import styles from './filterRange.scss'
//Types
import { CHANGE_FILTER, FilterWithoutChoices } from '../../../filtersTypes'
//Context
import { FiltersContext } from '../../../filtersStore'
//Custom components
import Input from 'components/global-components/input/input'

type Props = {
    filter: FilterWithoutChoices,
    active: boolean,
}

type Range = {
    from: string | null,
    to: string | null,
}

const FilterRange = (props: Props) => {
    const { dispatch, ...state } = useContext(FiltersContext)
    const fromRef = useRef<HTMLInputElement>(null)
    const toRef = useRef<HTMLInputElement>(null)

    const value = state.selectedFilters![props.filter.id] || null

    useEffect(() => {
        if (!props.active) {
            fromRef.current!.value = ''
            toRef.current!.value = ''
        }
    }, [props.active])

    const handleChange = () => {
        let from = fromRef.current!.value || null
        let to = toRef.current!.value || null
        let value: Range | null = { from, to }

        if (from === null && to === null) {
            value = null
        }

        dispatch({
            type: CHANGE_FILTER,
            filterId: props.filter.id,
            value,
        })
    }

    return (
        <div className={styles.filterRange}>
            <div className={styles.wrapper}>
                <span>From:</span>
                <Input
                    value={value?.from || ''}
                    type={props.filter.type}
                    className={styles.input}
                    min={props.filter.minVal}
                    max={value !== null ? value.to || props.filter.maxVal : ''}
                    onChange={handleChange}
                    ref={fromRef}
                />
            </div>
            <div className={styles.wrapper}>
                <span className={styles.to}>To:</span>
                <Input
                    value={value?.to || ''}
                    type={props.filter.type}
                    className={styles.input}
                    min={value !== null ? value.from || props.filter.minVal : ''}
                    max={props.filter.maxVal}
                    onChange={handleChange}
                    ref={toRef}
                />
            </div>
        </div>
    )
}

export default FilterRange