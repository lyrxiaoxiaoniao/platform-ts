import React, { Component } from 'react'
import RouterMap from './router/index'

class App extends Component<any> {
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <RouterMap />
      </div>
    )
  }
}

export default App
