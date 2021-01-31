import React, { useEffect, useRef, useContext } from 'react'
import styles from './list.scss'
//Contexts
import { ListContext } from '../listStore'

type Item = {}

type Props = {
    items: Item[],
    itemsProps: {},
    itemComponent: React.ComponentType<any>,
    maxHeight: number,
}

const List = (props: Props) => {
    const { dispatch, ...state } = useContext(ListContext)
    const listRef = useRef<HTMLUListElement>(null)

    const getFields = () => {
        const ItemComponent = props.itemComponent
        return props.items.map((item, i) => (
            <li className={styles.item} key={i}>
                <ItemComponent
                    item={item}
                    itemProps={props.itemsProps}
                    isShowingAllItems={state.showAllItems}
                />
            </li>
        ))
    }

    const inspectItemsHeight = () => {
        const items = listRef.current!.children

        let maxH = 0
        let maxHeightCollapsed = props.maxHeight
        let itemsInView = props.items.length
        for (let i = 0; i < items!.length; i++) {
            const itemH = items![i].getBoundingClientRect().height
            let newH = maxH + itemH
            if (itemsInView === props.items.length && newH > props.maxHeight) {
                itemsInView = i
                maxHeightCollapsed = maxH
                maxH = newH
            } else {
                maxH = newH
            }
        }
        dispatch({
            type: 'ITEMS_INSPECTED',
            itemsInView,
            maxHeight: maxH,
            maxHeightCollapsed: maxHeightCollapsed,
        })
    }

    useEffect(() => {
        inspectItemsHeight()
    }, [props.items, state.showAllItems])

    const getDynamicStyles = () => {
        if (state.showAllItems) {
            return { maxHeight: state.maxHeight }
        } else {
            return { maxHeight: state.maxHeightCollapsed }
        }
    }

    return (
        <ul
            className={styles.list}
            style={getDynamicStyles()}
            ref={listRef}
        >
            {getFields()}
        </ul>
    )
}

export default List