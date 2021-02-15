import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
//Redux
import { useTypedSelector } from 'store/reducers/index'

interface Props extends RouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute = (props: Props) => {
    const { component: Component, ...rest } = props
    const isInitialized = useTypedSelector(state => state.auth.isInitialized)
    const user = useTypedSelector(state => state.auth.user)
    if (!isInitialized) {
        return <div>Loading...</div>
    }

    return (
        <Route {...rest} render={props => (
            user ? <Component {...props} /> : <Redirect to={{
                pathname: '/',
                state: { referrer: props.location }
            }} />
        )} />
    )
}

export default PrivateRoute