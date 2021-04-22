import React, { useEffect, useRef, useContext, useState } from 'react'
import { clamp } from 'lodash'
//Contexts
import { ListContext } from '../listStore'
//Components
import Item from '../item/item'
import AnimateHeight from 'react-animate-height'

type ItemType = {}

type Props = {
    items: ItemType[],
    itemsProps: {},
    itemComponent: React.ComponentType<any>,
    maxHeight: number,
}

const ITEM_MARGIN = 5
const ITEM_HEIGHT = 21.34 + ITEM_MARGIN

const List = (props: Props) => {
    const { dispatch, ...state } = useContext(ListContext)
    const listRef = useRef<HTMLUListElement>(null)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        inspectItemsHeight()
    }, [props.items])

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        if (state.overflowInspected) {
            const newDuration = clamp(
                Math.floor((state.totalHeight - state.collapsedHeight) * 3),
                200,
                400
            )

            timeout = setTimeout(() => setDuration(newDuration), newDuration)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [state.overflowInspected, state.totalHeight, state.totalHeight])

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
            totalHeight += item.getBoundingClientRect().height + ITEM_MARGIN

            if (collapsedHeight + ITEM_HEIGHT <= props.maxHeight) {
                itemsInView++
                collapsedHeight += ITEM_HEIGHT
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
    return (
        <AnimateHeight
            height={state.showAllItems ? 'auto' : state.collapsedHeight}
            duration={duration}
        >
            <ul
                style={{ height: state.totalHeight }}
                ref={listRef}
            >
                {getItems()}
            </ul>
        </AnimateHeight>
    )
}

export default List