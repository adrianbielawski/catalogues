import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './latestCatalogues.module.scss'
import {
  CLEAR_LATEST_CATALOGUES,
  FETCH_LATEST_CATALOGUES,
} from 'store/modules/homepage/latest-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import Loader from 'components/global-components/loader/loader'
import { useEntitiesSelector } from 'store/entities/hooks'

const cx = classNames.bind(styles)

const LatestCatalogues = () => {
  const dispatch = useAppDispatch()

  const catalogues = useEntitiesSelector('catalogues')
  const latestCatalogues = useTypedSelector(
    (state) => state.modules.homepage.latestCatalogues,
  )
  const { cataloguesData, error } = latestCatalogues

  useEffect(() => {
    fetchCatalogues(1)

    return () => {
      dispatch(CLEAR_LATEST_CATALOGUES())
    }
  }, [])

  const fetchCatalogues = useCallback(
    (page?: number) => {
      dispatch(FETCH_LATEST_CATALOGUES(page ?? cataloguesData?.next ?? 1))
    },
    [cataloguesData?.next],
  )

  const cataloguesComponents = useMemo(
    () =>
      cataloguesData?.results.map((id, i) => {
        const catalogueCardClass = cx('catalogueCard', {
          last: i === cataloguesData.results.length - 1,
        })

        return (
          <CatalogueCard
            className={catalogueCardClass}
            catalogue={catalogues[id]!}
            key={id}
          />
        )
      }),
    [cataloguesData?.results, catalogues],
  )

  const hasCataloguesData = !!cataloguesData?.results.length

  if (error?.message) {
    return <p className={styles.noContent}>{error.message}</p>
  }

  if (
    !cataloguesData ||
    (latestCatalogues.isFetchingCatalogues && !hasCataloguesData)
  ) {
    return <Loader className={styles.loader} />
  }

  if (!latestCatalogues.isFetchingCatalogues && !hasCataloguesData) {
    return <p className={styles.noContent}>No content</p>
  }

  return (
    <PaginatedList
      next={cataloguesData.next}
      buttonChild="See more"
      isFetching={latestCatalogues.isFetchingCatalogues}
      fetchOnButtonClick="once"
      intersectingElement={3}
      onLoadMore={fetchCatalogues}
    >
      {cataloguesComponents}
    </PaginatedList>
  )
}

export default LatestCatalogues
