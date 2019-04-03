import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// import Home from '../containers/home'
import Loadable from 'react-loadable'
const loading = () => <div>loading.....</div>
const routerMap: any = () => (
  <Router>
    <Switch>
      <Route
        exact={true}
        path='/home'
        component={Loadable({
          loader: () => import('../containers/home'),
          loading
        })}
      />
    </Switch>
  </Router>
)
// const routerMap: any = () => (
//   <Router>
//     <Switch>
//       <Route
//         exact={true}
//         path='/home'
//         component={Home}
//       />
//     </Switch>
//   </Router>
// )

export default routerMap
