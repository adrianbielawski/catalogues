import React, { ReactNode, useEffect, ComponentType, createContext } from 'react'
import { generatePath, Redirect, Route, RouteComponentProps, RouteProps, useLocation } from 'react-router-dom'
import { useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, catalogueSelectorBySlug, itemSelector } from 'store/selectors'
import { DeserializedCatalogue, DeserializedItem } from './globalTypes'
import { StaticContext, Switch, useHistory } from 'react-router'
import * as H from 'history'

type RenderProps = RouteComponentProps<any, StaticContext, unknown>

interface PrivateRoutePropsWithComponent extends RouteProps {
    component: React.ComponentType<any>,
    render?: never,
}

interface PrivateRoutePropsWithRender extends RouteProps {
    render: (props: RenderProps) => React.ReactNode,
    component?: never,
}

type PrivateRouteProps = PrivateRoutePropsWithComponent | PrivateRoutePropsWithRender

export type DehydratedParams = {
    username?: string,
    slug?: string,
    itemId?: number,
}

export interface HydratedParams {
    username?: string,
    slug?: string,
    catalogue?: DeserializedCatalogue,
    itemId?: number,
    item?: DeserializedItem,
}

interface Match {
    params: HydratedParams;
    isExact: boolean;
    path: string;
    url: string;
}

interface RouteWithContextProps extends RouteProps {
    path: string,
    component: ComponentType<any>,
    canonical?: boolean
}

export interface HydratedRouteComponentProps<
    C extends StaticContext = StaticContext,
    S = H.LocationState
    > {
    history: H.History<S>;
    location: H.Location<S>;
    match: Match;
    staticContext?: C;
}

interface RouterContextInterface {
    match: Match,
}

export const RouterContext = createContext({} as RouterContextInterface)

const useParamHydrator = () => {
    const state = useTypedSelector(state => state)
    const currentUserData = state.modules.currentUser
    const currentUser = state.entities.users.entities[currentUserData.userId!]!

    const hydrate = (params: DehydratedParams): HydratedParams => {
        const hydrated: HydratedParams = params
        if (params.username !== undefined) {
            hydrated.username = currentUser.username
        }
        if (params.slug !== undefined) {
            hydrated.catalogue = catalogueSelectorBySlug(params.slug, currentUser.id)(state)
        }
        if (params.itemId !== undefined) {
            hydrated.item = itemSelector(params.itemId)(state)
        }
        return hydrated
    }

    const dehydrate = (params: HydratedParams): DehydratedParams => {
        const dehydrated: DehydratedParams = params
        if (params.username !== undefined) {
            dehydrated.username = currentUser.username
        }
        if (params.catalogue !== undefined) {
            dehydrated.slug = catalogueSelector(params.catalogue.id)(state)?.slug
        }
        if (params.item !== undefined) {
            dehydrated.itemId = itemSelector(params.item.id)(state)?.id
        }
        return dehydrated
    }

    return {
        hydrate,
        dehydrate,
    }
}

export const useUrlBuilder = () => {
    const { dehydrate } = useParamHydrator()

    return ({ pathname, params }: { pathname: string, params: HydratedParams }) => {
        return generatePath(
            pathname,
            dehydrate(params)
        )
    }
}

const CanonicalUrlWrapper = ({ children, match }: { children: ReactNode, match: Match }) => {
    const history = useHistory()
    const urlBuilder = useUrlBuilder()

    useEffect(() => {
        const canonicalUrl = urlBuilder({
            pathname: match.path,
            params: match.params,
        })

        if (match.url != canonicalUrl) {
            history.replace(canonicalUrl)
        }
    }, [])

    return <>{children}</>
}

export const RouteWithContext = (props: RouteWithContextProps) => {
    const { path, component: Component, canonical } = props
    const { hydrate } = useParamHydrator()

    return <Route path={path} render={(props) => {
        const { match } = props
        match.params = hydrate(match.params)

        let component = (
            <RouterContext.Provider value={{ match }}>
                <Component {...props} />
            </RouterContext.Provider>
        )

        if (canonical) {
            component = (
                <CanonicalUrlWrapper match={match}>
                    {component}
                </CanonicalUrlWrapper>
            )
        }

        return component
    }} />
}

export const PrivateRouteWithContext = (props: RouteWithContextProps) => {
    const { path, component: Component, canonical } = props
    const { hydrate } = useParamHydrator()

    return <PrivateRoute path={path} render={(props) => {
        const { match } = props
        match.params = hydrate(match.params)

        let component = (
            <RouterContext.Provider value={{ match }}>
                <Component {...props} />
            </RouterContext.Provider>
        )

        if (canonical) {
            component = (
                <CanonicalUrlWrapper match={match}>
                    {component}
                </CanonicalUrlWrapper>
            )
        }

        return component
    }} />
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, render, ...rest } = props
    const location = useLocation()
    const isInitialized = useTypedSelector(state => state.modules.authUser.isInitialized)
    const users = useTypedSelector(state => state.entities.users.entities)
    const authUserData = useTypedSelector(state => state.modules.authUser)
    const currentUserData = useTypedSelector(state => state.modules.currentUser)
    const authUser = authUserData.id ? users[authUserData.id] : null
    const currentUser = currentUserData.userId ? users[currentUserData.userId] : null

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    if (!authUserData.id) {
        return (
            <Switch>
                <Redirect
                    exact
                    from="/:username"
                    to={{
                        pathname: `/${currentUser?.username || ''}/catalogues`,
                        state: {
                            referrer: {
                                pathname: location.pathname
                            }
                        }
                    }}
                />
                <Redirect to={{
                    pathname: `/`,
                    state: {
                        referrer: {
                            pathname: location.pathname
                        }
                    }
                }} />
            </Switch>
        )
    }

    if (authUserData.id !== currentUser?.id) {
        return (
            <Switch>
                <Redirect
                    exact
                    from="/:username"
                    to={{
                        pathname: `/${currentUser?.username || ''}/catalogues`,
                        state: {
                            referrer: {
                                pathname: location.pathname
                            }
                        }
                    }}
                />
                <Redirect to={{
                    pathname: `/${authUser?.username || currentUser?.username || ''}`,
                    state: {
                        referrer: {
                            pathname: location.pathname
                        }
                    }
                }} />
            </Switch>
        )
    }

    if (Component !== undefined) {
        return (
            <Route {...rest} render={props => <Component {...props} />} />
        )
    }

    return (
        <Route {...rest} render={render} />
    )
}