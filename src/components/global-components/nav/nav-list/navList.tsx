import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
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
//Custom components
import NavItem from '../nav-item/navItem'
import ItemIcon from '../item-icon/itemIcon'

interface Props {
    show: boolean,
    item: ItemWithChildren,
    listOnLeft?: boolean,
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
    const app = useTypedSelector(state => state.app)

    const getItems = () => props.item.children.map(item => {
        const handleItemClick = () => {
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

    const navListClass = cx(
        'navList',
        {
            left: props.listOnLeft
        },
    )

    const height = app.screenWidth.smallViewport
        ? app.screenHeight - 44
        : 'auto'

    return (
        <div>
            <AnimateHeight
                className={navListClass}
                height={show ? height : 0}
            >
                {listId ? (
                    <div>
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
                            {props.item.children.length
                                ? getItems()
                                : (
                                    <p className={styles.noContent}>
                                        No content
                                    </p>
                                )
                            }
                        </ul>
                    </div>
                ) : (
                    <div></div>
                )}
            </AnimateHeight>
        </div>
    )
}

export default NavList