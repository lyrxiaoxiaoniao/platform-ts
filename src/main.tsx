import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'
import * as store from './store'
import App from './App'
import './index.css'
const browserHistory = createHashHistory()
const history = syncHistoryWithStore(browserHistory, store.routerStore)
// 这里面的configure({enforceActions: 'observed'})
// 用于限制被observable(也就是store中添加了@observable)的数据的修改方式，让其只能添加了@action的函数中进行修改。
configure({ enforceActions: 'observed' })
ReactDOM.render(
  <>
    <Provider {...store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
    {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
  </>,
  document.getElementById('root')
)
