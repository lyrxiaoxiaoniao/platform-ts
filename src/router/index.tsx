import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import loading from '@router/Loading'
export const routerList: Array<any> = [
  {
    path: '/app/home',
    component: Loadable({
      loader: () => import('@containers/Home'),
      loading
    })
  },
  {
    path: '/app/article/add',
    component: Loadable({
      loader: () => import('@containers/Article/add'),
      loading
    })
  },
  {
    path: '/app/article/list',
    component: Loadable({
      loader: () => import('@containers/Article'),
      loading
    })
  }
]

const routerMap: any[] = [
  {
    path: '/app',
    component: Loadable({
      loader: () => import('@containers/Layout'),
      loading
    })
  },
  {
    path: '/login',
    component: Loadable({
      loader: () => import('@containers/Login'),
      loading
    })
  }
]

export default () => (
  <Router>
    <div style={{ height: '100%' }}>
      <Switch>
        <Route
          path='/'
          exact
          render={() => <Redirect to='/login' push />}
        />
        {routerMap.map(item => (
          <Route
            key={item.path}
            exact={item.exact || false}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
    </div>
  </Router>
)
