import React from 'react'
import { Spin } from 'antd'
import style from './Loading.module.scss'
const Loadding = () => {
  return (
    <div className={style.spin}>
      <Spin size='large' />
    </div>
  )
}
export default Loadding
