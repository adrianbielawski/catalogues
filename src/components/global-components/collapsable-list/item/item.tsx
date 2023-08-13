import { useContext } from 'react'
import * as React from 'react'
import classNames from 'classnames/bind'
import styles from './item.module.scss'
// Contexts
import { ListContext } from '../listStore'

interface Props {
  item: Record<string, any>
  itemProps?: Record<string, any>
  itemComponent: React.ComponentType<any>
}

const cx = classNames.bind(styles)

const Item = (props: Props) => {
  const { dispatch, ...state } = useContext(ListContext)
  const Component = props.itemComponent

  const itemClass = cx('item', {
    clipText: !state.showAllItems && state.showButton,
  })

  return (
    <li className={itemClass}>
      <Component item={props.item} itemProps={props.itemProps} />
    </li>
  )
}

export default Item
