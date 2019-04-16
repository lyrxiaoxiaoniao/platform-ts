import { observable, action } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class UserStore extends StoreExt {
  @observable userName: string = ''
  @observable token: string = ''
  // constructor() {
  //   super()
  //   // this.token = ''
  //   // this.userName = ''
  //   this.$Storage._localStorage.set('test', '111111')
  // }
  // 设置本地缓存
  setLocalStorage({ userName, token }: IUserStore.IUser) {
    this.$Storage._localStorage.set('userName', userName)
    this.$Storage._localStorage.set('token', token)
  }
  clearStorage() {
    this.$Storage._localStorage.clear()
  }
  @action
  changeLoading() {}
}
const userStore = new UserStore()
export default userStore
