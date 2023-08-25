/* eslint-disable no-redeclare */
import { useMemo } from 'react'
import { PathMatch, matchPath, useLocation } from 'react-router-dom'

type ReturnValue = PathMatch<string> | null

function usePathMatcher(paths: string, end?: boolean): ReturnValue
function usePathMatcher(paths: string[], end?: boolean): ReturnValue[]
function usePathMatcher(paths: string | string[], end = true) {
  const location = useLocation()

  return useMemo(() => {
    const pathsArray = typeof paths === 'string' ? [paths] : paths

    const match = (path: string) => matchPath({ path, end }, location.pathname)

    if (typeof paths === 'string') {
      return match(paths)
    }

    return pathsArray.map((path) => {
      return match(path)
    })
  }, [paths, end, location.pathname])
}

export default usePathMatcher
