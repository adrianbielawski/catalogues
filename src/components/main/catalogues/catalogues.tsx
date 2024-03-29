import { useCallback, useEffect, useMemo } from 'react'
import { upperFirst } from 'lodash'
import styles from './catalogues.module.scss'
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
import {
  FETCH_CURRENT_USER_CATALOGUES,
  CLEAR_CURRENT_USER_CATALOGUES_DATA,
} from 'store/modules/current-user-catalogues/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { useFirstRender } from 'src/hooks/useFirstRender'
import { filtersBarInitialState } from './catalogue/filter-bar-utils/contextInitialValues'
import Loader from 'components/global-components/loader/loader'
import Header from 'components/global-components/header/header'
import { useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom'
import usePathMatcher from 'src/hooks/usePathMatcher'
import { useEntitiesSelector } from 'store/entities/hooks'
import useMinContentHeight from 'src/hooks/useMinContentHeight'
import useRefCallback from 'src/hooks/useRefCallback'

const Catalogues = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const users = useEntitiesSelector('users')
  const authUserData = useTypedSelector((state) => state.modules.authUser)
  const currentUserData = useTypedSelector((state) => state.modules.currentUser)
  const authUser = authUserData.id ? users[authUserData.id] : null
  const currentUser = currentUserData.userId
    ? users[currentUserData.userId]
    : null
  const currentUserCatalogues = useTypedSelector(
    (state) => state.modules.currentUserCatalogues,
  )
  const catalogues = useEntitiesSelector('catalogues')

  const [rect, ref] = useRefCallback<HTMLDivElement>()
  const minHeight = useMinContentHeight(rect)

  const firstRender = useFirstRender()
  const cataloguesPathMatch = usePathMatcher('/:username/catalogues')

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(FETCH_CURRENT_USER_CATALOGUES())
    }
  }, [currentUser])

  useEffect(() => {
    return () => {
      dispatch(CLEAR_CURRENT_USER_CATALOGUES_DATA())
    }
  }, [])

  const handleRedirectToSettings = useCallback(() => {
    navigate(`/${currentUser!.username}/settings/account/manage-catalogues`)
  }, [currentUser?.username])

  const getNoCatalogueMessage = useMemo(() => {
    if (authUser?.username !== currentUser?.username) {
      return (
        <p className={styles.noPublicCatalogues}>
          {`${upperFirst(currentUser?.username)} has no public catalogues`}
        </p>
      )
    }

    return (
      <div className={styles.noCatalogues}>
        <p>You have no catalogues yet,</p>
        <p className={styles.anchor} onClick={handleRedirectToSettings}>
          click here to create your first catalogue
        </p>
      </div>
    )
  }, [authUser?.username, currentUser?.username])

  if (currentUserCatalogues.isFetchingCatalogues || firstRender) {
    return <Loader className={styles.loader} />
  }

  const catalogueSlug = currentUserCatalogues.defaultCatalogueId
    ? catalogues[currentUserCatalogues.defaultCatalogueId]?.slug
    : catalogues[currentUserCatalogues.cataloguesData[0]?.id]?.slug

  if (cataloguesPathMatch) {
    return (
      <Navigate
        to={`/${currentUser!.username}/catalogues/${catalogueSlug ?? ''}`}
        state={location.state}
      />
    )
  }

  return (
    <FiltersBarBulkContextProvider values={filtersBarInitialState}>
      <div
        className={styles.catalogues}
        style={{ minHeight: `${minHeight}px` }}
        ref={ref}
      >
        <Header />
        {currentUserCatalogues.cataloguesData.length === 0 || !catalogueSlug ? (
          getNoCatalogueMessage
        ) : (
          <Outlet />
        )}
      </div>
    </FiltersBarBulkContextProvider>
  )
}

export default Catalogues
