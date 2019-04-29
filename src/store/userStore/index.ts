import { observable, action } from 'mobx'
import { StoreExt } from '@utils/reactExt'
import md5 from 'js-md5'
export class UserStore extends StoreExt {
  @observable userInfo: IUserStore.IUser = {}
  // constructor() {
  //   super()
  //   // this.token = ''
  //   // this.userName = ''
  //   this.$Storage._localStorage.set('test', '111111')
  // }
  // 设置本地缓存
  setLocalStorage(userInfo: IUserStore.IUser) {
    const { token } = userInfo
    this.$Storage._localStorage.set('userInfo', userInfo)
    this.$Storage._localStorage.set('token', token)
  }
  clearStorage() {
    this.$Storage._localStorage.clear()
  }
  @action
  loginIn = async (param: IUserStore.LoginParam) => {
    try {
      const { username, password } = param
      const res = await this.$Http.post('/user/login', {username, password: md5(password)})
      console.log(res, 'cehi')
    } catch (error) {}
  }
}

export default new UserStore()
