import React from 'react'
import { ComponentType, createContext } from 'react'
import { generatePath, Route, RouteProps } from 'react-router-dom'
import { useTypedSelector } from 'store/reducers'
import { catalogueSelector, catalogueSelectorBySlug } from 'store/selectors'
import { DeserializedCatalogue } from './globalTypes'
import { StaticContext } from 'react-router'
import * as H from 'history'

export type DehydratedParams = {
    userId?: number,
    slug?: string,
}

export interface HydratedParams {
    userId?: number,
    slug?: string,
    catalogue?: DeserializedCatalogue,
}

interface Match {
    params: HydratedParams;
    isExact: boolean;
    path: string;
    url: string;
}

interface RouteWithContextProps extends RouteProps {
    path: string,
    component: ComponentType<any>
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

    const hydrate = (params: DehydratedParams): HydratedParams => {
        const hydrated: HydratedParams = {}
        if (params.userId !== undefined) {
            hydrated.userId = state.auth.user?.id
        }
        if (params.slug !== undefined) {
            hydrated.catalogue = catalogueSelectorBySlug(params.slug)(state)
        }
        return hydrated
    }

    const dehydrate = (params: HydratedParams): DehydratedParams => {
        const dehydrated: DehydratedParams = {}
        if (params.userId !== undefined) {
            dehydrated.userId = state.auth.user?.id
        }
        if (params.catalogue !== undefined) {
            dehydrated.slug = catalogueSelector(params.catalogue.id)(state)?.slug
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

    return ({ path, params }: { path: string, params: HydratedParams }) => {
        return generatePath(
            path,
            dehydrate(params)
        )
    }
}

export const RouteWithContext = (props: RouteWithContextProps) => {
    const { path, component: Component } = props
    const { hydrate } = useParamHydrator()

    return <Route path={path} render={(props) => {
        const { match } = props;
        match.params = hydrate(match.params)

        return (
            <RouterContext.Provider value={{ match }}>
                <Component {...props} />
            </RouterContext.Provider>
        )
    }} />
}