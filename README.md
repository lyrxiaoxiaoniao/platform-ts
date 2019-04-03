## platform-ts

### 创建

> [`npx ceate-react-app name --typescript`](https://www.html.cn/create-react-app/docs/adding-typescript/)

### 添加 mobx, mobx-react-devtools mobx-react

> 选择 mobx 而不选择 redux 原因：mobx 完美支持 typescript, 同时 mobx 类似 vuex 使用方便，代码量少，对于前端数据流不复杂的更加清晰方便维护；当然 redux 也有自己的优势可以通过中间件完成各种复杂任务的处理

> `yarn add mobx mobx-react` `yarn add mobx mobx-react-devtools -D`

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { configure } from 'mobx'
    import { Provider } from 'mobx-react'
    import DevTools from 'mobx-react-devtools'
    import store from './store'
    import App from './App'
    // 这里面的configure({enforceActions: 'observed'})
    // 用于限制被observable(也就是store中添加了@observable)的数据的修改方式，让其只能添加了@action的函数中进行修改。
    configure({ enforceActions: 'observed' })
    ReactDOM.render(
    <>
        <Provider {...store}>
        <App />
        </Provider>
        {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
    </>,
    document.getElementById('root')
    )

```

### 添加路由 react-router-dom mobx-react-router @types/react-router-dom , mobx-react-router 保持 mobx 状态与 router 同步在一个 RouterStore

> `yarn add react-router-dom mobx-react-router` `yarn add @types/react-router-dom -D`

```
    import createHashHistory from 'history/createHashHistory'
    import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

    const hashHistory = createHashHistory()
    const history = syncHistoryWithStore(hashHistory, new RouterStore())
```

> 完整的配置

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { configure } from 'mobx'
    import { Provider } from 'mobx-react'
    import DevTools from 'mobx-react-devtools'
    import createHashHistory from 'history/createHashHistory'
    import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
    import { Router } from 'react-router'
    import store from './store'
    import App from './App'
    const routerStore = new RouterStore()
    const hashHistory = createHashHistory()
    const history = syncHistoryWithStore(hashHistory, routerStore)
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
```

### `code splitting`使用`react-loadable`进行分包，按需加载。`yarn add react-loadable` `yarn add @types/react-loadable`

> 这里说一句 react 16.6 中有替代这项功能的核心 api；React.Suspense 与 React.lazy 配合完成`code splitting`,这里推荐文章[Migrate from react-loadable to React.Suspense](https://objectpartners.com/2018/12/05/migrate-from-react-loadable-to-react-suspense/), 还有一种 [react-router v4 --- code splitting](https://reacttraining.com/react-router/web/guides/code-splitting)

```
import Loadable from "react-loadable"

const asyncComponent = Loadable({
  loader: () => import(/* webpackChunkName: "asyncComponent" */ './asyncComponent'),
  loading: Loading,
  delay: 200
});

```

### webpack 配置 react-hot-loader 热加载局部更新 `yarn add react-hot-loader -D`

```
    //  package.json
    .....

    "babel": {
        "presets": [
            "react-app"
        ],
        "plugins": [
            "react-hot-loader/babel"
        ]
    }
```
