import React, { useEffect, useRef, useContext } from 'react'
import styles from './list.scss'
//Contexts
import { ListContext } from '../listStore'
//Components
import Item from '../item/item'

type ItemType = {}

type Props = {
    items: ItemType[],
    itemsProps: {},
    itemComponent: React.ComponentType<any>,
    maxHeight: number,
}

const List = (props: Props) => {
    const { dispatch, ...state } = useContext(ListContext)
    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        inspectItemsHeight()
    }, [props.items])

    useEffect(() => {
        if (state.itemsInspected) {
            inspectOverflow()
        }
    }, [state.itemsInspected])

    const inspectItemsHeight = () => {
        const items = listRef.current!.children

        let totalHeight = 0
        let collapsedHeight = 0
        let itemsInView = 0

        for (let item of Array.from(items)) {
            totalHeight += item.getBoundingClientRect().height

            if (totalHeight <= props.maxHeight) {
                itemsInView++
                collapsedHeight = totalHeight
            }
        }

        dispatch({
            type: 'ITEMS_INSPECTED',
            itemsInView,
            totalHeight,
            collapsedHeight,
        })
    }

    const inspectOverflow = () => {
        const items = listRef.current!.children

        let hasOverflow = false

        for (let item of Array.from(items)) {
            if (item.scrollHeight > item.clientHeight) {
                hasOverflow = true
            }
        }

        dispatch({
            type: 'OVERFLOW_INSPECTED',
            hasOverflow,
        })
    }

    const getItems = () => {
        return props.items.map((item, i) => (
            <Item
                item={item}
                itemProps={props.itemsProps}
                itemComponent={props.itemComponent}
                key={i}
            />
        ))
    }

    const getDynamicStyles = () => {
        if (state.showAllItems) {
            return { maxHeight: state.totalHeight }
        } else {
            return { maxHeight: state.collapsedHeight }
        }
    }

    return (
        <ul
            className={styles.list}
            style={getDynamicStyles()}
            ref={listRef}
        >
            {getItems()}
        </ul>
    )
}

export default List