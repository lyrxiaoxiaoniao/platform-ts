import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import loading from '@router/Loading'
export const routerList: Array<any> = [
  {
    path: '/app/home',
    component: Loadable({
      loader: () => import('@containers/Home'),
      loading
    }),
    exact: false
  },
  {
    path: '/app/article',
    component: Loadable({
      loader: () => import('@containers/Article'),
      loading
    }),
    exact: false
  }
]

const routerMap: any[] = [
  {
    path: '/app',
    component: Loadable({
      loader: () => import('@containers/Layout'),
      loading
    }),
    exact: false
  },
  {
    path: '/login',
    component: Loadable({
      loader: () => import('@containers/Login'),
      loading
    }),
    exact: false
  }
]

export default () => (
  <Router>
    <div style={{ height: '100%' }}>
      <Switch>
        <Route
          path='/'
          exact
          render={() => <Redirect to='/app' push />}
        />
        {routerMap.map(item => (
          <Route
            key={item.path}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
    </div>
  </Router>
)
