import { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styles from './homepage.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import Header from 'components/global-components/header/header'
import Columns from 'components/global-components/columns/columns'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import LatestCatalogues from './latest-catalogues/latestCatalogues'
import LatestItems from './latest-items/latestItems'
import TopItems from 'components/main/user-dashboard/top-items/topItems'

const COLUMNS = [
  {
    title: 'Latest catalogues',
    component: <LatestCatalogues />,
  },
  {
    title: 'Latest items',
    component: <LatestItems />,
  },
  {
    title: 'Highest rated',
    component: <TopItems />,
  },
]

const Homepage = () => {
  const app = useTypedSelector((state) => state.modules.app)
  const [currentColumn, setCurrentColumn] = useState(0)

  const handleColumnChange = useCallback((column: number) => {
    setCurrentColumn(column)
  }, [])

  const showPrevColumn = useCallback(() => {
    handleColumnChange(currentColumn - 1)
  }, [handleColumnChange, currentColumn])

  const showNextColumn = useCallback(() => {
    handleColumnChange(currentColumn + 1)
  }, [handleColumnChange, currentColumn])

  return (
    <div className={styles.homepage} style={{ minHeight: app.screenHeight }}>
      <Header />
      {!app.screenWidth.largeViewport && (
        <ComponentHeader className={styles.homepageHeader}>
          <TransparentButton
            className={styles.arrowButton}
            disabled={currentColumn === 0}
            onClick={showPrevColumn}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </TransparentButton>
          <p className={styles.title}>{COLUMNS[currentColumn].title}</p>
          <TransparentButton
            className={styles.arrowButton}
            disabled={currentColumn === COLUMNS.length - 1}
            onClick={showNextColumn}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </TransparentButton>
        </ComponentHeader>
      )}
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

export default Homepage
