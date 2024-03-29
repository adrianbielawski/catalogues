import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './recommendedCatalogues.module.scss'
import {
  CLEAR_RECOMMENDED_CATALOGUES,
  FETCH_RECOMMENDED_CATALOGUES,
} from 'store/modules/auth-user-dashboard/recommended-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import CatalogueCard from 'components/global-components/catalogue-card/catalogueCard'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import Loader from 'components/global-components/loader/loader'
import { useEntitiesSelector } from 'store/entities/hooks'

const cx = classNames.bind(styles)

const RecommendedCatalogues = () => {
  const dispatch = useAppDispatch()

  const { authUser } = useTypedSelector((state) => state.modules)
  const catalogues = useEntitiesSelector('catalogues')
  const { cataloguesData, isFetchingCatalogues, error } = useTypedSelector(
    (state) => state.modules.authUserDashboard.recommendedCatalogues,
  )

  const fetchRecommended = useCallback(
    (page?: number) => {
      dispatch(
        FETCH_RECOMMENDED_CATALOGUES({
          page: page ?? cataloguesData?.next ?? 1,
          salt: cataloguesData?.salt ?? undefined,
        }),
      )
    },
    [cataloguesData?.next, cataloguesData?.salt],
  )

  useEffect(() => {
    fetchRecommended(1)

    return () => {
      dispatch(CLEAR_RECOMMENDED_CATALOGUES())
    }
  }, [authUser.id])

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
    [cataloguesData, catalogues],
  )

  const hasCataloguesData = !!cataloguesData?.results.length

  if (error?.message) {
    return <p className={styles.noContent}>{error.message}</p>
  }

  if (!cataloguesData || (isFetchingCatalogues && !hasCataloguesData)) {
    return <Loader className={styles.loader} />
  }

  if (!isFetchingCatalogues && !hasCataloguesData) {
    return <p className={styles.noContent}>No content</p>
  }

  return (
    <PaginatedList
      next={cataloguesData.next}
      buttonChild="See more"
      isFetching={isFetchingCatalogues}
      fetchOnButtonClick="once"
      intersectingElement={3}
      onLoadMore={fetchRecommended}
    >
      {cataloguesComponents}
    </PaginatedList>
  )
}

export default RecommendedCatalogues
