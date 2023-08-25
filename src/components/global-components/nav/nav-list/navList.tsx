import { useContext, useEffect, useState, MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './navList.module.scss'
import { type ItemWithChildren } from '../nav'
import { useTypedSelector } from 'store/storeConfig'
import { NavContext } from '../nav-store/navStore'
import AnimateHeight from 'react-animate-height'
import NavItem from '../nav-item/navItem'
import ItemIcon from '../item-icon/itemIcon'
import useCurrentPath from 'src/hooks/useCurrentPath'

interface Props {
  item: ItemWithChildren
  top: number
  position?: 'right' | 'left'
}

const cx = classNames.bind(styles)

const NavList = (props: Props) => {
  const navigate = useNavigate()
  const params = useParams()
  const currentPath = useCurrentPath()

  const {
    show,
    listId,
    nestedListId,
    closeList,
    showNestedList,
    removeNestedListId,
  } = useContext(NavContext)
  const app = useTypedSelector((state) => state.modules.app)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    const top = app.screenWidth.smallViewport ? props.top : props.top + 10

    setMaxHeight(app.screenHeight - top)
  }, [props.top, app.screenHeight, app.screenWidth])

  const handleListClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const getItems = () => {
    if (props.item.children.length === 0) {
      return <p className={styles.noContent}>No content</p>
    }

    return props.item.children.map((item) => {
      const handleItemClick = (e: MouseEvent) => {
        e.stopPropagation()
        if ('onClick' in item && item.onClick != null) {
          item.onClick()
        }

        if ('url' in item) {
          navigate(item.url!, {
            state: {
              referrer: {
                pathname: currentPath,
                params,
              },
              params,
            },
          })
        }

        if ('children' in item) {
          showNestedList(item.id)
          return
        }

        closeList()
      }

      return (
        <NavItem
          className={styles.listItem}
          item={item}
          active={show && listId === item.id}
          showTitle={true}
          key={item.id}
          onClick={handleItemClick}
        />
      )
    })
  }

  const navListClass = cx('navList', {
    left: props.position === 'left',
  })

  const height = app.screenWidth.smallViewport ? maxHeight : 'auto'

  return (
    <AnimateHeight className={navListClass} height={show ? height : 0}>
      <div
        className={styles.listWrapper}
        style={{ maxHeight }}
        onClick={handleListClick}
      >
        {listId && (
          <>
            <div className={styles.listHeader}>
              {nestedListId !== null && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={styles.goBack}
                  onClick={removeNestedListId}
                />
              )}
              <div className={styles.wrapper}>
                <ItemIcon className={styles.icon} item={props.item} />
                <p>{props.item.title}</p>
              </div>
            </div>
            <ul>{getItems()}</ul>
          </>
        )}
      </div>
    </AnimateHeight>
  )
}

export default NavList
