import { useState } from 'react'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './userDashboard.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import { scrollTop } from 'src/utils'
import Header from 'components/global-components/header/header'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import Columns from 'components/global-components/columns/columns'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import RecommendedCatalogues from './recommended-catalogues/recommendedCatalogues'
import LatestFromFavourites from './latest-from-favourites/latestFromFavourites'
import TopItems from './top-items/topItems'
import useMinContentHeight from 'src/hooks/useMinContentHeight'
import useRefCallback from 'src/hooks/useRefCallback'

const UserDashboard = () => {
  const app = useTypedSelector((state) => state.modules.app)

  const [rect, ref] = useRefCallback<HTMLDivElement>()
  const minHeight = useMinContentHeight(rect)

  const [currentColumn, setCurrentColumn] = useState(0)

  const handleColumnChange = (column: number) => {
    scrollTop()
    setCurrentColumn(column)
  }

  const showPrevColumn = () => {
    handleColumnChange(currentColumn - 1)
  }

  const showNextColumn = () => {
    handleColumnChange(currentColumn + 1)
  }

  const COLUMNS = [
    {
      title: 'Recommended catalogues',
      component: <RecommendedCatalogues />,
    },
    {
      title: 'Latest from favourites',
      component: <LatestFromFavourites />,
    },
    {
      title: 'Highest rated',
      component: <TopItems />,
    },
  ]

  return (
    <div
      className={styles.userDashboard}
      style={{ minHeight: `${minHeight}px` }}
      ref={ref}
    >
      <Header />
      <ComponentHeader className={styles.userDashboardHeader}>
        {!app.screenWidth.largeViewport && (
          <TransparentButton
            className={styles.arrowButton}
            disabled={currentColumn === 0}
            onClick={showPrevColumn}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </TransparentButton>
        )}
        <p className={styles.title}>
          {app.screenWidth.largeViewport
            ? 'My dashboard'
            : COLUMNS[currentColumn].title}
        </p>
        {!app.screenWidth.largeViewport && (
          <TransparentButton
            className={styles.arrowButton}
            disabled={currentColumn === COLUMNS.length - 1}
            onClick={showNextColumn}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </TransparentButton>
        )}
      </ComponentHeader>
      <Columns
        className={styles.columns}
        columnClassName={styles.column}
        columns={COLUMNS}
        current={currentColumn}
        mobileView={!app.screenWidth.largeViewport}
        onChange={handleColumnChange}
      />
    </div>
  )
}

export default UserDashboard
