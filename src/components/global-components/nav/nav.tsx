import { useCallback, useContext, useEffect, useRef, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './nav.module.scss'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useUrlBuilder } from 'src/hooks/useUrlBuilder'
import { NavContext } from './nav-store/navStore'
import NavItem from './nav-item/navItem'
import NavList from './nav-list/navList'
import useCurrentPath from 'src/hooks/useCurrentPath'

export interface CommonItem {
  id: string | number
  title: string
}

export type ItemWithOnClickAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  onClick?: () => void
}

export type ItemWithOnClickAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  onClick?: () => void
}

type ItemWithOnClick = ItemWithOnClickAndIcon | ItemWithOnClickAndFaIcon

export type ItemWithUrlAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  url: string
  children?: never
  onClick?: never
}

export type ItemWithUrlAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  url: string
  children?: never
  onClick?: never
}

export type ItemWithUrl = ItemWithUrlAndIcon | ItemWithUrlAndFaIcon

export type ItemWithChildrenAndIcon = CommonItem & {
  icon: ReactNode
  faIcon?: never
  url?: never
  children: ItemType[]
}

export type ItemWithChildrenAndFaIcon = CommonItem & {
  icon?: never
  faIcon: IconDefinition
  url?: never
  children: ItemType[]
}

export type ItemWithChildren =
  | ItemWithChildrenAndIcon
  | ItemWithChildrenAndFaIcon

export type ItemType = ItemWithUrl | ItemWithChildren | ItemWithOnClick

interface Props {
  items: ItemType[]
  className?: string
  position?: 'right' | 'left'
}

const cx = classNames.bind(styles)

const Nav = (props: Props) => {
  const navigate = useNavigate()
  const params = useParams()
  const currentPath = useCurrentPath()

  const { show, listId, nestedListId, showList, closeList } =
    useContext(NavContext)

  const navRef = useRef<HTMLElement>(null)

  const buildUrl = useUrlBuilder()

  const handleCloseList = useCallback(
    (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        closeList()
      }
    },
    [closeList],
  )

  useEffect(() => {
    if (show) {
      window.addEventListener('click', handleCloseList, { passive: false })
    }
    return () => {
      window.removeEventListener('click', handleCloseList)
    }
  }, [show, close])

  const getItemById = () => {
    const item = props.items.filter((i) => i.id === listId)[0]

    if (nestedListId) {
      return (item as ItemWithChildren).children.filter(
        (i) => i.id === nestedListId,
      )[0]
    }

    return item
  }

  const items = props.items.map((item) => {
    const handleClick = () => {
      if ('url' in item && item.url !== undefined) {
        navigate(item.url, {
          state: {
            referrer: {
              pathname: buildUrl({
                pathname: currentPath.path,
                params,
              }),
              params,
            },
          },
        })
      } else if (show && listId === item.id) {
        closeList()
      } else {
        showList(item.id)
      }
    }

    return (
      <NavItem
        className={styles.item}
        item={item}
        active={show && listId === item.id}
        onClick={handleClick}
        key={item.id}
      />
    )
  })

  const getTop = () => {
    if (navRef.current == null) {
      return 0
    }
    const navRect = navRef.current.getBoundingClientRect()
    const navPosition = navRect.y
    const navHeight = navRect.height

    return navPosition + navHeight
  }

  const navClass = cx('nav', props.className)

  return (
    <nav className={navClass} ref={navRef}>
      <ul className={styles.items}>{items}</ul>
      <NavList
        item={getItemById() as ItemWithChildren}
        position={props.position}
        top={getTop()}
      />
    </nav>
  )
}

export default Nav
