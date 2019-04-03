import React, { Component } from 'react'
import './App.css'
import RouterMap from './router/index'
// import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <RouterMap />
        {/* <Link className='App-link' to='/home'>
          Learn React
        </Link> */}
      </div>
    )
  }
}

export default App
