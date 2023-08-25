import { ReactNode } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useTypedSelector } from 'store/storeConfig'
import usePathMatcher from './hooks/usePathMatcher'
import { useEntitiesSelector } from 'store/entities/hooks'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  const users = useEntitiesSelector('users')

  const { authUser: authUserData, currentUser: currentUserData } =
    useTypedSelector((state) => state.modules)

  const authUser = authUserData.id ? users[authUserData.id] : null
  const currentUser = currentUserData.userId
    ? users[currentUserData.userId]
    : null

  const usernamePathMatch = usePathMatcher('/:username')

  if (!authUserData.isInitialized) {
    return <div>Loading...</div>
  }

  const state = {
    referrer: {
      pathname: location.pathname,
    },
  }

  if (!authUserData.id) {
    if (usernamePathMatch) {
      return (
        <Navigate to={`/${currentUser!.username}/catalogues/`} state={state} />
      )
    }

    return <Navigate to="/" state={state} />
  }

  if (authUserData.id !== currentUser?.id) {
    if (usernamePathMatch) {
      return (
        <Navigate to={`/${currentUser!.username}/catalogues/`} state={state} />
      )
    }

    return (
      <Navigate
        to={`/${authUser?.username ?? currentUser?.username ?? ''}`}
        state={state}
      />
    )
  }

  return (
    <>{children}</> ?? (
      <>
        <Outlet />
      </>
    )
  )
}

export default ProtectedRoute
