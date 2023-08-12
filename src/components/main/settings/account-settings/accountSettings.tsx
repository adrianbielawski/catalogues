import { Suspense } from 'react'
import { Redirect, useLocation, Switch } from 'react-router-dom'

import styles from './accountSettings.module.scss'
// Types
import { type LocationState } from 'src/globalTypes'
// Router
import { RouteWithContext } from 'src/router'
// Custom components
import Loader from 'components/global-components/loader/loader'
import MyAccount from './my-account/myAccount'
import ManageCatalogues from './manage-catalogues/manageCatalogues'

const AccountSettings = () => {
  const location = useLocation<LocationState>()

  return (
    <div className={styles.accountSettings}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Redirect
            exact
            from="/:username/settings/account"
            to={{
              pathname: '/:username/settings/account/manage-catalogues',
              state: location.state,
            }}
          />
          <RouteWithContext
            path="/:username/settings/account/manage-catalogues"
            component={ManageCatalogues}
            canonical={true}
          />
          <RouteWithContext
            path="/:username/settings/account/my-account"
            component={MyAccount}
            canonical={true}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default AccountSettings
