import React from 'react'
import { ComponentExt } from '@utils/reactExt'
class Login extends ComponentExt {
  componentDidMount() {
    this.$Http.get('/login').then(res => {
      console.log(res)
    })
  }
  render() {
    return <div>login page</div>
  }
}

export default Login
