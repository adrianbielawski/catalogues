import React from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps, useLocation } from 'react-router-dom'
import { StaticContext } from 'react-router'
//Redux
import { useTypedSelector } from 'store/storeConfig'

type RenderProps = RouteComponentProps<any, StaticContext, unknown>

interface PropsWithComponent extends RouteProps {
    component: React.ComponentType<any>,
    render?: never,
}

interface PropsWithRender extends RouteProps {
    render: (props: RenderProps) => React.ReactNode,
    component?: never,
}

type Props = PropsWithComponent | PropsWithRender

const PrivateRoute = (props: Props) => {
    const { component: Component, render, ...rest } = props
    const isInitialized = useTypedSelector(state => state.auth.isInitialized)
    const user = useTypedSelector(state => state.auth.user)
    const currentUser = useTypedSelector(state => state.currentUser)
    const location = useLocation()

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    if (!user) {
        return (
            <Redirect to={{
                pathname: `/`,
                state: {
                    referrer: {
                        pathname: location.pathname
                    }
                }
            }} />
        )
    }

    if (user?.id !== currentUser.user?.id) {
        return (
            <Redirect to={{
                pathname: `/${user.username || currentUser.user?.username || ''}`,
                state: {
                    referrer: {
                        pathname: location.pathname
                    }
                }
            }} />
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

export default PrivateRoute