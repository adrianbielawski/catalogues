import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './navList.scss'
//Types
import { ItemWithChildren } from '../nav'
import { LocationState } from 'src/globalTypes'
//Router
import { RouterContext } from 'src/router'
import { useTypedSelector } from 'store/storeConfig'
//Context
import { NavContext } from '../nav-store/navStore'
//Components
import AnimateHeight from 'react-animate-height'
import NavItem from '../nav-item/navItem'
import ItemIcon from '../item-icon/itemIcon'

interface Props {
    item: ItemWithChildren,
    top: number,
    position?: 'right' | 'left',
}

const cx = classNames.bind(styles)

const NavList = (props: Props) => {
    const history = useHistory<LocationState>()
    const params = useParams()
    const routerContext = useContext(RouterContext)
    const {
        show,
        listId,
        nestedListId,
        closeList,
        showNestedList,
        removeNestedListId,
    } = useContext(NavContext)
    const app = useTypedSelector(state => state.modules.app)
    const [maxHeight, setMaxHeight] = useState(0)

    useEffect(() => {
        const top = app.screenWidth.smallViewport
            ? props.top
            : props.top + 10

        setMaxHeight(app.screenHeight - top)
    }, [props.top, app.screenHeight, app.screenWidth])

    const handleListClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const getItems = () => {
        if (!props.item.children.length) {
            return (
                <p className={styles.noContent}>
                    No content
                </p>
            )
        }

        return props.item.children.map(item => {
            const handleItemClick = (e: React.MouseEvent) => {
                e.stopPropagation()
                if ('onClick' in item && item.onClick) {
                    item.onClick()
                }

                if ('url' in item) {
                    history.push(item.url!, {
                        referrer: {
                            pathname: routerContext.match.path,
                            params,
                        }
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

    const navListClass = cx(
        'navList',
        {
            left: props.position === 'left',
        },
    )

    const height = app.screenWidth.smallViewport
        ? maxHeight
        : 'auto'

    return (
        <AnimateHeight
            className={navListClass}
            height={show ? height : 0}
        >
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
                                <ItemIcon
                                    className={styles.icon}
                                    item={props.item}
                                />
                                <p>{props.item.title}</p>
                            </div>
                        </div>
                        <ul>
                            {getItems()}
                        </ul>
                    </>
                )}
            </div>
        </AnimateHeight>
    )
}

export default NavList