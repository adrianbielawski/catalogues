import { useMemo } from 'react'
import { matchRoutes, useLocation, useParams } from 'react-router-dom'
import { LocationParams } from 'src/globalTypes'
import routeConfig, { RouteConfig } from 'src/routeConfig'

interface PartData {
  path: string
  title?: string
}

interface GetTitleData {
  config: RouteConfig
  params: LocationParams
  parentConfig?: RouteConfig
}

const getTitle = ({ config, parentConfig, params }: GetTitleData) => {
  let title =
    typeof config.title === 'string' ? config.title : config.title?.(params)

  if (!title && parentConfig && (config.path === '/' || !config.path?.length)) {
    title =
      typeof parentConfig.title === 'string'
        ? parentConfig.title
        : parentConfig.title?.(params)
  }

  return title
}

const getRouteDataFromConfig = (params: LocationParams) => {
  const data: PartData[] = []
  const paths: string[] = []

  const getPath = (config: RouteConfig, parentConfig?: RouteConfig) => {
    paths.push(config.path === '/' && !parentConfig ? '' : config.path!)

    if (config.children?.length) {
      config.children.forEach((childConfig) => {
        getPath(childConfig, config)
      })

      if (!parentConfig) {
        paths.pop()
      }
    }

    const path = paths.filter((path) => !!path.length).join('/')
    const title = getTitle({ config, parentConfig, params })

    data.push({ path, title })

    paths.pop()
  }

  routeConfig.forEach((c) => {
    getPath(c)
  })

  return data.filter((d) => d.path.length)
}

const useCurrentPath = () => {
  const location = useLocation()
  const params = useParams()

  return useMemo(() => {
    const routesData = getRouteDataFromConfig(params)
    const currentRoute = matchRoutes(routesData, location)

    return currentRoute?.[0].route ?? ({} as PartData)
  }, [params, location])
}

export default useCurrentPath
