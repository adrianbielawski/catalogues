import { MouseEvent } from 'react'
import classNames from 'classnames/bind'
import styles from './navItem.module.scss'
import ItemIcon from '../item-icon/itemIcon'
import { ItemType } from '../types'

interface Props {
  item: ItemType
  active?: boolean
  className?: string
  showTitle?: boolean
  onClick: (e: MouseEvent) => void
}

const cx = classNames.bind(styles)

const NavItem = (props: Props) => {
  const navItemClass = cx('navItem', props.className)

  return (
    <li className={navItemClass} onClick={props.onClick}>
      <ItemIcon item={props.item} active={props.active} />
      {props.showTitle && <p>{props.item.title}</p>}
    </li>
  )
}

export default NavItem
