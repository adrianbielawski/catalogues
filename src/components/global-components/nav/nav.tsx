import { useCallback, useContext, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './nav.module.scss'
import { useUrlBuilder } from 'src/hooks/useUrlBuilder'
import { NavContext } from './nav-store/navStore'
import NavItem from './nav-item/navItem'
import NavList from './nav-list/navList'
import useCurrentPath from 'src/hooks/useCurrentPath'
import { ItemType, ItemWithChildren } from './types'

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
  }, [show, handleCloseList])

  const itemById = useMemo(() => {
    if (!listId) {
      return
    }

    const item = props.items.filter(
      (i) => i.id === listId,
    )[0] as ItemWithChildren

    if (nestedListId) {
      return item.children.filter(
        (i) => i.id === nestedListId,
      )[0] as ItemWithChildren
    }

    return item
  }, [props.items, listId, nestedListId])

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
      {itemById && (
        <NavList item={itemById} position={props.position} top={getTop()} />
      )}
    </nav>
  )
}

export default Nav
