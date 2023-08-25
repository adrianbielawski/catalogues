import {
  Navigate,
  IndexRouteObject,
  NonIndexRouteObject,
} from 'react-router-dom'
import App from './App'
import Homepage from 'components/homepage/homepage'
import Auth from 'components/auth/auth'
import Login from 'components/auth/login/login'
import Signup from 'components/auth/signup/signup'
import VerifyEmail from 'components/auth/verify-email/verifyEmail'
import Catalogues from 'components/main/catalogues/catalogues'
import Main from 'components/main/main'
import UserDashboard from 'components/main/user-dashboard/userDashboard'
import Settings from 'components/main/settings/settings'
import Catalogue from 'components/main/catalogues/catalogue/catalogue'
import SingleItem from 'components/single-item/singleItem'
import ProtectedRoute from './ProtectedRoute'
import AccountSettings from 'components/main/settings/account-settings/accountSettings'
import ManageCatalogues from 'components/main/settings/account-settings/manage-catalogues/manageCatalogues'
import MyAccount from 'components/main/settings/account-settings/my-account/myAccount'
import FavouriteItems from 'components/main/favourite-items/favouriteItems'
import { LocationParams } from './globalTypes'

interface ExtraRouteConfig {
  title?: string | ((params: LocationParams) => string)
}
interface IndexRouteConfig extends IndexRouteObject, ExtraRouteConfig {
  children?: undefined
}
interface NonIndexRouteConfig extends NonIndexRouteObject, ExtraRouteConfig {
  children?: RouteConfig[]
}

export type RouteConfig = NonIndexRouteConfig | IndexRouteConfig

const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <p>An error has occurred</p>,
    title: 'APP',
    children: [
      {
        path: '/',
        element: <Navigate to="discover" />,
      },
      {
        path: 'discover',
        element: <Homepage />,
        title: 'Discover',
      },
      {
        path: 'auth',
        element: <Auth />,
        title: 'AUTH',
        children: [
          {
            path: 'login',
            element: <Login />,
            title: 'Login',
          },
          {
            path: 'signup',
            element: <Signup />,
            title: 'Signup',
          },
          {
            path: 'signup/verify/:key',
            element: <VerifyEmail />,
          },
        ],
      },
      {
        path: ':username',
        element: <Main />,
        title: ({ username }) => `${username ?? ''}'s Homepage`,
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'catalogues',
            element: <Catalogues />,
            title: 'CATALOGUES',
            children: [
              {
                path: ':catalogueSlug',
                element: <Catalogue />,
                title: ({ catalogueSlug }) => catalogueSlug ?? '',
              },
            ],
          },
          {
            path: 'settings',
            element: (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            ),
            children: [
              {
                path: 'account',
                element: <AccountSettings />,
                children: [
                  {
                    path: '',
                    element: <Navigate to="manage-catalogues" />,
                    title: 'Account Settings',
                  },
                  {
                    path: 'manage-catalogues',
                    element: <ManageCatalogues />,
                    title: 'Catalogues Settings',
                  },
                  {
                    path: 'my-account',
                    element: <MyAccount />,
                    title: 'Account Settings',
                  },
                ],
              },
            ],
          },
          {
            path: 'favourite-items',
            element: (
              <ProtectedRoute>
                <FavouriteItems />
              </ProtectedRoute>
            ),
            title: 'Favourite Items',
          },
        ],
      },
      {
        path: 'item/:itemId',
        element: <SingleItem />,
        title: ({ itemId }) => ['Item', itemId].join(' '),
      },
    ],
  },
]

export default routeConfig
