import React, { useEffect, useState } from 'react'
import { orderBy, size, upperFirst } from 'lodash'
import styles from './multipleChoiceList.scss'
//Custom components
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'
import SearchBar from '../search-bar/searchBar'

interface BasicChoice {
    id: number | string,
    value: string,
}
type Sort = 'asc' | 'desc'

type Props<ChoiceType> = {
    choices: ChoiceType[],
    selected: (number | string)[],
    defaultSortDir: Sort,
    defaultSearchValue: string,
    className?: string,
    onChange: (choices: ChoiceType[]) => void,
}

const MultipleChoiceList = <ChoiceType extends BasicChoice>(props: Props<ChoiceType>) => {
    const [allChoicesSelected, setAllChoicesSelected] = useState(false)
    const [sortDir, setSortDir] = useState<Sort>(props.defaultSortDir)
    const [searchValue, setSearchValue] = useState(props.defaultSearchValue)

    const handleSort = () => {
        let sort: Sort = 'asc'

        if (sortDir === 'asc') {
            sort = 'desc'
        } else {
            sort = 'asc'
        }
        setSortDir(sort)
    }

    const handleSearch = (input: string) => {
        setSearchValue(input)
    }

    const filteredChoices = props.choices.filter(choice =>
        choice.value.toLowerCase().includes(searchValue.toLowerCase())
    )

    const sortedChoices = orderBy(
        filteredChoices,
        (c) => c.value.toLowerCase(),
        sortDir
    )

    useEffect(() => {
        if (size(props.selected) === sortedChoices.length) {
            setAllChoicesSelected(true)
            return
        }
        setAllChoicesSelected(false)
    }, [props.selected])

    const handleSelectAllChange = () => {
        if (allChoicesSelected) {
            props.onChange([])
        } else {
            props.onChange(sortedChoices)
        }
    }
    
    const choices = filteredChoices.map(choice => {
        if (choice.id === null) {
            return
        }

        const handleChange = (choiceId: number | string, isSelected: boolean) => {
            let selectedIds = [...props.selected]
            if (isSelected) {
                selectedIds.push(choiceId)
            } else {
                selectedIds = selectedIds.filter(id => id !== choiceId)
            }

            const selectedChoices = props.choices.filter(obj => {
                if (selectedIds?.includes(obj.id)) {
                    return obj
                }
            })

            props.onChange(selectedChoices)
        }

        const isSelected = props.selected?.includes(choice.id)

        return (
            <li key={choice.id}>
                <CheckBoxWithTitle
                    id={choice.id}
                    title={upperFirst(choice.value)}
                    selected={isSelected}
                    onChange={handleChange}
                />
            </li>
        )
    })

    return (
        <div className={styles.multipleChoiceList}>
            <SearchBar
                sortDir={sortDir}
                defaultSearchValue={searchValue}
                onSort={handleSort}
                onSearch={handleSearch}
            />
            <CheckBoxWithTitle
                id={'selectAll'}
                title={'Select all'}
                selected={allChoicesSelected}
                className={styles.selectAll}
                onChange={handleSelectAllChange}
            />
            <ul className={props.className}>
                {choices}
            </ul>
        </div>
    )
}

export default MultipleChoiceList