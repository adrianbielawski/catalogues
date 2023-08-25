import { MouseEvent } from 'react'
import styles from './filtersBar.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import SideBar from 'components/global-components/side-bar/sideBar'
import Search from 'components/global-components/filters-bar/search/search'
import Sort from 'components/global-components/filters-bar/sort/sort'
import Filters from 'components/global-components/filters-bar/filters/filters'

interface Props {
  show: boolean
  toggleShow: (e: MouseEvent) => void
}

const FavouriteItems = (props: Props) => {
  const screenWidth = useTypedSelector((state) => state.modules.app.screenWidth)

  return (
    <SideBar
      active={props.show}
      mobile={screenWidth.smallViewport}
      onBackgroundClick={props.toggleShow}
    >
      <div className={styles.filtersBar}>
        <Search />
        <Sort />
        <Filters />
      </div>
    </SideBar>
  )
}

export default FavouriteItems
